"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  UserCircle,
  BookOpen,
  Star,
  HelpCircle,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: string;
}

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Leads", href: "/admin/leads", icon: UserCircle },
  { label: "Consultations", href: "/admin/consultations", icon: Calendar },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const clientLinks = [
  { label: "Dashboard", href: "/client", icon: LayoutDashboard },
  { label: "My Documents", href: "/client/documents", icon: Upload },
  { label: "Consultations", href: "/client/consultations", icon: Calendar },
  { label: "Messages", href: "/client/messages", icon: MessageSquare },
  { label: "Notifications", href: "/client/notifications", icon: Bell },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const isStaff = ["SUPER_ADMIN", "ATTORNEY", "CASE_MANAGER", "SUPPORT_STAFF"].includes(role);
  const links = isStaff ? adminLinks : clientLinks;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
      <div className="flex h-20 items-center border-b px-6">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-bold text-[#0B3AA8]">OLUS-BIS</span>
          <span className="text-[9px] font-medium tracking-wider text-[#F5B300] uppercase">
            Immigration Portal
          </span>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#0B3AA8] text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600"
          onClick={() => window.location.href = "/api/auth/signout"}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
