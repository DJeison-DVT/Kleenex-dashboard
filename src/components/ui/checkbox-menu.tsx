import { useEffect, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Column } from '@tanstack/react-table';
import { cn } from '../../lib/utils';
import { Filter } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: string;
	className?: string;
	options: string[];
}

export function DataTableColumnHeaderCheckbox<TData, TValue>({
	column,
	title,
	className,
	options,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const [isOpen, setIsOpen] = useState(false);

	if (!column.getCanFilter()) {
		return <div className={cn(className)}>{title}</div>;
	}
	const [selectedOptions, setSelectedOptions] = useState(
		options.map((option) => option),
	);

	const handleOptionChange = (checked: boolean, id: string) => {
		setSelectedOptions((prevSelected) =>
			checked
				? [...prevSelected, id]
				: prevSelected.filter((optionId) => optionId !== id),
		);
	};

	useEffect(() => {
		column.setFilterValue(selectedOptions);
	}, [selectedOptions, column]);

	return (
		<div className={`flex items-center space-x-2 ${className}`}>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent"
					>
						<span>{title}</span>
						<Filter />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					{options.map((option) => (
						<DropdownMenuItem
							key={option}
							asChild
							onSelect={(e) => e.preventDefault()}
						>
							<div className="flex items-center">
								<Checkbox
									checked={selectedOptions.includes(option)}
									onCheckedChange={(checked) =>
										handleOptionChange(checked as boolean, option)
									}
								/>
								<span className="ml-2">{option}</span>
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
