// ===========================================
// SIDEBAR COMPONENT
// ===========================================

'use client';

import React from 'react';
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
  const { sidebarOpen, setSidebarOpen } = useStore();
  const { user, signOut, isPro } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

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
        className={`
          ${sidebarOpen ? 'w-72 translate-x-0' : 'w-24 -translate-x-full md:translate-x-0'}
          bg-slate-900/50 backdrop-blur-xl border-r border-slate-800
          transition-all duration-300 flex flex-col
          fixed h-full z-40 md:relative shadow-2xl
        `}
      >
        {/* Logo */}
        <div className="p-6 h-20 flex items-center justify-between border-b border-slate-800/50">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 font-bold text-white text-xl tracking-tight">
              <div className="p-1.5 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg shadow-violet-500/20">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                CleanData
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-500 hover:text-white transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
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
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl
                  transition-all duration-200 group relative overflow-hidden
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-200 shadow-inner'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500 rounded-r-full" />
                )}
                <item.icon
                  size={22}
                  className={`
                    ${isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-white'}
                    transition-colors
                  `}
                />
                {sidebarOpen && (
                  <>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <ChevronRight size={16} className="ml-auto opacity-50" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 p-[2px] shadow-lg shadow-orange-500/10">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-medium text-white truncate">
                  {user?.full_name || user?.email || 'User'}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {isPro ? 'Pro Member' : 'Standard'}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleSignOut}
                className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
