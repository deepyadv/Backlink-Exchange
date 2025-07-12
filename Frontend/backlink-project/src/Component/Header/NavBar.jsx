import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout, login } from "../../store/Auth.Store";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const handleSwitchRole = async () => {
    try {
      const res = await axios.patch("http://localhost:3000/users/switch-role", {}, { withCredentials: true });
      alert(res.data.msg);

      const profile = await axios.get("http://localhost:3000/users/get-current-user", { withCredentials: true });
      dispatch(login(profile.data)); // update redux store
    } catch (error) {
      console.log("Switch role failed", error);
    }
  };

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      show: !isAuthenticated,
      className: "bg-gray-700 hover:bg-white hover:text-black text-white cursor-pointer",
    },
    {
      name: "Register",
      slug: "/register",
      show: !isAuthenticated,
      className: "bg-white text-black hover:bg-gray-200 cursor-pointer",
    },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-md shadow-md border-b border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="navbar text-white max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="navbar-start">
          <Link to="/" className="font-bold text-xl text-white">LinkoBack</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/" className="font-bold text-white">Home</Link></li>
            <li><Link to="/faqs" className="font-bold text-white">FAQ</Link></li>
            <li><Link to="/contact-us" className="font-bold text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div className="navbar-end space-x-3 relative">
          {navItems
            .filter((item) => item.show)
            .map(({ name, slug, className }) => (
              <button
                key={name}
                onClick={() => navigate(slug)}
                className={`px-4 py-2 rounded font-bold border-none transition duration-200 ${className}`}
              >
                {name}
              </button>
            ))}

          {isAuthenticated && user?.email && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold uppercase"
              >
                {user.email.charAt(0)}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b font-medium">
                    {user.email}
                    <div className="text-sm text-gray-600">Role: {user.role}</div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      handleSwitchRole();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Switch Role
                  </button>

                  {user?.role === 'admin' && (
                    <button
                      onClick={() => navigate("/admin-dashboard")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
