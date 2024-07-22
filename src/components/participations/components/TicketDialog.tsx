import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../ui/alert-dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';

import settings from '../../../settings';
import { Participation } from '../../../Types/Participation';

const ticketNumberSchema = z.object({
	ticketNumber: z.string(),
});

interface TicketDialogProps {
	participation: Participation;
}

export default function TicketDialog({ participation }: TicketDialogProps) {
	const [reason, setReason] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<z.infer<typeof ticketNumberSchema>>({
		resolver: zodResolver(ticketNumberSchema),
		defaultValues: {
			ticketNumber: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof ticketNumberSchema>) => {
		console.log(
			'sending ticket:',
			values.ticketNumber,
			'for ticket:',
			participation.id,
		);
		try {
			// const response = await fetch(
			//     settings.apiUrl + '/accept/',
			//     {
			//         method: 'POST',
			//         headers: {
			//             'Content-Type': 'application/json',
			//         },
			//         body: JSON.stringify({
			//             ticket: values.ticketNumber,
			//             id,
			//         }),
			//     },
			// )
			// const data = await response.json();
			// console.log('response:', data);
			setIsOpen(false);
			form.reset();
		} catch (error) {
			console.error('Error accepting ticket: ', error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Ticket</Button>
			</DialogTrigger>
			<DialogContent className="min-w-fit h-[700px] flex flex-col">
				<DialogHeader>
					<DialogTitle>Validación de Ticket</DialogTitle>
				</DialogHeader>
				<DialogDescription asChild>
					<div className="flex h-80">
						<div className="min-w-[500px]">
							<img
								className="max-h-[600px]"
								src={`${settings.bucketURL + participation.ticketUrl}`}
							/>
						</div>
						<div className="grid grid-cols-2 grid-rows-2 h-fit min-w-[260px] gap-3 m-5">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="contents"
								>
									<FormField
										control={form.control}
										name="ticketNumber"
										render={({ field }: { field: any }) => (
											<FormItem className="col-span-2 h-fit">
												<FormControl>
													<Input
														className="min-w-[250px]"
														placeholder="Num. de Ticket"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="flex justify-center">
										<Button variant="secondary" type="submit">
											Aceptar
										</Button>
									</div>
								</form>
							</Form>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<div className="flex justify-center h-fit">
										<Button variant="destructive">Rechazar</Button>
									</div>
								</AlertDialogTrigger>
								<AlertDialogContent className="w-fit">
									<AlertDialogHeader>
										<AlertDialogTitle>Motivo de Rechazo</AlertDialogTitle>
										<AlertDialogDescription>
											<Select onValueChange={setReason} defaultValue={reason}>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="Motivo" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="No hay Ticket">
														No hay Ticket
													</SelectItem>
													<SelectItem value="No Legible">No Legible</SelectItem>
													<SelectItem value="Folio Repetido">
														Folio Repetido
													</SelectItem>
													<SelectItem value="Ticket invalido">
														Ticket invalido
													</SelectItem>
												</SelectContent>
											</Select>
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancelar</AlertDialogCancel>
										<AlertDialogAction
											onClick={() => {
												console.log(
													'sending reason:',
													reason,
													'for ticket:',
													participation.id,
												);
												setIsOpen(false);
											}}
										>
											Rechazar
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>
				</DialogDescription>
			</DialogContent>
		</Dialog>
	);
}
