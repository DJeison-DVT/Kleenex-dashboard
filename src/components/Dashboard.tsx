import { ScrollArea } from './ui/scroll-area';

interface ChartEmbedProps {
	chartLink: string;
}

const ChartEmbed: React.FC<ChartEmbedProps> = ({ chartLink }) => {
	return (
		<iframe
			style={{
				background: '#FFFFFF',
				border: 'none',
				borderRadius: '2px',
				boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
			}}
			className="h-[540px] w-full"
			src={chartLink}
			title="MongoDB Atlas Chart"
		/>
	);
};

export default function Dashboard() {
	return (
		<div className="flex-1 w-full flex flex-col overflow-hidden bg-background">
			<ScrollArea className="flex-1 flex flex-col p-4">
				<div className="grid grid-cols-2 gap-4 flex-1">
					<div className="grid grid-cols-3 gap-4 col-span-2">
						<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a8362a-bd16-43be-8490-4339996a1207&maxDataAge=3600&theme=light&autoRefresh=true" />
						<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a83667-87f2-47a3-8a7f-48f4f0c0ebfc&maxDataAge=3600&theme=light&autoRefresh=true" />
						<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a8387e-bd16-43ec-847a-4339997f84bb&maxDataAge=3600&theme=light&autoRefresh=true" />
					</div>
					<div className="w-full h-full col-span-2">
						<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a83794-bd16-402e-8eb1-43399974bdb0&maxDataAge=3600&theme=light&autoRefresh=true" />
					</div>
					<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a83743-fcbb-4c13-820f-551271ef4b08&maxDataAge=3600&theme=light&autoRefresh=true" />
					<ChartEmbed chartLink="https://charts.mongodb.com/charts-kleenex-promo-qiyrdzy/embed/charts?id=66a83858-d58d-46ac-8a80-cecb7e7c9240&maxDataAge=3600&theme=light&autoRefresh=true" />
				</div>
			</ScrollArea>
		</div>
	);
}
