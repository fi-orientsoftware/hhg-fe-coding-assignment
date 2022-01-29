import { useCallback, useState } from "react";

export interface MutationHookArgument {
	apiCallback: (data: any) => Promise<any>;
	onSuccess: (result: any) => void;
	onFailure: (error: any) => void;
	onFinish: () => void;
}

const useMutation = ({
	apiCallback,
	onSuccess,
	onFailure,
	onFinish,
}: MutationHookArgument) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const request = useCallback(
		async (data: any) => {
			try {
				setIsLoading(true);
				const result = await apiCallback(data);

				if (result) {
					onSuccess && onSuccess(result);
				}
			} catch (error) {
				onFailure && onFailure(error);
			}
			onFinish && onFinish();
			setIsLoading(false);
		},
		[setIsLoading, onSuccess, onFinish, onFailure, apiCallback]
	);

	return {
		isLoading,
		request,
	};
};

export default useMutation;
