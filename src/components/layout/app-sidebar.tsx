"use client";

import {
  GraduationCap,
  LayoutGrid,
  Newspaper,
  Briefcase,
  Library,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from 'react';
import { useSidebar, Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { href: "/feed", icon: Newspaper, label: "Startup Feed" },
  { href: "/tasks", icon: Briefcase, label: "Task Exchange" },
  { href: "/resources", icon: Library, label: "Resource Hub" },
  { href: "/connections", icon: Users, label: "Connections" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { state } = useSidebar();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span
            className={cn(
              "text-xl font-bold font-headline",
              state === "collapsed" && "hidden"
            )}
          >
            CollegeFounder
          </span>
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-grow">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                icon={item.icon}
                tooltip={{ children: item.label }}
              >
                {item.label}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter>
        <Link href="/settings">
          <SidebarMenuButton
            isActive={isActive("/settings")}
            icon={Settings}
            tooltip={{ children: "Settings" }}
          >
            Settings
          </SidebarMenuButton>
        </Link>
        <SidebarMenuButton
            onClick={handleLogout}
            icon={LogOut}
            tooltip={{ children: "Logout" }}
          >
            Logout
        </SidebarMenuButton>
        <div className="p-2 border-t">
            <div className="flex items-center gap-3">
            <Avatar>
                <AvatarImage src={user?.photoURL ?? `https://placehold.co/40x40.png`} alt={user?.displayName ?? 'User'} />
                <AvatarFallback>{user?.displayName?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className={cn("flex flex-col overflow-hidden", state === 'collapsed' && 'hidden')}>
                <span className="font-semibold text-sm truncate">{user?.displayName ?? 'User'}</span>
                <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
            </div>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
