import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../../ui/sheet';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { Participation } from '../../../Types/Participation';
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	ConversationHeader,
	MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { authorizedFetch } from '../../../auth';
import settings from '../../../settings';
import { useToast } from '../../ui/use-toast';
import { useEffect, useState } from 'react';
import { ChatMessage } from '../../../Types/Message';
import { LoaderCircle, User } from 'lucide-react';

interface MessageHistoryProps {
	participation: Participation;
}

export default function MessageHistory({ participation }: MessageHistoryProps) {
	const phone = participation.user.phone;

	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const fetchMessages = async () => {
		if (messages.length != 0) return;

		setIsLoading(true);
		try {
			const url = `${settings.apiUrl}/api/messages?id=${participation.user.id}`;
			const response = await authorizedFetch(url);
			if (!response.ok) {
				toast({
					title: 'Fallo al conseguir usuarios',
					description: response.status,
				});
				return;
			}

			const data = await response.json();
			setMessages(data);
		} catch (error) {
			console.error('Error fetching users: ', error);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (isOpen) {
			fetchMessages();
		}
	}, [isOpen]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger>
				<div className="text-blue-600">{phone.slice(-10)}</div>
			</SheetTrigger>
			<SheetContent className="flex flex-col bg-dark text-white flex-1 h-full">
				<SheetHeader className="flex-0 flex flex-col">
					<SheetTitle className="text-white text-2xl ">
						Historial de conversacion
					</SheetTitle>
				</SheetHeader>
				<div style={{ position: 'relative' }} className="h-[90%]">
					<MainContainer>
						<ChatContainer>
							<MessageList>
								{messages.map((message, index) => {
									if (message.text)
										return (
											<Message
												key={index}
												model={{
													message: message.text,
													sentTime: new Date(message.datetime).toLocaleString(),
													sender: 'Joe',
													direction: 'incoming',
													position: 'single',
												}}
											>
												<Message.Header
													sender={
														message.from_ === participation.user.phone
															? participation.user.name
															: ''
													}
													sentTime={new Date(message.datetime).toLocaleString()}
												/>
											</Message>
										);
								})}
							</MessageList>
						</ChatContainer>
					</MainContainer>
				</div>
			</SheetContent>
		</Sheet>
	);
}
