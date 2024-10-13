"use client";

import React, { useState } from "react";
import { FaHome, FaUser, FaChartBar, FaSignOutAlt, FaBars, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { logout } from "@/src/services/authService";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";

const ManagementLayout = ({ children }) => {
  const { setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Toggle Button for Mobile Devices */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 p-4 bg-black text-white border-r border-gray-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 w-64 z-40`}
      >
        {/* Sidebar upper section */}
        <ul className="space-y-4 mt-10">
          <Link href="/management/userManage">
            <li className="flex items-center space-x-2 py-2 hover:text-gray-400 cursor-pointer">
              <FaUser size={20} />
              <span>User Management</span>
            </li>
          </Link>
          <Link href="/management/postManage">
            <li className="flex items-center space-x-2 py-2 hover:text-gray-400 cursor-pointer">
              <FaEdit size={20} />
              <span>Post Management</span>
            </li>
          </Link>
          <Link href="/management/analysis">
            <li className="flex items-center space-x-2 py-2 hover:text-gray-400 cursor-pointer">
              <FaChartBar size={20} />
              <span>Analysis</span>
            </li>
          </Link>
        </ul>

        {/* Sidebar bottom section */}
        <div className="absolute bottom-4 w-full">
          <Link href="/dashboard">
            <li className="flex items-center space-x-4 hover:text-gray-400 cursor-pointer mb-4 px-2">
              <FaHome size={20} />
              <span>Home</span>
            </li>
          </Link>
          <li
            onClick={handleLogOut}
            className="flex items-center space-x-4 hover:text-blue-600 cursor-pointer px-2"
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </li>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Content Area */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "ml-0" : "ml-0 lg:ml-64"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ManagementLayout;
