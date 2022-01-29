import { DEFAULT_PAGE, PAGE_SIZE } from "../constants";

export const paginate = (
	data: any[],
	page = DEFAULT_PAGE,
	limit = PAGE_SIZE
) => {
	const startIndex = limit * (page - 1);
	const endIndex = limit + startIndex;
	return data.slice(startIndex, endIndex);
};
