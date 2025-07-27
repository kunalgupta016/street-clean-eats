import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Mail, Phone, Lock, Bell, Eye, Trash2 } from 'lucide-react';

interface VendorSettingsProps {
  vendorProfile: any;
  onUpdate: () => void;
}

export function VendorSettings({ vendorProfile, onUpdate }: VendorSettingsProps) {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [accountData, setAccountData] = useState({
    full_name: vendorProfile?.full_name || '',
    mobile_number: vendorProfile?.mobile_number || ''
  });

  const [notifications, setNotifications] = useState({
    email_orders: true,
    email_reviews: true,
    sms_orders: false,
    sms_reviews: false,
    marketing_emails: vendorProfile?.marketing_opt_in || false
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await supabase
        .from('profiles')
        .update(accountData)
        .eq('user_id', user?.id);

      toast({
        title: "Account Updated",
        description: "Your account information has been updated successfully.",
      });
      
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new_password
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      await supabase
        .from('profiles')
        .update({ marketing_opt_in: notifications.marketing_emails })
        .eq('user_id', user?.id);

      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notifications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, you'd implement account deletion logic here
      toast({
        title: "Account Deletion",
        description: "Please contact support to delete your account.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccountUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={accountData.full_name}
                  onChange={(e) => setAccountData({ ...accountData, full_name: e.target.value })}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile_number">Mobile Number</Label>
                <Input
                  id="mobile_number"
                  type="tel"
                  value={accountData.mobile_number}
                  onChange={(e) => setAccountData({ ...accountData, mobile_number: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input value={user?.email || ''} disabled />
              <p className="text-xs text-muted-foreground">Email cannot be changed from here</p>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                value={passwordData.current_password}
                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                value={passwordData.new_password}
                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input
                id="confirm_password"
                type="password"
                value={passwordData.confirm_password}
                onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })}
                placeholder="Confirm new password"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications for new orders</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive new orders</p>
              </div>
              <Switch
                checked={notifications.email_orders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email_orders: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications for new reviews</Label>
                <p className="text-sm text-muted-foreground">Get notified when customers leave reviews</p>
              </div>
              <Switch
                checked={notifications.email_reviews}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email_reviews: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS notifications for orders</Label>
                <p className="text-sm text-muted-foreground">Receive SMS alerts for new orders</p>
              </div>
              <Switch
                checked={notifications.sms_orders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms_orders: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing emails</Label>
                <p className="text-sm text-muted-foreground">Receive updates about new features and tips</p>
              </div>
              <Switch
                checked={notifications.marketing_emails}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketing_emails: checked })}
              />
            </div>
          </div>
          
          <Button onClick={handleNotificationUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Delete Account</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete your vendor account and all associated data. This action cannot be undone.
            </p>
          </div>
          <Button variant="destructive" onClick={handleAccountDeletion}>
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}