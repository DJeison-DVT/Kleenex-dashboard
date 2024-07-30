import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { PrizeInfo } from '../../Types/Prizes';
import settings from '../../settings';
import { useToast } from '../ui/use-toast';

export default function Participations() {
	const [prizes, setPrizes] = useState<PrizeInfo[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { toast } = useToast();

	const fetchPrizes = async () => {
		try {
			const url = `${settings.apiUrl}/api/codes/count`;
			const response = await fetch(url);

			if (!response.ok) {
				toast({
					title: 'Fallo al conseguir conteo',
					description: response.status,
				});
				return;
			}

			const data = await response.json();
			setPrizes(data);
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
