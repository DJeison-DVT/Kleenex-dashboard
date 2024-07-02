export type Participation = {
	id: string;
	phone: string;
	ticket_url: string;
	participationNumber: number;
	product: string[];
	datetime: Date;
	status: string;
	prizeType: string | null;
};
