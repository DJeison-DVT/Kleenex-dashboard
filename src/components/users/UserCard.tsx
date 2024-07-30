import { DashboardUser } from '../../Types/User';

export default function UserCard({ user }: { user: DashboardUser }) {
	return (
		<div>
			{user.username}
			{user.role}
		</div>
	);
}
