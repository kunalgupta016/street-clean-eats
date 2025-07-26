import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Join Street Eats
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose how you'd like to be part of our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Registration */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Food Lover</CardTitle>
              <CardDescription className="text-base">
                Discover amazing street food, rate vendors, and join our community of food enthusiasts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Discover nearby street food vendors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Rate vendors on hygiene and quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Find eco-friendly food options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span>Pre-order and skip the queue</span>
                </div>
              </div>
              <Link to="/register/customer" className="block">
                <Button className="w-full" size="lg">
                  Sign Up as Customer
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Vendor Registration */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                <Store className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Food Vendor</CardTitle>
              <CardDescription className="text-base">
                Showcase your business, reach more customers, and grow your street food venture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span>List your stall and menu items</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span>Manage orders and customer interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span>Showcase hygiene practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span>Connect with waste management</span>
                </div>
              </div>
              <Link to="/register/vendor" className="block">
                <Button className="w-full" size="lg" variant="secondary">
                  Sign Up as Vendor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/signin" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;