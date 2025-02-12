import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		return JSON.parse(localStorage.getItem("user")) || null;
	});

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	}, [user]);

	const login = (username) => {
		const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
		let existingUser = storedUsers.find((u) => u.username === username);

		if (!existingUser) {
			existingUser = { username };
			storedUsers.push(existingUser);
			localStorage.setItem("users", JSON.stringify(storedUsers));

			if (!localStorage.getItem(`categories_${username}`)) {
				localStorage.setItem(`categories_${username}`, JSON.stringify([]));
			}
			if (!localStorage.getItem(`products_${username}`)) {
				localStorage.setItem(`products_${username}`, JSON.stringify([]));
			}
		}
		setUser(existingUser);
		console.log(storedUsers);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
