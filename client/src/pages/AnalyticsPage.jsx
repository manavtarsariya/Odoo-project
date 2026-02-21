import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsRequest } from "../features/report/reportSlice";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import {
    Fuel, TrendingUp, DollarSign, Download, PieChart as PieChartIcon,
    ArrowUpRight, ArrowDownRight, Activity, Calendar
} from "lucide-react";

const COLORS = ['#fbbf24', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl hover:border-zinc-700 transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 transition-colors ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trendValue}%
                </div>
            )}
        </div>
        <div>
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-black text-white mt-1">{value}</h3>
        </div>
    </div>
);

export default function AnalyticsPage() {
    const dispatch = useDispatch();
    const { analytics, loading } = useSelector((state) => state.report);

    useEffect(() => {
        dispatch(fetchAnalyticsRequest());
    }, [dispatch]);

    const handleExport = () => {
        window.open("http://localhost:3000/api/reports/export/csv", "_blank");
    };

    if (loading && analytics.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
        );
    }

    // Prepare chart data
    const barData = analytics.map(a => ({
        name: a.model,
        ROI: parseFloat(a.roi),
        Efficiency: parseFloat(a.fuelEfficiency)
    }));

    const pieData = analytics.map(a => ({
        name: a.vehicleName,
        value: a.totalRevenue
    })).slice(0, 5);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col flex-1 w-full space-y-8 animate-in fade-in duration-500 print:p-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Financial Reports</h1>
                    <p className="text-zinc-500 mt-1">Operational analytics and data-driven insights</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-black transition-all active:scale-95"
                    >
                        <PieChartIcon className="w-5 h-5" />
                        Print PDF
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black px-6 py-3 rounded-xl font-black transition-all shadow-lg shadow-amber-400/20 active:scale-95"
                    >
                        <Download className="w-5 h-5" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Avg Fuel Efficiency"
                    value={`${(analytics.reduce((acc, a) => acc + parseFloat(a.fuelEfficiency), 0) / (analytics.length || 1)).toFixed(2)} km/L`}
                    icon={Fuel}
                    color="text-amber-400"
                    trend="up"
                    trendValue="12"
                />
                <StatCard
                    title="Average ROI"
                    value={`${(analytics.reduce((acc, a) => acc + parseFloat(a.roi), 0) / (analytics.length || 1)).toFixed(2)}%`}
                    icon={TrendingUp}
                    color="text-blue-400"
                    trend="up"
                    trendValue="8.4"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${analytics.reduce((acc, a) => acc + a.totalRevenue, 0).toLocaleString()}`}
                    icon={DollarSign}
                    color="text-green-400"
                    trend="up"
                    trendValue="15.2"
                />
                <StatCard
                    title="Maintenance Cost"
                    value={`$${analytics.reduce((acc, a) => acc + a.totalMaintenance, 0).toLocaleString()}`}
                    icon={Activity}
                    color="text-red-400"
                    trend="down"
                    trendValue="3.1"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ROI Bar Chart */}
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-blue-400 w-5 h-5" />
                        Vehicle ROI Comparison (%)
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                                />
                                <Bar dataKey="ROI" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Fuel Efficiency Chart */}
                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Fuel className="text-amber-400 w-5 h-5" />
                        Fuel Efficiency by Model (km/L)
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="Efficiency" stroke="#fbbf24" strokeWidth={3} dot={{ r: 6, fill: '#fbbf24' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="px-8 py-6 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white">Operational Breakdown</h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        Last 30 Days
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-800/50 uppercase text-xs tracking-wider text-zinc-400 font-bold">
                            <tr>
                                <th className="p-4 pl-8">Vehicle</th>
                                <th className="p-4">Total Rev.</th>
                                <th className="p-4">Fuel Cost</th>
                                <th className="p-4">Maintenance</th>
                                <th className="p-4">Efficiency</th>
                                <th className="p-4 pr-8 text-right">ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {analytics.map((a) => (
                                <tr key={a.vehicleId} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="p-4 pl-8">
                                        <div className="font-bold text-white">{a.vehicleName}</div>
                                        <div className="text-zinc-500 text-xs">{a.model}</div>
                                    </td>
                                    <td className="p-4 font-bold text-green-400">${a.totalRevenue.toLocaleString()}</td>
                                    <td className="p-4 text-zinc-300">${a.totalFuelCost.toLocaleString()}</td>
                                    <td className="p-4 text-zinc-300">${a.totalMaintenance.toLocaleString()}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-white">
                                            {a.fuelEfficiency} <span className="text-zinc-500 text-xs">km/L</span>
                                        </div>
                                    </td>
                                    <td className="p-4 pr-8 text-right">
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-black ${parseFloat(a.roi) > 0 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                                            {a.roi}%
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
