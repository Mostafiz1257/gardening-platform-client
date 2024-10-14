"use client";

import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaHome,
  FaCog,
  FaBars,
  FaPlus,
  FaSignOutAlt,
  FaHeart,
  FaUserFriends,
  FaFileContract,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";

import { logout } from "@/src/services/authService";
import CreatePostModal from "@/src/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import PremiumModal from "@/src/modal/PremiumModal";
import { useGetUser } from "@/src/hooks/auth.hooks";

const LeftSidebar = () => {
  const { setIsLoading } = useUser();
  const { data } = useGetUser();
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars className="text-blue-400" size={24} />
      </button>

      {/* Sidebar for large devices, toggle for small */}
      <aside
        className={`fixed inset-y-0 left-0 p-6 border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 w-64 z-40`}
      >
        <ul className="gap-y-12">
          {user?.isPremium === false && (
            <li>
              <button
                className="flex items-center justify-center text-white pt-1 py-1 rounded bg-yellow-600 cursor-pointer px-2"
                onClick={openPremiumModal}
              >
                <RiVipCrownFill size={20} />
                <span className="ml-2">Try Premium</span>
              </button>
            </li>
          )}

          <li>
            <p className="text-5xl font-bold font-title text-blue-800">
              EcoGrow
            </p>
          </li>

          <Link href={"/dashboard"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaHome className="text-blue-400" size={20} />
                <span>Home</span>
              </button>
            </li>
          </Link>

          <li>
            <button
              className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer"
              onClick={openModal}
            >
              <FaPlus className="text-blue-400" size={20} />
              <span>Create</span>
            </button>
          </li>

          <Link href={"/dashboard/friend"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaUserFriends className="text-blue-400" size={20} />
                <span>Friends</span>
              </button>
            </li>
          </Link>
          <Link href={"/dashboard/favorite"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaHeart className="text-blue-400" size={20} />
                <span>Favorite</span>
              </button>
            </li>
          </Link>
          {user?.role === "admin" && (
            <>
              <Link href={"/management/userManage"}>
                <li>
                  <button className="flex items-center pt-5  space-x-4 hover:text-blue-600 cursor-pointer">
                    <FaCog className="text-blue-400" size={20} />
                    <span>Admin Layout</span>
                  </button>
                </li>
              </Link>
            </>
          )}

          <Link href={"/dashboard/contact"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaFileContract className="text-blue-400" size={20} />
                <span>Contract </span>
              </button>
            </li>
          </Link>
          <Link href={"/dashboard/about"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FcAbout className="text-blue-400" size={20} />
                <span>About us</span>
              </button>
            </li>
          </Link>
          <Divider className="my-4" />
          <Link href={"/dashboard/profile"}>
            <li>
              <button className="flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer">
                <Avatar size="sm" src={user?.profileImage} />
                <span>{"Profile"}</span>
                <span className='ml-3'>
      {user?.isPremium && (
        <MdVerified className='text-blue-700 ' />
      )}
    </span>
              </button>
            </li>
          </Link>

          <li>
            <button
              className="flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer"
              onClick={handleLogOut}
            >
              <FaSignOutAlt className="text-blue-400" size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Overlay for small devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          role="button"
          tabIndex={0} // Make the overlay focusable
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === "Enter" && toggleSidebar()} // Handle keyboard interaction
        />
      )}

      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} />
    </>
  );
};

export default LeftSidebar;
