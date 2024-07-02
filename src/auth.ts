import { LoaderFunctionArgs, redirect } from 'react-router-dom';

interface AuthProvider {
	isAuthenticated: boolean;
	username: null | string;
	signin(username: string): Promise<void>;
	signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
	isAuthenticated: false,
	username: null,
	async signin(username: string) {
		await new Promise((r) => setTimeout(r, 500)); // fake delay
		fakeAuthProvider.isAuthenticated = true;
		fakeAuthProvider.username = username;
	},
	async signout() {
		await new Promise((r) => setTimeout(r, 500)); // fake delay
		fakeAuthProvider.isAuthenticated = false;
		fakeAuthProvider.username = '';
	},
};

export async function loginAction({ request }: LoaderFunctionArgs) {
	let formData = await request.formData();
	let username = formData.get('username') as string | null;

	if (!username) {
		return {
			error: 'You must provide a username to log in',
		};
	}

	try {
		await fakeAuthProvider.signin(username);
	} catch (error) {
		return {
			error: 'Invalid login attempt',
		};
	}

	let redirectTo = formData.get('redirectTo') as string | null;
	return redirect(redirectTo || '/');
}
