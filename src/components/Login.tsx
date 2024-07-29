import {
	useActionData,
	useLocation,
	useNavigation,
	Form,
} from 'react-router-dom';
import { Button } from './ui/button';

export default function Login() {
	let location = useLocation();
	let params = new URLSearchParams(location.search);
	let from = params.get('from') || '/';

	let navigation = useNavigation();
	let isLoggingIn =
		navigation.formData?.get('username') != null &&
		navigation.formData?.get('password') != null;

	let actionData = useActionData() as { error: string } | undefined;

	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<Form method="post" replace>
				<input type="hidden" name="redirectTo" value={from} />
				<label>
					Usuario: <input name="username" />
				</label>
				<label>
					Contraseña: <input name="password" />
				</label>
				<Button type="submit" disabled={isLoggingIn}>
					{isLoggingIn ? 'Logging in...' : 'Login'}
				</Button>
				{actionData && actionData.error ? (
					<p style={{ color: 'red' }}>{actionData.error}</p>
				) : null}
			</Form>
		</div>
	);
}
