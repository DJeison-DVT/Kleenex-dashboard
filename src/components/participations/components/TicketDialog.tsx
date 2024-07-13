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

const ticketNumberSchema = z.object({
	ticketNumber: z.string(),
});

interface TicketDialogProps {
	id: string;
}

export default function TicketDialog({ id }: TicketDialogProps) {
	const [reason, setReason] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<z.infer<typeof ticketNumberSchema>>({
		resolver: zodResolver(ticketNumberSchema),
		defaultValues: {
			ticketNumber: '',
		},
	});

	function onSubmit(values: z.infer<typeof ticketNumberSchema>) {
		console.log(id, values);
		setIsOpen(false);
		form.reset();
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Ticket</Button>
			</DialogTrigger>
			<DialogContent className="min-w-fit">
				<DialogHeader>
					<DialogTitle>Validación de Ticket</DialogTitle>
					<DialogDescription asChild>
						<div className="flex h-80">
							<div className="h-full bg-black flex-1 min-w-96"></div>
							<div className="p-5 flex w-96 justify-between gap-3">
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-x-4 flex justify-between items-start"
									>
										<FormField
											control={form.control}
											name="ticketNumber"
											render={({ field }: { field: any }) => (
												<FormItem>
													<FormControl>
														<Input placeholder="Num. de Ticket" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button variant="secondary" type="submit">
											Aceptar
										</Button>
									</form>
								</Form>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<div className="flex-col h-full">
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
														<SelectItem value="No Legible">
															No Legible
														</SelectItem>
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
														id,
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
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
