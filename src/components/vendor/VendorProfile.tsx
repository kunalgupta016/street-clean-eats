import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Constants } from '@/integrations/supabase/types';

interface VendorProfileProps {
  vendorProfile: any;
  vendorDetails: any;
  onUpdate: () => void;
}

export function VendorProfile({ vendorProfile, vendorDetails, onUpdate }: VendorProfileProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    stall_name: vendorDetails?.stall_name || '',
    business_description: vendorDetails?.business_description || '',
    primary_cuisine: vendorDetails?.primary_cuisine || '',
    operation_type: vendorDetails?.operation_type || '',
    address_line_1: vendorDetails?.address_line_1 || '',
    address_line_2: vendorDetails?.address_line_2 || '',
    landmark: vendorDetails?.landmark || '',
    city: vendorDetails?.city || '',
    state: vendorDetails?.state || '',
    pincode: vendorDetails?.pincode || '',
    mobile_number: vendorProfile?.mobile_number || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (vendorDetails) {
        await supabase
          .from('vendor_details')
          .update(formData)
          .eq('user_id', vendorProfile.user_id);
      } else {
        await supabase
          .from('vendor_details')
          .insert({ ...formData, user_id: vendorProfile.user_id });
      }

      await supabase
        .from('profiles')
        .update({ mobile_number: formData.mobile_number })
        .eq('user_id', vendorProfile.user_id);

      toast({
        title: "Profile Updated",
        description: "Your vendor profile has been successfully updated.",
      });
      
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your business information and stall details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stall_name">Stall Name *</Label>
              <Input
                id="stall_name"
                value={formData.stall_name}
                onChange={(e) => setFormData({ ...formData, stall_name: e.target.value })}
                placeholder="e.g., Sharma Ji ki Kachori"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile_number">Mobile Number *</Label>
              <Input
                id="mobile_number"
                type="tel"
                value={formData.mobile_number}
                onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                placeholder="+91 9876543210"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="business_description">Business Description</Label>
              <Textarea
                id="business_description"
                value={formData.business_description}
                onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
                placeholder="Describe your specialty dishes and what makes your stall unique..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary_cuisine">Primary Cuisine *</Label>
              <Select 
                value={formData.primary_cuisine} 
                onValueChange={(value) => setFormData({ ...formData, primary_cuisine: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cuisine type" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.cuisine_type.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine.charAt(0).toUpperCase() + cuisine.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operation_type">Operation Type *</Label>
              <Select 
                value={formData.operation_type} 
                onValueChange={(value) => setFormData({ ...formData, operation_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operation type" />
                </SelectTrigger>
                <SelectContent>
                  {Constants.public.Enums.operation_type.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address_line_1">Address Line 1 *</Label>
              <Input
                id="address_line_1"
                value={formData.address_line_1}
                onChange={(e) => setFormData({ ...formData, address_line_1: e.target.value })}
                placeholder="Street address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line_2">Address Line 2</Label>
              <Input
                id="address_line_2"
                value={formData.address_line_2}
                onChange={(e) => setFormData({ ...formData, address_line_2: e.target.value })}
                placeholder="Area, sector, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                placeholder="Near Clock Tower"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="123456"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Status */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={vendorDetails ? "default" : "secondary"}>
                {vendorDetails ? "Profile Complete" : "Profile Incomplete"}
              </Badge>
              {!vendorDetails && (
                <span className="text-sm text-muted-foreground">
                  Complete your profile to start receiving customers
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}