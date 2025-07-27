import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Store, 
  Menu, 
  ShoppingCart, 
  Star, 
  Shield, 
  Leaf, 
  Settings, 
  Bell, 
  Eye,
  LogOut,
  BarChart3,
  MenuIcon,
  X
} from 'lucide-react';

interface VendorLayoutProps {
  vendorProfile: any;
  vendorDetails: any;
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'menu', label: 'My Menu', icon: Menu },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'hygiene', label: 'Hygiene', icon: Shield },
  { id: 'sustainability', label: 'Sustainability', icon: Leaf },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function VendorLayout({ 
  vendorProfile, 
  vendorDetails, 
  activeSection, 
  onSectionChange, 
  children 
}: VendorLayoutProps) {
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const stallName = vendorDetails?.stall_name || vendorProfile?.full_name || 'My Stall';
  const initials = stallName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={vendorProfile?.profile_picture_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">Welcome, {stallName}!</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                3
              </Badge>
            </Button>
            
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <Eye className="h-4 w-4" />
              View Public Profile
            </Button>

            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-background border-r transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-6 w-6"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Quick Status Card */}
          <div className="p-4">
            <Card className="p-3">
              <div className="text-sm font-medium mb-2">Quick Status</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Status:</span>
                  <Badge variant="secondary" className="text-xs">
                    {vendorDetails ? 'Complete' : 'Incomplete'}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Stall Status:</span>
                  <Badge variant="outline" className="text-xs">
                    Offline
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-200 ${sidebarOpen ? 'md:ml-64' : 'md:ml-64'}`}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}