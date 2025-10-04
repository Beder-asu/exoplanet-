"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Upload, ImageIcon, Settings, BarChart3, User, Info, Orbit } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Data", href: "/upload-data", icon: Upload },
  { name: "Light Curve", href: "/light-curve", icon: ImageIcon },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Model Performance", href: "/model-performance", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
  { name: "About", href: "/about", icon: Info },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-950 border-r border-slate-800">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <Orbit className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-semibold text-white">Exoplanet Explorer</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="text-xs font-semibold text-slate-500 px-3 mb-2">Navigations</div>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
