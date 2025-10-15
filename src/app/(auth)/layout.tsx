"use client";

import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { isAuthenticatedAtom, userAtom } from "@/store/auth";
import { useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user] = useAtom(userAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const setUser = useSetAtom(userAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  const navigationItems = [
    {
      title: "Navigation",
      items: [
        { name: "Dashboard", icon: "📊", href: "/dashboard", active: true },
        { name: "Layouts", icon: "📐", href: "#" },
        { name: "Widgets", icon: "🧩", href: "#" },
      ],
    },
    {
      title: "Components",
      items: [
        { name: "UI Elements", icon: "🎨", href: "#" },
        { name: "Forms", icon: "📝", href: "#" },
        { name: "Tables", icon: "📋", href: "#" },
        { name: "Charts", icon: "📈", href: "#" },
        { name: "Miscellaneous", icon: "⚙️", href: "#" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#2c3e50] text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#34495e]">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
            M
          </div>
          <span className="text-xl font-bold">Madrasah AI</span>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center py-6 border-b border-[#34495e]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl font-semibold mb-3">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-base">{user?.name || "User"}</h3>
            <p className="text-sm text-gray-400">Administrator</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 overflow-y-auto h-[calc(100vh-250px)]">
          {navigationItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-6 py-2.5 transition-colors ${
                        item.active
                          ? "bg-[#34495e] border-l-4 border-green-400"
                          : "hover:bg-[#34495e]"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                      <svg
                        className="w-4 h-4 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* More Section */}
        <div className="absolute bottom-0 w-64 border-t border-[#34495e] bg-[#2c3e50]">
          <h4 className="px-6 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            More
          </h4>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-2.5 w-full hover:bg-[#34495e] transition-colors text-left"
          >
            <span className="text-lg">🚪</span>
            <span className="text-sm">Logout</span>
            <svg
              className="w-4 h-4 ml-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="bg-[#34495e] text-white shadow-lg z-40 flex-shrink-0">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#2c3e50]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type for search . . ."
                  className="w-full bg-[#2c3e50] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[#2c3e50] relative">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>

              <button className="p-2 rounded-lg hover:bg-[#2c3e50] relative">
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <button className="p-2 rounded-lg hover:bg-[#2c3e50]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              <button className="p-2 rounded-lg hover:bg-[#2c3e50]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </button>

              <button className="p-2 rounded-lg hover:bg-[#2c3e50]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
