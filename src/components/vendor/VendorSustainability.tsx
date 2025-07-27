import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Leaf, Recycle, Trash2, Phone } from 'lucide-react';

interface VendorSustainabilityProps {
  vendorDetails: any;
}

export function VendorSustainability({ vendorDetails }: VendorSustainabilityProps) {
  const [practices, setPractices] = useState({
    uses_biodegradable_packaging: true,
    offers_reusable_containers: false,
    minimizes_plastic: true,
    composts_food_waste: false,
    segregates_waste: true,
    uses_public_bins: true,
    works_with_waste_collector: false,
    recycles_packaging: true,
    interested_in_waste_initiatives: true
  });

  const [dailyWaste, setDailyWaste] = useState({
    food_waste: '2',
    plastic_waste: '1',
    other_waste: '0.5'
  });

  const practicesCount = Object.values(practices).filter(Boolean).length;
  const totalPractices = Object.keys(practices).length;
  const sustainabilityScore = Math.round((practicesCount / totalPractices) * 100);

  const practiceLabels = {
    uses_biodegradable_packaging: 'Uses biodegradable packaging',
    offers_reusable_containers: 'Offers reusable containers',
    minimizes_plastic: 'Minimizes plastic usage',
    composts_food_waste: 'Composts food waste',
    segregates_waste: 'Segregates wet and dry waste',
    uses_public_bins: 'Uses designated public bins',
    works_with_waste_collector: 'Works with waste collection agency',
    recycles_packaging: 'Recycles packaging materials',
    interested_in_waste_initiatives: 'Interested in waste management initiatives'
  };

  const wasteInitiatives = [
    {
      name: 'Green Earth Recycling',
      type: 'Plastic & Paper Recycling',
      contact: '+91 98765 43210',
      description: 'Collects plastic and paper waste from food vendors'
    },
    {
      name: 'Compost Connect',
      type: 'Organic Waste Composting',
      contact: '+91 87654 32109',
      description: 'Converts food waste into compost for urban farming'
    },
    {
      name: 'Zero Waste Initiative',
      type: 'Complete Waste Management',
      contact: '+91 76543 21098',
      description: 'End-to-end waste management solutions for vendors'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Sustainability Practices</h1>
        <p className="text-muted-foreground">
          Track your environmental impact and connect with waste management initiatives.
        </p>
      </div>

      {/* Sustainability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{sustainabilityScore}%</div>
            <Progress value={sustainabilityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Practices Adopted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{practicesCount}/{totalPractices}</div>
            <p className="text-sm text-muted-foreground">Green practices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eco Badge Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="bg-green-600">
              <Leaf className="h-3 w-3 mr-1" />
              Eco-Friendly
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">Earned with 70%+ score</p>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Sustainable Practices Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(practiceLabels).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={practices[key as keyof typeof practices]}
                  onCheckedChange={(checked) =>
                    setPractices(prev => ({ ...prev, [key]: !!checked }))
                  }
                />
                <Label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {label}
                </Label>
              </div>
            ))}
          </div>
          <Button className="mt-4">Update Practices</Button>
        </CardContent>
      </Card>

      {/* Daily Waste Logging */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Daily Waste Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="food_waste">Food Waste (kg)</Label>
              <Input
                id="food_waste"
                type="number"
                value={dailyWaste.food_waste}
                onChange={(e) => setDailyWaste(prev => ({ ...prev, food_waste: e.target.value }))}
                placeholder="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plastic_waste">Plastic Waste (kg)</Label>
              <Input
                id="plastic_waste"
                type="number"
                value={dailyWaste.plastic_waste}
                onChange={(e) => setDailyWaste(prev => ({ ...prev, plastic_waste: e.target.value }))}
                placeholder="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="other_waste">Other Waste (kg)</Label>
              <Input
                id="other_waste"
                type="number"
                value={dailyWaste.other_waste}
                onChange={(e) => setDailyWaste(prev => ({ ...prev, other_waste: e.target.value }))}
                placeholder="0"
                step="0.1"
              />
            </div>
          </div>
          <Button>Log Today's Waste</Button>
        </CardContent>
      </Card>

      {/* Waste Management Partners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="h-5 w-5" />
            Connect with Waste Management Partners
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wasteInitiatives.map((initiative, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{initiative.name}</h4>
                  <Badge variant="outline" className="mt-1">
                    {initiative.type}
                  </Badge>
                </div>
                <Button size="sm" variant="outline" className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  Contact
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{initiative.description}</p>
              <p className="text-sm font-medium">{initiative.contact}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sustainability Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Reduce Plastic Usage</h4>
              <p className="text-sm text-muted-foreground">
                Switch to biodegradable plates and encourage customers to bring reusable containers.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Food Waste Management</h4>
              <p className="text-sm text-muted-foreground">
                Compost food scraps or partner with local composting initiatives.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Waste Segregation</h4>
              <p className="text-sm text-muted-foreground">
                Separate wet and dry waste at source for better recycling outcomes.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Community Impact</h4>
              <p className="text-sm text-muted-foreground">
                Join local environmental initiatives to create a bigger positive impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}