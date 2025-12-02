// ===========================================
// SIDEBAR COMPONENT
// ===========================================

'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Database,
  LayoutDashboard,
  CreditCard,
  Settings,
  ChevronRight,
  X,
  User,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'billing', label: 'Billing', icon: CreditCard, path: '/billing' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme } = useStore();
  const { user, signOut, isPro, getPlan } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  // Determine if sidebar should be expanded (either pinned open or hovered on desktop)
  const isExpanded = sidebarOpen || isHovered;

  // Get plan display name
  const planName = getPlan() === 'pro' ? 'Pro' : getPlan() === 'standard' ? 'Standard' : 'Free';

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          ${isExpanded ? 'w-72' : 'w-20'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${theme === 'dark'
            ? 'bg-slate-900/50 border-slate-800 shadow-2xl'
            : 'bg-white/90 border-slate-200/60 shadow-xl shadow-slate-200/50'}
          backdrop-blur-xl border-r
          transition-all duration-300 ease-in-out flex flex-col
          fixed h-full z-40 md:relative
        `}
      >
        {/* Logo */}
        <div className={`p-4 h-20 flex items-center justify-between border-b ${theme === 'dark' ? 'border-slate-800/50' : 'border-slate-100'}`}>
          <div
            className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer"
            onClick={() => router.push('/dashboard')}
          >
            <div className={`p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex-shrink-0 ${
              theme === 'dark' ? 'shadow-lg shadow-violet-500/20' : 'shadow-md shadow-violet-500/30'
            }`}>
              <Database className="w-5 h-5 text-white" />
            </div>
            <span
              className={`font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              } ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
            >
              CleanData
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-colors md:hidden cursor-pointer`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
                  transition-all duration-200 group relative
                  ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-200 shadow-inner'
                        : 'bg-gradient-to-r from-violet-500/10 to-indigo-500/5 text-violet-700 shadow-sm border border-violet-200/50'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r-full" />
                )}
                <div className="flex items-center justify-center w-8 flex-shrink-0">
                  <item.icon
                    size={22}
                    className={`
                      ${isActive
                        ? 'text-violet-600'
                        : theme === 'dark'
                          ? 'text-slate-500 group-hover:text-white'
                          : 'text-slate-400 group-hover:text-slate-700'}
                      transition-colors
                    `}
                  />
                </div>
                <span
                  className={`font-medium whitespace-nowrap transition-all duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0 md:opacity-100 md:absolute md:left-full md:ml-2 md:px-2 md:py-1 md:bg-slate-800 md:rounded md:shadow-lg md:invisible md:group-hover:visible md:z-50'
                  }`}
                >
                  {item.label}
                </span>
                {isExpanded && isActive && (
                  <ChevronRight size={16} className="ml-auto opacity-50 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="px-3 pb-2">
          <button
            onClick={toggleTheme}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer
              transition-all duration-200 group
              ${theme === 'dark'
                ? 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                : 'text-slate-600 hover:bg-gray-200/50 hover:text-gray-900'}
            `}
          >
            <div className="flex items-center justify-center w-8 flex-shrink-0">
              {theme === 'dark' ? (
                <Sun size={22} className="text-yellow-400" />
              ) : (
                <Moon size={22} className="text-slate-500" />
              )}
            </div>
            <span
              className={`font-medium whitespace-nowrap transition-all duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>

        {/* User Section */}
        <div className={`p-3 border-t ${theme === 'dark' ? 'border-slate-800/50 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-[2px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform ${
                theme === 'dark' ? 'shadow-lg shadow-violet-500/20' : 'shadow-md shadow-violet-500/30'
              }`}
              onClick={() => router.push('/settings')}
              title="Settings"
            >
              <div className={`w-full h-full rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
                <User size={18} className={theme === 'dark' ? 'text-white' : 'text-slate-700'} />
              </div>
            </div>
            <div
              className={`overflow-hidden flex-1 transition-all duration-300 cursor-pointer ${
                isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
              }`}
              onClick={() => router.push('/settings')}
            >
              <p className={`text-sm font-semibold truncate hover:text-violet-600 transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                {user?.full_name || user?.email || 'User'}
              </p>
              <p className={`text-xs truncate ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                {planName} Plan
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className={`p-2 rounded-lg transition-all cursor-pointer flex-shrink-0 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 p-0 overflow-hidden'
              } ${theme === 'dark' ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
