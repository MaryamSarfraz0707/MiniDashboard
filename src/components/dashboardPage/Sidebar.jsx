// Sidebar.jsx
import { Link } from "react-router-dom";
import { LogOut, Boxes, Package,LayoutDashboard } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onLogout }) => {
	return (
		<div className="h-screen w-64 bg-[#17A5EF] text-white p-4  flex flex-col">
			<div className="flex items-center gap-2">
  <LayoutDashboard size={30} />
  <h2 className="text-3xl font-poppins font-bold">
    Dashboard
  </h2>
</div>

			
			<nav className="flex-1 pl-0 ml-0 pt-10 ">
				<ul className="font-poppins">
					<li className="mb-2">
						<Link
							to="/dashboard/categories"
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-400 hover:text-[#1f5f81] transition">
							<Boxes size={30} /> Product Categories
						</Link>
					</li>
					<li className="mb-4">
						<Link
							to="/dashboard/products"
							className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-400 transition hover:text-[#1f5f81]">
							<Package size={30} /> Products
						</Link>
					</li>
				</ul>
			</nav>
			<button
				onClick={onLogout}
				className="flex items-center gap-3 border-2 border-white bg-transparent hover:bg-blue-400 hover:border-0 hover:text-[#1f5f81] text-white p-3 rounded-lg transition">
				<LogOut size={20} /> Logout
			</button>
		</div>
	);
};

export default Sidebar;
