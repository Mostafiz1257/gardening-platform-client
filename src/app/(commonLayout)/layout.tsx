import React from "react";

import LeftSidebar from "@/src/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/src/components/shared/sidebar/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex h-screen'>
        <LeftSidebar />

        <main className='flex-1 md:p-8 lg:ml-48  overflow-auto '>
          {/* {children} */}
          {children}
        </main>

        <RightSidebar />
      </div>
    </>
  );
};

export default Layout;
