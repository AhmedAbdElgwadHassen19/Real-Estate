"use client"
import {  Home,  TableProperties   } from "lucide-react"

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
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  
  {
    title: "All Properties",
    url: "/properties",
    icon: TableProperties  ,
  }
]

export function AppSidebar() {
    const {user} = useUser()
return (
    <Sidebar >
        <SidebarContent>
            <SidebarGroup >
                <SidebarGroupLabel className="text-2xl m-auto mt-5 "><h2>Real Estate</h2> </SidebarGroupLabel>
                    {!user ? (
                        <SignInButton>
                            <Button className="mt-10 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md cursor-pointer p-3 text-black"> Get Started</Button>
                        </SignInButton>
                    ) : (
                        <div className="mt-10 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md cursor-pointer p-3 flex items-center justify-center gap-3"> 
                            <UserButton />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-100"> {user.firstName}{user?.lastName} </span>
                        </div>
                    )}
                <SidebarGroupContent>
                    <SidebarMenu className="space-y-3 mt-5 flex flex-col items-center justify-center">
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <div className="space-y-3 mt-5 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md cursor-pointer">
                                    <a href={item.url} className="flex items-center gap-5 w-[150px] p-3">
                                        
                                        <span className="w-6 h-6 text-gray-700  flex-shrink-0"> 
                                            <item.icon />
                                        </span>
                                        
                                        <span className="text-md font-bold text-gray-700  whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </a>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
)
}