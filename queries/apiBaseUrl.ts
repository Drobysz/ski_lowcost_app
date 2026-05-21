const rawApiBaseUrl =
	process.env.NEXT_PUBLIC_API_BASE_URL ??
	process.env.NEXT_PUBLIC_API_URL ??
	process.env.NEXT_PUBLIC_APP_URL ??
	"http://localhost:8000/api";

const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/+$/, "");
const apiBaseUrl = normalizedApiBaseUrl.endsWith("/api")
	? normalizedApiBaseUrl
	: `${normalizedApiBaseUrl}/api`;

export default apiBaseUrl
