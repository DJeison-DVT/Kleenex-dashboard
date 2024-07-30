import { createBrowserRouter, redirect } from 'react-router-dom';
import { authProvider, loginAction } from '../auth';
import { authenticatedLoader, protectedLoader, adminLoader } from './Loaders';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import Layout from '../components/Layout';
import DashboardLayout from '../components/DashboardLayout';
import Participations from '../components/participations/Participations';
import Prizes from '../components/prizes/Prizes';
import Users from '../components/users/Users';

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		loader() {
			return { user: authProvider.username, role: authProvider.role };
		},
		Component: Layout,
		children: [
			{
				index: true,
				action: loginAction,
				loader: authenticatedLoader,
				Component: Login,
			},
			{
				path: 'login',
				action: loginAction,
				loader: authenticatedLoader,
				Component: Login,
			},
			{
				path: 'dashboard',
				loader: protectedLoader,
				Component: DashboardLayout,
				children: [
					{
						index: true,
						Component: Dashboard,
					},
					{
						path: 'participations',
						Component: Participations,
					},
					{
						path: 'prizes',
						Component: Prizes,
					},
					{
						path: 'users',
						Component: Users,
						loader: adminLoader,
					},
				],
			},
		],
	},
	{
		path: '/logout',
		async action() {
			await authProvider.signout();
			return redirect('/');
		},
	},
]);

export default router;
