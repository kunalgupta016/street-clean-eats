-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('customer', 'vendor');

-- Create enum for operation types
CREATE TYPE public.operation_type AS ENUM ('permanent_stall', 'mobile_cart', 'popup_events');

-- Create enum for cuisine types
CREATE TYPE public.cuisine_type AS ENUM ('indian', 'chinese', 'italian', 'fast_food', 'desserts', 'south_indian', 'north_indian', 'regional', 'healthy', 'other');

-- Create profiles table for basic user information
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    user_type user_type NOT NULL,
    full_name TEXT NOT NULL,
    mobile_number TEXT,
    profile_picture_url TEXT,
    preferred_location TEXT,
    favorite_cuisines cuisine_type[],
    marketing_opt_in BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendor_details table for vendor-specific information
CREATE TABLE public.vendor_details (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    stall_name TEXT NOT NULL,
    business_description TEXT,
    primary_cuisine cuisine_type NOT NULL,
    operation_type operation_type NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    landmark TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    average_rating DECIMAL(3, 2) DEFAULT 0,
    hygiene_rating DECIMAL(3, 2) DEFAULT 0,
    is_fssai_certified BOOLEAN DEFAULT false,
    fssai_license_number TEXT,
    operating_hours JSONB, -- Store weekly schedule as JSON
    stall_images TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendor_hygiene_practices table
CREATE TABLE public.vendor_hygiene_practices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID NOT NULL REFERENCES vendor_details(id) ON DELETE CASCADE,
    uses_gloves BOOLEAN DEFAULT false,
    serves_purified_water BOOLEAN DEFAULT false,
    regular_cleaning BOOLEAN DEFAULT false,
    proper_waste_disposal BOOLEAN DEFAULT false,
    clean_uniforms BOOLEAN DEFAULT false,
    hygiene_photo_urls TEXT[], -- Array of hygiene evidence photo URLs
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendor_sustainability_practices table
CREATE TABLE public.vendor_sustainability_practices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID NOT NULL REFERENCES vendor_details(id) ON DELETE CASCADE,
    uses_public_bins BOOLEAN DEFAULT false,
    segregates_waste BOOLEAN DEFAULT false,
    composts_food_waste BOOLEAN DEFAULT false,
    recycles_packaging BOOLEAN DEFAULT false,
    works_with_waste_collector BOOLEAN DEFAULT false,
    uses_biodegradable_packaging BOOLEAN DEFAULT false,
    offers_reusable_containers BOOLEAN DEFAULT false,
    minimizes_plastic BOOLEAN DEFAULT false,
    interested_in_waste_initiatives BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_hygiene_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_sustainability_practices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Create RLS policies for vendor_details
CREATE POLICY "Anyone can view vendor details"
ON public.vendor_details
FOR SELECT
USING (true);

CREATE POLICY "Vendors can create their own details"
ON public.vendor_details
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can update their own details"
ON public.vendor_details
FOR UPDATE
USING (auth.uid() = user_id);

-- Create RLS policies for vendor_hygiene_practices
CREATE POLICY "Anyone can view vendor hygiene practices"
ON public.vendor_hygiene_practices
FOR SELECT
USING (true);

CREATE POLICY "Vendors can manage their own hygiene practices"
ON public.vendor_hygiene_practices
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM vendor_details 
        WHERE vendor_details.id = vendor_hygiene_practices.vendor_id 
        AND vendor_details.user_id = auth.uid()
    )
);

-- Create RLS policies for vendor_sustainability_practices
CREATE POLICY "Anyone can view vendor sustainability practices"
ON public.vendor_sustainability_practices
FOR SELECT
USING (true);

CREATE POLICY "Vendors can manage their own sustainability practices"
ON public.vendor_sustainability_practices
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM vendor_details 
        WHERE vendor_details.id = vendor_sustainability_practices.vendor_id 
        AND vendor_details.user_id = auth.uid()
    )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_details_updated_at
    BEFORE UPDATE ON public.vendor_details
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_hygiene_practices_updated_at
    BEFORE UPDATE ON public.vendor_hygiene_practices
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendor_sustainability_practices_updated_at
    BEFORE UPDATE ON public.vendor_sustainability_practices
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();