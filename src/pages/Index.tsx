
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from '@/components/layout/MainSidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
        <Navbar />
        
        <div className="flex flex-1 w-full">
          <MainSidebar />
          
          <main className="flex-grow">
            {/* Hero Section */}
            <Hero />
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default Index;
