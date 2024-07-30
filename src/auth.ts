import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import settings from './settings';

interface CustomJwtPayload extends JwtPayload {
	sub: string;
	role: string;
}

interface AuthProvider {
	isAuthenticated: boolean;
	username: null | string;
	role: null | string;
	signin(username: string, password: string): Promise<void>;
	signout(): Promise<void>;
	loadToken(): void;
}

export const authProvider: AuthProvider = {
	isAuthenticated: false,
	username: null,
	role: null,

	async signin(username, password) {
		const response = await fetch(`${settings.apiUrl}/api/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				username,
				password,
			}),
		});

		if (!response.ok) {
			throw new Error('Invalid login attempt');
		}
		const data = await response.json();
		const token = data.access_token;
		const decodedToken = jwtDecode<CustomJwtPayload>(token);
		if (token) {
			localStorage.setItem(settings.tokenName, token);
			authProvider.isAuthenticated = true;
			authProvider.username = username;
			authProvider.role = decodedToken.role;
		}
	},
	async signout() {
		localStorage.removeItem(settings.tokenName);
		authProvider.isAuthenticated = false;
		authProvider.username = null;
		authProvider.role = null;
	},
	loadToken() {
		const token = localStorage.getItem(settings.tokenName);
		if (token) {
			this.isAuthenticated = true;

			const decodedToken = jwtDecode<CustomJwtPayload>(token);
			this.username = decodedToken.sub || null;
			this.role = decodedToken.role || null;
		}
	},
};

export async function loginAction({ request }: LoaderFunctionArgs) {
	let formData = await request.formData();
	let username = formData.get('username') as string | null;
	let password = formData.get('password') as string | null;

	if (!username) {
		return {
			error: 'You must provide a username to log in',
		};
	}

	if (!password) {
		return {
			error: 'You must provide a password to log in',
		};
	}

	try {
		await authProvider.signin(username, password);
	} catch (error) {
		return {
			error: 'Invalid login attempt',
		};
	}

	let redirectTo = formData.get('redirectTo') as string | null;
	return redirect(redirectTo || '/');
}

authProvider.loadToken();
