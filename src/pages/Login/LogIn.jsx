import { useState } from "react";
// import { useAuth } from "../context/authContext";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
	const [username, setUsername] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (!username.trim()) return alert("Username is required!");

		login(username);
		navigate("/dashboard"); // Redirect to dashboard after login
	};

	return (
		<div style={{
			backgroundImage: 'url("https://img.freepik.com/free-vector/coloured-abstract-background-design_1112-527.jpg?ga=GA1.1.313421730.1697088119&semt=ais_hybrid")',
			backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
			height: "100vh",
			backgroundAttachment: "fixed",
			 
		  }} 
		className="flex flex-col  h-screen justify-center  items-center shadow-black ">
		<form
  onSubmit={handleLogin}
  className="bg-white p-8 rounded-xl shadow-lg shadow-blue-500/50 w-80 h-auto flex flex-col justify-center items-center"
>
  {/* Centered Shopping Cart Image */}
  <div className="flex justify-center items-center mb-4">
    <img className="w-20 mx-auto" src="https://i.ibb.co/93k5Sjj5/shopping-cart.png" alt="Shopping Cart" />
  </div>

  {/* Centered Heading */}
  <h2 className="text-4xl font-bold mb-6 font-poppins text-center text-gray-700">
    Login
  </h2>

  {/* Input Field */}
  <input
    type="text"
    placeholder="Enter Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Login Button */}
  <button
    type="submit"
    className="w-full border-2 font-comic font-semibold border-sky-500 text-gray-700 
              hover:bg-blue-600 hover:text-white transition py-2 rounded-md"
  >
    Login
  </button>
</form>


		</div>
	);
};

export default LogIn;
