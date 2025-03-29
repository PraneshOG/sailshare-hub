
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from '@/components/layout/MainSidebar';

const NotFound = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 to-purple-900 w-full">
        <Navbar />
        
        <div className="flex flex-1 w-full">
          <MainSidebar />
          
          <main className="flex-grow flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <h1 className="text-7xl font-bold text-white mb-6">404</h1>
              <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
              <p className="text-gray-200 mb-8">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link
                to="/"
                className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
              >
                Back to Home
              </Link>
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default NotFound;
