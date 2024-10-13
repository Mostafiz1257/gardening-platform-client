
import Footer from '@/src/components/shared/Footer/Footer';
import LeftSidebar from '@/src/components/shared/sidebar/LeftSidebar';
import RightSidebar from '@/src/components/shared/sidebar/RightSidebar';
import { useGetUser } from '@/src/hooks/auth.hooks';
import { Button } from '@nextui-org/button';
import React from 'react';
import { FaHome, FaSearch, FaPaperPlane, FaBell, FaUser, FaCog } from 'react-icons/fa';

const Layout = ({ children }: { children: React.ReactNode }) => {
 
  return (
    <>
    <div className="flex h-screen">
      {/* Sidebar on the left */}

      <LeftSidebar/>

      {/* Main content */}
      <main className="flex-1 md:p-8 lg:ml-64  overflow-auto ">
        {children}
      </main>

      {/* Empty right side */}
   
      <RightSidebar/>
    </div>
    </>
  );
};

export default Layout;
