import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, Store, User, Mail, Phone, MapPin, FileText, Clock, Shield, Leaf } from 'lucide-react';

const cuisineOptions = [
  { value: 'indian', label: 'Indian' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'italian', label: 'Italian' },
  { value: 'fast_food', label: 'Fast Food' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'south_indian', label: 'South Indian' },
  { value: 'north_indian', label: 'North Indian' },
  { value: 'regional', label: 'Regional' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'other', label: 'Other' },
];

const operationTypes = [
  { value: 'permanent_stall', label: 'Permanent Stall' },
  { value: 'mobile_cart', label: 'Mobile Cart' },
  { value: 'popup_events', label: 'Pop-up at Events' },
];

const RegisterVendor = () => {
  const [formData, setFormData] = useState({
    // Account & Contact
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    
    // Business Details
    stallName: '',
    businessDescription: '',
    primaryCuisine: '',
    operationType: '',
    
    // Location
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    
    // Hygiene Practices
    usesGloves: false,
    servesPurifiedWater: false,
    regularCleaning: false,
    properWasteDisposal: false,
    cleanUniforms: false,
    isFssaiCertified: false,
    fssaiLicenseNumber: '',
    
    // Sustainability
    usesPublicBins: false,
    segregatesWaste: false,
    compostsWaste: false,
    recyclesPackaging: false,
    worksWithWasteCollector: false,
    usesBiodegradablePackaging: false,
    offersReusableContainers: false,
    minimizesPlastic: false,
    interestedInWasteInitiatives: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'password', 'mobileNumber', 'stallName', 'primaryCuisine', 'operationType', 'addressLine1', 'city', 'state', 'pincode'];
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      user_type: 'vendor',
    });

    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Create profile and vendor details after successful signup
      setTimeout(async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Create profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                user_id: user.id,
                user_type: 'vendor',
                full_name: formData.fullName,
                mobile_number: formData.mobileNumber,
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
              return;
            }

            // Create vendor details
            const { data: vendorData, error: vendorError } = await supabase
              .from('vendor_details')
              .insert({
                user_id: user.id,
                stall_name: formData.stallName,
                business_description: formData.businessDescription,
                primary_cuisine: formData.primaryCuisine as any,
                operation_type: formData.operationType as any,
                address_line_1: formData.addressLine1,
                address_line_2: formData.addressLine2,
                landmark: formData.landmark,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                is_fssai_certified: formData.isFssaiCertified,
                fssai_license_number: formData.fssaiLicenseNumber || null,
              })
              .select()
              .single();

            if (vendorError) {
              console.error('Vendor details creation error:', vendorError);
              return;
            }

            // Create hygiene practices
            const { error: hygieneError } = await supabase
              .from('vendor_hygiene_practices')
              .insert({
                vendor_id: vendorData.id,
                uses_gloves: formData.usesGloves,
                serves_purified_water: formData.servesPurifiedWater,
                regular_cleaning: formData.regularCleaning,
                proper_waste_disposal: formData.properWasteDisposal,
                clean_uniforms: formData.cleanUniforms,
              });

            if (hygieneError) {
              console.error('Hygiene practices creation error:', hygieneError);
            }

            // Create sustainability practices
            const { error: sustainabilityError } = await supabase
              .from('vendor_sustainability_practices')
              .insert({
                vendor_id: vendorData.id,
                uses_public_bins: formData.usesPublicBins,
                segregates_waste: formData.segregatesWaste,
                composts_food_waste: formData.compostsWaste,
                recycles_packaging: formData.recyclesPackaging,
                works_with_waste_collector: formData.worksWithWasteCollector,
                uses_biodegradable_packaging: formData.usesBiodegradablePackaging,
                offers_reusable_containers: formData.offersReusableContainers,
                minimizes_plastic: formData.minimizesPlastic,
                interested_in_waste_initiatives: formData.interestedInWasteInitiatives,
              });

            if (sustainabilityError) {
              console.error('Sustainability practices creation error:', sustainabilityError);
            }
          }
        } catch (err) {
          console.error('Error creating vendor data:', err);
        }
      }, 1000);

      toast({
        title: "Welcome to Street Eats!",
        description: "Your vendor account has been created successfully.",
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Join as Vendor
            </CardTitle>
            <CardDescription className="text-base">
              Showcase your street food business to the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Account & Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account & Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      name="mobileNumber"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Business Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stallName">Stall/Business Name *</Label>
                    <Input
                      id="stallName"
                      name="stallName"
                      placeholder="e.g., Sharma Ji ki Kachori"
                      value={formData.stallName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryCuisine">Primary Cuisine *</Label>
                    <Select 
                      value={formData.primaryCuisine} 
                      onValueChange={(value) => handleSelectChange('primaryCuisine', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cuisine type" />
                      </SelectTrigger>
                      <SelectContent>
                        {cuisineOptions.map((cuisine) => (
                          <SelectItem key={cuisine.value} value={cuisine.value}>
                            {cuisine.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operationType">Operation Type *</Label>
                    <Select 
                      value={formData.operationType} 
                      onValueChange={(value) => handleSelectChange('operationType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select operation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {operationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      name="businessDescription"
                      placeholder="Describe your specialties and what makes your food unique..."
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      placeholder="Street address"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      name="addressLine2"
                      placeholder="Additional address details"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="landmark">Landmark</Label>
                    <Input
                      id="landmark"
                      name="landmark"
                      placeholder="e.g., Near Clock Tower"
                      value={formData.landmark}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City name"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State name"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="000000"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Hygiene Practices */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Hygiene Practices
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'usesGloves', label: 'Uses gloves while handling food' },
                    { key: 'servesPurifiedWater', label: 'Serves purified/filtered water' },
                    { key: 'regularCleaning', label: 'Regularly cleans cooking area' },
                    { key: 'properWasteDisposal', label: 'Proper waste segregation bins available' },
                    { key: 'cleanUniforms', label: 'Staff wears clean aprons/uniforms' },
                    { key: 'isFssaiCertified', label: 'FSSAI Registered/Certified' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(item.key, checked as boolean)
                        }
                      />
                      <Label htmlFor={item.key} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {formData.isFssaiCertified && (
                  <div className="space-y-2">
                    <Label htmlFor="fssaiLicenseNumber">FSSAI License Number</Label>
                    <Input
                      id="fssaiLicenseNumber"
                      name="fssaiLicenseNumber"
                      placeholder="Enter FSSAI license number"
                      value={formData.fssaiLicenseNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>

              {/* Sustainability Practices */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Sustainability Practices
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'usesPublicBins', label: 'Uses public bins' },
                    { key: 'segregatesWaste', label: 'Segregates wet/dry waste' },
                    { key: 'compostsWaste', label: 'Composts food waste' },
                    { key: 'recyclesPackaging', label: 'Recycles plastic/packaging' },
                    { key: 'worksWithWasteCollector', label: 'Works with a private waste collector' },
                    { key: 'usesBiodegradablePackaging', label: 'Uses biodegradable plates/packaging' },
                    { key: 'offersReusableContainers', label: 'Offers reusable containers' },
                    { key: 'minimizesPlastic', label: 'Minimizes plastic usage' },
                    { key: 'interestedInWasteInitiatives', label: 'Interested in waste management initiatives' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={formData[item.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(item.key, checked as boolean)
                        }
                      />
                      <Label htmlFor={item.key} className="text-sm font-normal cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Creating Vendor Account..." : "Create Vendor Account"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterVendor;