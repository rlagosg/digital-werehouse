"use client";

import { Sidebar } from "@/components/ui/Sidebar/Sidebar";
import { useModeTheme } from "@/storage";
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import React, { useState } from "react";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { isDarck, themeDarck, themeLight } = useModeTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <ConfigProvider locale={esES} theme={{
        token: isDarck ? themeDarck : themeLight
      }}>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      </ConfigProvider>
    </>
  );
}
