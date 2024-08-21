import { FilterFn, Row } from '@tanstack/react-table';

export const isSelectedFilterFn: FilterFn<any> = <TData>(
	row: Row<TData>,
	columnId: string,
	filterValues: string[],
) => {
	const value = row.getValue<string>(columnId).toLowerCase().trim();
	return filterValues.includes(value);
};

export const isPhoneFilterFn: FilterFn<any> = <TData>(
	row: Row<TData>,
	columnId: string,
	filterValues: string[],
) => {
	const value = row.getValue<string>(columnId);
	const regex = new RegExp(`whatsapp:\\+521?${filterValues}`);
	return regex.test(value);
};
