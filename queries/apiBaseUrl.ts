const apiBaseUrl = typeof window === 'undefined'
	? process.env.NEXT_PUBLIC_APP_URL
	: process.env.NEXT_PUBLIC_API_URL

export default apiBaseUrl