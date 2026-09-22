import { factories } from '@strapi/strapi';
import axios from 'axios';

const requestLog = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT = 5;

function getRateLimit() {
	const configured = Number(process.env.ENQUIRY_RATE_LIMIT_PER_MINUTE || DEFAULT_RATE_LIMIT);
	return Number.isInteger(configured) && configured > 0 ? configured : DEFAULT_RATE_LIMIT;
}

function getClientIp(ctx: any) {
	return String(ctx.ip || ctx.request?.ip || 'unknown');
}

function consumeRateLimit(ip: string) {
	const now = Date.now();
	const recentRequests = (requestLog.get(ip) || []).filter(
		(timestamp) => now - timestamp < RATE_WINDOW_MS
	);

	if (recentRequests.length >= getRateLimit()) {
		requestLog.set(ip, recentRequests);
		return false;
	}

	recentRequests.push(now);
	requestLog.set(ip, recentRequests);
	return true;
}

async function verifyCaptcha(token: unknown, ip: string) {
	const secret = process.env.CAPTCHA_SECRET;
	const isProduction = process.env.NODE_ENV === 'production';

	if (!secret) {
		if (isProduction) {
			return false;
		}

		return true;
	}

	if (typeof token !== 'string' || token.length === 0) {
		return false;
	}

	const provider = (process.env.CAPTCHA_PROVIDER || 'turnstile').toLowerCase();
	const endpoint = provider === 'recaptcha'
		? 'https://www.google.com/recaptcha/api/siteverify'
		: 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

	const response = await axios.post(
		endpoint,
		new URLSearchParams({ secret, response: token, remoteip: ip }),
		{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 5000 }
	);

	return response.data?.success === true;
}

export default factories.createCoreController('api::enquiry.enquiry', ({ strapi }) => ({
	async create(ctx) {
		const body = ctx.request.body || {};
		const data = { ...(body.data || {}) };
		const captchaToken = data.captchaToken || body.captchaToken;
		delete data.captchaToken;

		if (!consumeRateLimit(getClientIp(ctx))) {
			ctx.status = 429;
			ctx.body = { error: 'Too many requests. Please try again later.' };
			return;
		}

		try {
			if (!(await verifyCaptcha(captchaToken, getClientIp(ctx)))) {
				ctx.status = 400;
				ctx.body = { error: 'CAPTCHA verification failed.' };
				return;
			}
		} catch (error) {
			strapi.log.error(`Enquiry CAPTCHA verification failed: ${error}`);
			ctx.status = 503;
			ctx.body = { error: 'Unable to verify CAPTCHA. Please try again.' };
			return;
		}

		ctx.request.body = { ...body, data };
		return super.create(ctx);
	},
}));