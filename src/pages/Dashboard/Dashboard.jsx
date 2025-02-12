import { useAuth } from "../../context/authContext";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboardPage/Sidebar";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-white text-[#17A5EF] relative">
      <Sidebar onLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto relative flex flex-col">
        
        {/* Hero Section */}
        <div className="hero bg-base-200 min-h-screen w-full flex items-center justify-center">
          <div className="hero-content flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Text Content (Left Side) */}
            <div className="text-left max-w-xl justify-self-start">
              <h1 className="text-5xl font-bold">
                Welcome {user?.username}
              </h1>
              <p className="py-6 text-[#1f5f81] text-lg leading-relaxed">
                Welcome to your personalized dashboard, designed to give you complete control 
                over your product management. Effortlessly customize your space by adding 
                product categories and individual products tailored to your needs. With a seamless 
                and intuitive interface, you can organize and manage your inventory with precision, 
                ensuring a smooth and efficient workflow. Make the most of your dashboard by structuring 
                it exactly the way you envision—efficient, organized, and uniquely yours.
              </p>
            </div>

            {/* Image (Right Side) */}
            <div className="justify-self-end">
              <img
                src="https://i.ibb.co/jPxxnr7c/Untitled-design-removebg-preview.png"
                alt="Dashboard Main Image"
                className="max-w-md rounded-lg "
              />
            </div>

          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
