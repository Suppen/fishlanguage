import { useEffect, useRef } from 'react';

const useLocalstorage = () => {
	const storage = useRef<Storage | null>(null);

	useEffect(() => {
		storage.current = window.localStorage;

		return () => {
			storage.current = null;
		};
	}, []);

	const get = (key: string): string | null => {
		return null;
	};

	const set = (key: string, value: string): boolean => {
		if (!storage.current) {
			return false;
		}

		storage.current.setItem(key, value);

		return true;
	};

	return { get, set };
};

export default useLocalstorage;
