import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { fakeAuthProvider } from '../auth';

function authenticatedLoader() {
	if (fakeAuthProvider.isAuthenticated) {
		return redirect('/dashboard');
	}
	return null;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
	if (!fakeAuthProvider.isAuthenticated) {
		let params = new URLSearchParams();
		params.set('from', new URL(request.url).pathname);
		return redirect('/login?' + params.toString());
	}

	return null;
}

export { authenticatedLoader, protectedLoader };
