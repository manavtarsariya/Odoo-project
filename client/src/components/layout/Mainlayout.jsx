import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./SideBar";
import Footer from "./Footer";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-zinc-950 min-h-screen">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Section */}
      <div className="flex flex-col flex-1 w-full">

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="text-white" />
          </button>

          <h1 className="text-white font-bold">
            Fleet<span className="text-amber-400">Flow</span>
          </h1>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}