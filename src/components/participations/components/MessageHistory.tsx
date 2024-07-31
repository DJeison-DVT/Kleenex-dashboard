import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../../ui/sheet';

import { Participation } from '../../../Types/Participation';
import { ScrollArea } from '../../ui/scroll-area';
import { useEffect, useRef } from 'react';

interface MessageHistoryProps {
	participation: Participation;
}

export default function MessageHistory({ participation }: MessageHistoryProps) {
	const phone = participation.user.phone;

	// const [messages_, setMessages] = useState<Message[]>([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const { toast } = useToast();

	// const fetchMessages = async () => {
	// 	setIsLoading(true);
	// 	try {
	// 		const url = `${settings.apiUrl}/api/messages/`;
	// 		const response = await authorizedFetch(url);
	// 		if (!response.ok) {
	// 			toast({
	// 				title: 'Fallo al conseguir usuarios',
	// 				description: response.status,
	// 			});
	// 			return;
	// 		}

	// 		const data = await response.json();
	// 		setMessages(data);
	// 	} catch (error) {
	// 		console.error('Error fetching users: ', error);
	// 	}
	// 	setIsLoading(false);
	// };

	const baseMessages = [
		{
			id: 1,
			sender: 'User',
			content: 'Hello, how are you?',
			timestamp: '10:00 AM',
		},
		{
			id: 2,
			sender: 'Admin',
			content: 'I am fine, thank you!',
			timestamp: '10:05 AM',
		},
		{ id: 3, sender: 'User', content: 'Great to hear!', timestamp: '10:10 AM' },
	];

	// Multiply the contents by 10
	const messages = Array.from({ length: 10 }, (_, i) =>
		baseMessages.map((msg) => ({
			...msg,
			id: msg.id + i * baseMessages.length, // Ensure unique ids
		})),
	).flat();

	return (
		<Sheet>
			<SheetTrigger>
				<div className="text-blue-600">{phone.slice(-10)}</div>
			</SheetTrigger>
			<SheetContent className="flex flex-col bg-dark text-white">
				<SheetHeader className="flex-0">
					<SheetTitle className="text-white text-2xl ">
						Historial de conversacion
					</SheetTitle>
				</SheetHeader>
				<div ref={chatContainerRef} className="h-full overflow-y-auto">
					{messages.map((message) => (
						<div
							key={message.id}
							className="p-4 bg-gray-800 rounded-lg shadow-md"
						>
							<div>{message.id}</div>
							<div className="text-sm text-gray-400">{message.timestamp}</div>
							<div className="font-semibold">{message.sender}</div>
							<div className="mt-1">{message.content}</div>
						</div>
					))}
					<div ref={bottomRef} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
