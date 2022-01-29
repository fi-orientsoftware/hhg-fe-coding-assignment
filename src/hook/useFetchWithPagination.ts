import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PAGE, PAGE_SIZE } from "../constants";

const useFetchWithPagination = (
	fetchCallback: (params: any) => Promise<any>,
	pageSize = PAGE_SIZE
) => {
	const [refetchEffect, setRefetchEffect] = useState<number>(0);
	const [data, setData] = useState<any>();
	const [error, setError] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// to check if the component is umounted before the promise fullfilled or rejected
	// so the hook did not call setState after the component already unmounted
	// causing memory leak.
	const [isMounted, setIsMounted] = useState<boolean>(true);

	const [page, setPage] = useState(DEFAULT_PAGE);

	const fetch = useCallback(async () => {
		try {
			setIsLoading(true);

			const params = { page, limit: pageSize };
			const result = await fetchCallback(params);

			if (result && isMounted) {
				setData(result.data);
			}
		} catch (error) {
			if (isMounted) {
				setError(error);
			}
		}
		setIsLoading(false);
	}, [page, isMounted, pageSize, fetchCallback]);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, [setIsMounted]);

	useEffect(() => {
		fetch();
	}, [page, pageSize, fetch, refetchEffect]);

	const goToFirstPage = useCallback(() => {
		setPage(DEFAULT_PAGE);
	}, [setPage]);

	const refetch = useCallback(
		() => setRefetchEffect((prev) => prev + 1),
		[setRefetchEffect]
	);

	return {
		page,
		setPage,
		goToFirstPage,
		isLoading,
		data,
		error,
		refetch,
	};
};

export default useFetchWithPagination;
