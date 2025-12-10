import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Upload, BarChart3, ShoppingCart, Settings, TrendingDown, LineChart } from "lucide-react"
import Link from "next/link"
import { AppProvider } from "@/lib/context/app-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dhani Dhanya - Smart insights for fresh goods",
  description: "AI-powered dynamic pricing system to reduce food waste and maximize revenue",
    generator: 'Dhani Dhanya'
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Upload Dataset",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Inventory",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "User Side",
    url: "/pos",
    icon: ShoppingCart,
  },
  {
    title: "Analysis",
    url: "/analysis",
    icon: LineChart,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

function AppSidebar() {
  return (
    <Sidebar className="bg-gradient-to-b from-green-700 via-green-600 to-green-700 backdrop-blur-xl">
      <SidebarHeader className="border-b border-green-500/30 glass-dark">
        <div className="flex items-center gap-4 px-6 py-6">
          <TrendingDown className="h-12 w-12 text-white drop-shadow-lg" />
          <span className="font-bold text-3xl text-white drop-shadow-md">Dhani Dhanya</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl text-green-100 mb-4 px-4 font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto py-0 hover:bg-transparent">
                    <Link href={item.url} className="flex items-center gap-4 px-4 py-5 rounded-xl glass-dark hover:bg-green-500/30 transition-all duration-300 group">
                      <item.icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                      <span className="text-xl text-white font-medium group-hover:translate-x-1 transition-transform">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-green-500/30 glass-dark">
        <div className="p-6 text-lg text-white font-medium">© 2024 Dhani Dhanya</div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-20 shrink-0 items-center gap-3 border-b px-6 bg-green-600 text-white shadow-lg">
                <SidebarTrigger className="-ml-1 text-white" />
                <div className="ml-3 font-semibold text-xl">Smart insights for fresh goods</div>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  )
}
