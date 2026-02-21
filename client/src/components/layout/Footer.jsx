import React from 'react'

const Footer = () => {
 return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-black text-white tracking-tight">
            Fleet<span className="text-amber-400">Flow</span>
          </h2>
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
            Modular Fleet & Logistics Management System built for
            modern operations, compliance monitoring, and financial control.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4">
            Platform
          </h3>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Dashboard</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Vehicles</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Trips</li>
            <li className="hover:text-amber-400 cursor-pointer transition-colors">Analytics</li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest mb-4">
            System
          </h3>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li>Role-Based Access Control</li>
            <li>Real-Time Status Engine</li>
            <li>Operational Cost Tracking</li>
            <li>Financial ROI Analytics</li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} FleetFlow. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer