import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { VendorLayout } from '@/components/vendor/VendorLayout';
import { DashboardOverview } from '@/components/vendor/DashboardOverview';
import { VendorProfile } from '@/components/vendor/VendorProfile';
import { VendorMenu } from '@/components/vendor/VendorMenu';
import { VendorOrders } from '@/components/vendor/VendorOrders';
import { VendorReviews } from '@/components/vendor/VendorReviews';
import { VendorHygiene } from '@/components/vendor/VendorHygiene';
import { VendorSustainability } from '@/components/vendor/VendorSustainability';
import { VendorSettings } from '@/components/vendor/VendorSettings';

export default function VendorDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [vendorDetails, setVendorDetails] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      fetchVendorData();
    }
  }, [user, loading, navigate]);

  const fetchVendorData = async () => {
    if (!user) return;

    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profile?.user_type !== 'vendor') {
        navigate('/');
        return;
      }

      setVendorProfile(profile);

      // Fetch vendor details
      const { data: details } = await supabase
        .from('vendor_details')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setVendorDetails(details);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview vendorProfile={vendorProfile} vendorDetails={vendorDetails} />;
      case 'profile':
        return <VendorProfile vendorProfile={vendorProfile} vendorDetails={vendorDetails} onUpdate={fetchVendorData} />;
      case 'menu':
        return <VendorMenu vendorDetails={vendorDetails} />;
      case 'orders':
        return <VendorOrders vendorDetails={vendorDetails} />;
      case 'reviews':
        return <VendorReviews vendorDetails={vendorDetails} />;
      case 'hygiene':
        return <VendorHygiene vendorDetails={vendorDetails} />;
      case 'sustainability':
        return <VendorSustainability vendorDetails={vendorDetails} />;
      case 'settings':
        return <VendorSettings vendorProfile={vendorProfile} onUpdate={fetchVendorData} />;
      default:
        return <DashboardOverview vendorProfile={vendorProfile} vendorDetails={vendorDetails} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !vendorProfile) {
    return null;
  }

  return (
    <VendorLayout
      vendorProfile={vendorProfile}
      vendorDetails={vendorDetails}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderActiveSection()}
    </VendorLayout>
  );
}