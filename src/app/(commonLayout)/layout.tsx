import React from "react";

import LeftSidebar from "@/src/components/shared/sidebar/LeftSidebar";
import RightSidebar from "@/src/components/shared/sidebar/RightSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar on the left */}

        <LeftSidebar />

        {/* Main content */}
        <main className="flex-1 md:p-8 lg:ml-64  overflow-auto ">
          {children}
        </main>

        {/* Empty right side */}

        <RightSidebar />
      </div>
    </>
  );
};

export default Layout;
