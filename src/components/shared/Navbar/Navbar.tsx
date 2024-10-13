
import { FaHome, FaSearch, FaPaperPlane, FaBell, FaUser, FaCog } from 'react-icons/fa';
const Navbar = () => {
    return (
        <>
    <ul className="space-y-6">
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaHome size={20} />
            <span>Home</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaSearch size={20} />
            <span>Search</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaPaperPlane size={20} />
            <span>Messages</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaBell size={20} />
            <span>Notifications</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaUser size={20} />
            <span>Profile</span>
          </li>
          <li className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer">
            <FaCog size={20} />
            <span>Settings</span>
          </li>
        </ul>
        </>
    );
};

export default Navbar;