/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true); // Loading state added

	// Load user from localStorage on initial render
	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setUser(storedUser);
		}
		setLoading(false); // Mark loading as complete
	}, []);

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
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{!loading && children} {/* Ensures no flickering before authentication check */}
		</AuthContext.Provider>
	);
};
