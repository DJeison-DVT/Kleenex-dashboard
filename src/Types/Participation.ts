import { User } from './User';

export type Participation = {
	id: string;
	user: User;
	ticketUrl: string;
	ticketAttempts: number;
	priorityNumber: string;
	datetime: Date;
	status: string;
	flow: string;
	prize: string;
    serial_number: string;
};
