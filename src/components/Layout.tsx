import { Link, Outlet } from 'react-router-dom';
import { Button } from './ui/button';

function Layout() {
	return (
		<div className="relative w-screen h-screen overflow-hidden">
			<ul className="p-4 flex fixed top-0 right-0 gap-2">
				<li>
					<Link to="/">
						<Button>Public Page</Button>
					</Link>
				</li>
				<li>
					<Link to="/dashboard">
						<Button>Protected Page</Button>
					</Link>
				</li>
			</ul>

			<Outlet />
		</div>
	);
}

// function AuthStatus() {
// 	let { user } = useRouteLoaderData('root') as { user: string | null };
// 	let fetcher = useFetcher();

// 	if (!user) {
// 		return <p>You are not logged in.</p>;
// 	}

// 	let isLoggingOut = fetcher.formData != null;

// 	return (
// 		<div>
// 			<p>Welcome {user}!</p>
// 			<fetcher.Form method="post" action="/logout">
// 				<button type="submit" disabled={isLoggingOut}>
// 					{isLoggingOut ? 'Signing out...' : 'Sign out'}
// 				</button>
// 			</fetcher.Form>
// 		</div>
// 	);
// }

export default Layout;
