"use client";

import { useUser } from "@/src/context/user.provider";
import CreatePostModal from "@/src/modal/CreatePostModal";
import { logout } from "@/src/services/authService";
import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaPaperPlane,
  FaBell,
  FaCog,
  FaBars,
  FaPlus,
  FaChartBar,
  FaSignOutAlt,
  FaUserFriends,
  FaEdit,
} from "react-icons/fa";
import { RiVipCrownFill } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import PremiumModal from "@/src/modal/PremiumModal";
import { useGetUser } from "@/src/hooks/auth.hooks";

const LeftSidebar = () => {
  const {  setIsLoading } = useUser();
  const { data } = useGetUser();
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isAdminExpanded, setIsAdminExpanded] = useState(false); // Admin sub-options state
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
    router.push("/login");
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Toggle Admin Management sub-options
  const toggleAdminOptions = () => {
    setIsAdminExpanded(!isAdminExpanded);
  };

  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };

  // Function to close the Premium Modal
  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  return (
    <>
      <button
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-full'
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar for large devices, toggle for small */}
      <aside
        className={`fixed inset-y-0 left-0 p-6 border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 w-64 z-40`}
      >
        <ul className='gap-y-12'>
          {user?.isPremium === false && (
            <li
              onClick={openPremiumModal}
              className='flex items-center justify-center text-white pt-1 py-1 rounded bg-yellow-800  cursor-pointer'
            >
              <RiVipCrownFill size={20} />
              <span className='ml-2'>Try Premium</span>
            </li>
          )}

          <li className='flex items-center space-x-4 hover:text-blue-600 cursor-pointer'>
            <p className='text-5xl font-bold font-title text-blue-800'>
              EcoGrow
            </p>
          </li>

          <Link href={"/dashboard"}>
            <li className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'>
              <FaHome size={20} />
              <span>Home</span>
            </li>
          </Link>
          <Link href={"/dashboard/search"}>
            <li className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'>
              <FaSearch size={20} />
              <span>Search</span>
            </li>
          </Link>
          <li
            onClick={openModal}
            className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'
          >
            <FaPlus size={20} />
            <span>Create</span>
          </li>

          {/* Admin Management */}
          <li
            className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'
            onClick={toggleAdminOptions}
          >
            <RiAdminLine size={20} />
            <span>Admin Manage</span>
          </li>

          {isAdminExpanded && (
            <ul className='pl-8 pt-2 space-y-2'>
              <Link href={"/dashboard/admin/user-manage"}>
                <li className='flex items-center space-x-4 hover:text-blue-600 cursor-pointer'>
                  <MdManageAccounts size={20} />
                  <span>User M.</span>
                </li>
              </Link>
              <Link href={"/dashboard/admin/post-manage"}>
                <li className='flex items-center space-x-4 hover:text-blue-600 cursor-pointer'>
                  <FaEdit size={20} />
                  <span>Post M.</span>
                </li>
              </Link>
              <Link href={"/dashboard/admin/analysis"}>
                <li className='flex items-center space-x-4 hover:text-blue-600 cursor-pointer'>
                  <FaChartBar size={20} />
                  <span>Analysis</span>
                </li>
              </Link>
            </ul>
          )}

          <Link href={"/dashboard/following"}>
            <li className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'>
              <FaBell size={20} />
              <span>Following</span>
            </li>
          </Link>
          <Link href={"/dashboard/friend"}>
            <li className='flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer'>
              <FaUserFriends size={20} />
              <span>Friends</span>
            </li>
          </Link>

          <Link href={"/management/userManage"}>
            <li className='flex items-center pt-5 py-4 space-x-4 hover:text-blue-600 cursor-pointer'>
              <FaCog size={20} />
              <span>Admin Layout</span>
            </li>
          </Link>

          <Divider className='my-4' />
          <Link href={"/dashboard/profile"}>
            <li className='flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer'>
              <Avatar size='sm' src={user?.profileImage} />
              <span>{"Profile"}</span>
            </li>
          </Link>

          <li
            onClick={handleLogOut}
            className='flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer'
          >
            <FaSignOutAlt size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </aside>

      {/* Overlay for small devices */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-30'
          onClick={toggleSidebar}
        />
      )}

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} />
    </>
  );
};

export default LeftSidebar;
