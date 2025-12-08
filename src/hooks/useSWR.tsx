import { useEffect, useState, useSyncExternalStore } from 'react';

type Cash<D = unknown, E = Error> = {
	status: 'loading' | 'success' | 'error';
	data: D | null;
	error: E | null;
	promise?: Promise<D>;
};

type RequestStore<D = unknown, E = Error> = {
	cash: Record<string, Cash<D, E>>;
	listeners: Set<() => void>;
	subscribe: (listener: () => void) => () => void;
	getSnapshot: (key: string) => Cash<D, E> | undefined;
	startRequest: (key: string, promise?: Promise<D>) => void;
	successRequest: (key: string, data: D) => void;
	errorRequest: (key: string, error: E) => void;
};

type PossibleError = {
	type?: string;
	message?: string;
};

const store: RequestStore<unknown, Error> = {
	cash: {},
	listeners: new Set(),

	subscribe(listener: () => void) {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	},

	getSnapshot(key: string) {
		return this.cash[key];
	},

	startRequest(key: string, promise?: Promise<unknown>) {
		this.cash[key] = {
			status: 'loading',
			data: null,
			error: null,
			promise,
		};
	},

	successRequest(key: string, data: unknown) {
		this.cash[key] = {
			status: 'success',
			data,
			error: null,
			promise: undefined,
		};
	},

	errorRequest(key: string, error: Error) {
		this.cash[key] = {
			status: 'error',
			data: null,
			error,
			promise: undefined,
		};
	},
};

export default function useSWR<D = unknown, E = Error>(
	key: string,
	fetcher: (key: string) => D | Promise<D>
): {
	data: D | undefined;
	error: E | undefined;
	isLoading: boolean;
} {
	const [data, setData] = useState<D | undefined>(undefined);
	const [error, setError] = useState<E | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useSyncExternalStore(
		(listener) => store.subscribe(listener),
		() => store.getSnapshot(key)
	);

	useEffect(() => {
		const existingRequest = store.getSnapshot(key);

		if (existingRequest) {
			if (
				existingRequest.status === 'loading' &&
				existingRequest.promise
			) {
				setIsLoading(true);

				(existingRequest.promise as Promise<D>)
					.then((result: D) => {
						setData(result);
						setError(undefined);
						setIsLoading(false);
					})
					.catch((err: E) => {
						setError(err);
						setData(undefined);
						setIsLoading(false);
					});

				return;
			}

			if (existingRequest.status === 'success') {
				setData(existingRequest.data as D);
				setError(undefined);
				setIsLoading(false);

				return;
			}

			if (existingRequest.status === 'error') {
				setError(existingRequest.error as E);
				setData(undefined);
				setIsLoading(false);

				return;
			}
		}

		const result = fetcher(key);

		if (result instanceof Promise) {
			store.startRequest(key, result);

			setIsLoading(true);

			const fetchData = async () => {
				const data = await result;

				if (!data) {
					setData(undefined);
					setError('нет данных' as E);
					store.errorRequest(key, new Error('нет данных'));

					return;
				}

				const errorData = data as PossibleError;
				if (errorData.type === 'error') {
					setData(undefined);
					setIsLoading(false);
					setError(errorData.message as E);
					store.errorRequest(key, new Error(errorData.message));

					return;
				}

				store.successRequest(key, data);
				setData(data);
				setIsLoading(false);
				setError(undefined);
			};

			fetchData();

			return;
		}

		store.successRequest(key, result);
		setData(result);
		setError(undefined);
		setIsLoading(false);
	}, [key, store]);

	return { data, isLoading, error };
}
