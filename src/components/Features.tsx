import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Leaf, Search, Shield, Recycle, Users, TrendingUp, Award } from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: MapPin,
      title: "Vendor Discovery",
      description: "Find amazing street food vendors near you with real-time location tracking and interactive maps.",
      gradient: "gradient-primary",
      features: [
        "Interactive map with live vendor locations",
        "Advanced search and filtering",
        "Real-time operating status",
        "Pre-order capabilities"
      ]
    },
    {
      icon: Star,
      title: "Hygiene Transparency",
      description: "Build trust through comprehensive hygiene ratings and transparency in food safety practices.",
      gradient: "gradient-trust",
      features: [
        "Detailed hygiene self-declarations",
        "Customer rating system",
        "Photo verification",
        "FSSAI certification tracking"
      ]
    },
    {
      icon: Leaf,
      title: "Sustainability Hub",
      description: "Promote eco-friendly practices and connect vendors with waste management solutions.",
      gradient: "gradient-secondary",
      features: [
        "Waste collection point locator",
        "Vendor waste reporting",
        "Recycler network connection",
        "Sustainability best practices"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Search,
      title: "Smart Discovery",
      description: "AI-powered recommendations based on your preferences and location."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Verified vendor profiles with comprehensive safety information."
    },
    {
      icon: Recycle,
      title: "Waste Management",
      description: "Connect with local recycling and composting initiatives."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Reviews and ratings from real customers in your area."
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Help vendors grow with insights and performance tracking."
    },
    {
      icon: Award,
      title: "Recognition Program",
      description: "Highlight top-performing vendors with hygiene and sustainability awards."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Three Pillars of
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              Street Food Excellence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform addresses every aspect of the street food ecosystem, 
            from discovery to sustainability.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden border-0 shadow-medium hover:shadow-strong transition-all duration-500 hover:scale-105">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-${feature.gradient} opacity-5`}></div>
                
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className={`w-16 h-16 bg-${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{feature.title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {feature.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need for Street Food Success
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 rounded-xl hover:bg-muted/50 transition-colors duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-8 md:p-12 shadow-strong">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Street Food?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors and customers who are already part of the street food revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Start as Customer
            </Button>
            <Button size="lg" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
              Join as Vendor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;