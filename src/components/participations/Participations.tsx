import { useEffect, useState } from 'react';

import { User } from '../../Types/User';
import { Participation } from '../../Types/Participation';
import { columns } from './columns';
import { DataTable } from './data-table';
import settings from '../../settings';

export default function Participations() {
	const [participations, setParticipations] = useState<Participation[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchParticipations = async () => {
		try {
			const response = await fetch(
				settings.apiUrl + settings.participationsURL,
			);
			const data = await response.json();

			const transformedData = data.map((item: any) => {
				const participationId = item._id;
				const userId = item.user._id;

				let userObject: User = {
					id: userId,
					phone: item.user.phone,
					terms: item.user.terms,
					name: item.user.name,
					email: item.user.email,
					complete: item.user.complete,
				};

				const result: Participation = {
					id: participationId,
					user: userObject,
					ticketUrl: item.ticket_url,
					ticketAttempts: item.ticket_attempts,
					datetime: new Date(item.datetime),
					priorityNumber: String(item.priority_number),
					status: item.status,
					flow: item.flow,
					prize: item.prize,
				};

				return result;
			});

			setParticipations(transformedData);
		} catch (error) {
			console.error('Error fetching participations: ', error);
		}
	};

	useEffect(() => {
		fetchParticipations();
		setIsLoading(false);
	}, []);

	return (
		<>
			<DataTable columns={columns} data={participations} isLoading />;
		</>
	);
}
