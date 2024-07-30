import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { PrizeInfo } from '../../Types/Prizes';

export default function Participations() {
	const [prizes, setPrizes] = useState<PrizeInfo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchPrizes = async () => {
		try {
			const prizes = [
				{
					id: '1',
					name: '100',
					available: 10,
					delivered: 0,
					total: 10,
				},
				{
					id: '2',
					name: '200',
					available: 20,
					delivered: 0,
					total: 20,
				},
				{
					id: '3',
					name: '1000',
					available: 1,
					delivered: 0,
					total: 1,
				},
			];
			setPrizes(prizes);
		} catch (error) {
			console.error('Error fetching participations: ', error);
		}
	};

	useEffect(() => {
		fetchPrizes();
		setIsLoading(false);
	}, []);

	return (
		<>
			<DataTable columns={columns} data={prizes} isLoading={isLoading} />
		</>
	);
}
