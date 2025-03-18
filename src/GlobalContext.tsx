import { createContext, useContext } from "react";

import type { User } from "./types";

export interface GlobalContextType {
	user: User | undefined;
	setUser: (user: User) => void;
}

interface GlobalContextProviderProps {
	children: React.ReactNode;
	value: GlobalContextType;
}

const GlobalContext = createContext<GlobalContextType>({
	user: undefined,
	setUser: () => null,
});

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
	children,
	value,
}) => {
	return (
		<GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	const context = useContext(GlobalContext);

	if (context === undefined) {
		throw new Error(
			"useGlobalContext must be used within a GlobalContextProvider",
		);
	}

	return context;
};
