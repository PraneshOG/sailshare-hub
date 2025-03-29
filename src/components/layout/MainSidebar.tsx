
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plane, Building, Car, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const MainSidebar = () => {
  const menuItems = [
    {
      title: "Flights",
      icon: Plane,
      url: "/",
      active: true
    },
    {
      title: "Stays",
      icon: Building,
      url: "/stays"
    },
    {
      title: "Car Rental",
      icon: Car,
      url: "/cars"
    },
    {
      title: "Explore",
      icon: Globe,
      url: "/explore"
    },
    {
      title: "Trips",
      icon: Heart,
      url: "/trips"
    }
  ];

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel>Travel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.active}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Language">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden bg-white">
                      <span className="text-xs font-bold">🇮🇳</span>
                    </span>
                    <span>English</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Currency">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">₹</span>
                    <span>Indian rupee</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
