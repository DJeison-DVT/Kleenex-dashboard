import { useEffect, useState } from 'react';

import { User } from '../../Types/User';
import { Participation } from '../../Types/Participation';
import { columns as originalColumns } from './columns';
import { DataTable } from './data-table';
import settings from '../../settings';
import TicketDialog from './components/TicketDialog';
import { ColumnDef, Row } from '@tanstack/react-table';
import { authorizedFetch } from '../../auth';

export default function Participations() {
	const [participations, setParticipations] = useState<Participation[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchParticipations = async () => {
		setIsLoading(true);
		try {
			const response = await authorizedFetch(
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
					datetime: new Date(item.datetime + 'Z'),
					priorityNumber: String(item.priority_number),
					status: item.status,
					flow: item.flow,
					prize: item.prize,
					serial_number: item.serial_number,
				};

				return result;
			});

			setParticipations(transformedData);
		} catch (error) {
			console.error('Error fetching participations: ', error);
		}
		setIsLoading(false);
	};

	const ticketColumn: ColumnDef<Participation> = {
		header: 'Ticket',
		accessorKey: 'id',
		cell: ({ row }) => {
			const participation = row.original;
			return participation.ticketUrl ? (
				<TicketDialog
					participation={participation}
					onTicketSend={fetchParticipations}
				/>
			) : null;
		},
	};

	const columns = [
		...originalColumns.slice(0, 3), // Get the first 4 columns
		ticketColumn, // Insert the new column
		...originalColumns.slice(3), // Append the rest of the columns
	];

	useEffect(() => {
		fetchParticipations();
	}, []);

	const renderSubComponent = ({ row }: { row: Row<Participation> }) => {
		const name = row.original.user.name;
		const email = row.original.user.email;
		const prize = row.original.prize;
		const priorityNumber = row.original.priorityNumber;

		return (
			<div>
				<p>
					<strong>Nombre:</strong> {name}
				</p>
				<p>
					<strong>Premio:</strong> Cupon de ${prize}
				</p>
				<p>
					<strong>Numero de participacion:</strong> {priorityNumber}
				</p>
				<p>
					<strong>Email:</strong> {email}
				</p>
			</div>
		);
	};

	return (
		<>
			<DataTable
				columns={columns}
				data={participations}
				isLoading={isLoading}
				onRefresh={fetchParticipations}
				getRowCanExpand={() => true}
				renderSubComponent={renderSubComponent}
			/>
		</>
	);
}
