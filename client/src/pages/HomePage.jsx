import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/layout/SideBar";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Section */}
      <div className="flex flex-col flex-1">

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
          <button onClick={() => setIsOpen(true)}>
            <Menu className="text-white" />
          </button>

          <h1 className="text-white font-bold">
            Fleet<span className="text-amber-400">Flow</span>
          </h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Page content */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}