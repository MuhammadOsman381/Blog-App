import { Home, LogOut, Notebook, User, } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, Navigate } from "react-router-dom"

const items = [
    {
        title: "Home",
        url: "/user/home",
        icon: Home,
    },
    {
        title: "Create Blog",
        url: "/user/create-blogs",
        icon: Notebook,
    },
    {
        title: "Profile",
        url: "/user/profile",
        icon: User,
    },
    {
        title: "Logout",
        url: "/",
        icon: LogOut,
    },

]

export function SideBar() {

    const logOutHandler = () => {
        localStorage.clear();
        <Navigate to="/" replace />;
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link onClick={item.title === "Logout" ? logOutHandler : undefined} to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar >
    )
}
