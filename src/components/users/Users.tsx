import { useEffect, useState } from 'react';
import settings from '../../settings';
import { useToast } from '../ui/use-toast';
import { DashboardUser } from '../../Types/User';
import UserCard from './UserCard';

export default function Users() {
	const [users, setUsers] = useState<DashboardUser[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { toast } = useToast();

	const fetchUsers = async () => {
		setIsLoading(true);
		try {
			const accessToken = localStorage.getItem(settings.tokenName);
			console.log(accessToken);
			const url = `${settings.apiUrl}/api/dashboard/users`;
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!response.ok) {
				toast({
					title: 'Fallo al conseguir usuarios',
					description: response.status,
				});
				return;
			}

			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error('Error fetching users: ', error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<div>
			{users.map((user) => (
				<UserCard user={user} />
			))}
		</div>
	);
}
