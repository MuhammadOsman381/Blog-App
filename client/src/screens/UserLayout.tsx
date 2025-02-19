import { SidebarProvider } from "@/components/ui/sidebar"
import { SideBar } from "./SideBar"
import NavBar from "@/components/NavBar"
import App from "@/App"

const UserLayout = () => {
    return (
        <SidebarProvider>
            <SideBar />
            <main className="w-full">
                <NavBar />
                <App />
            </main>
        </SidebarProvider>
    )
}

export default UserLayout