import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table';
import { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { DataTablePagination } from '../ui/pagination';
import { isSelectedFilterFn } from './filters';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		initialState: {
			pagination: {
				pageSize: Number(searchParams.get('pageSize')) || 10,
				pageIndex: Number(searchParams.get('page')) - 1 || 0,
			},
		},
		state: {
			sorting,
			columnFilters,
		},
		filterFns: {
			isSelected: isSelectedFilterFn,
		},
	});

	useEffect(() => {
		const { pageIndex, pageSize } = table.getState().pagination;
		const params = new URLSearchParams(searchParams.toString());

		const currentPage = searchParams.get('page');
		const currentPageSize = searchParams.get('pageSize');

		if (pageIndex === 0) {
			params.delete('page');
		} else if (currentPage !== String(pageIndex + 1)) {
			params.set('page', String(pageIndex + 1));
		}

		if (pageSize === 10) {
			params.delete('pageSize');
		} else if (currentPageSize !== String(pageSize)) {
			params.set('pageSize', String(pageSize));
		}

		navigate({ search: params.toString() }, { replace: true });
	}, [table.getState().pagination, searchParams, navigate]);

	return (
		<div className="flex flex-col flex-1 gap-3 p-10 pb-5 max-h-full">
			<ScrollArea className="flex flex-col flex-1 overflow-auto ">
				<div className="rounded-md border ">
					<div className="relative">
						<Table>
							<TableHeader className="sticky top-0 bg-primary z-10">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length}>No data</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</ScrollArea>
			<DataTablePagination table={table} />
		</div>
	);
}
