import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Shield, Upload, CheckCircle, AlertTriangle } from 'lucide-react';

interface VendorHygieneProps {
  vendorDetails: any;
}

export function VendorHygiene({ vendorDetails }: VendorHygieneProps) {
  const [practices, setPractices] = useState({
    uses_gloves: true,
    serves_purified_water: true,
    regular_cleaning: true,
    proper_waste_disposal: false,
    clean_uniforms: true
  });

  const [fssaiNumber, setFssaiNumber] = useState('12345678901234');

  const hygieneScore = 4.8;
  const practicesCount = Object.values(practices).filter(Boolean).length;
  const totalPractices = Object.keys(practices).length;
  const completionPercentage = (practicesCount / totalPractices) * 100;

  const practiceLabels = {
    uses_gloves: 'Uses gloves while handling food',
    serves_purified_water: 'Serves purified/filtered water',
    regular_cleaning: 'Regular cleaning of cooking area',
    proper_waste_disposal: 'Proper waste segregation and disposal',
    clean_uniforms: 'Staff wears clean aprons/uniforms'
  };

  const tips = [
    {
      title: 'Hand Hygiene',
      description: 'Wash hands frequently and use gloves when handling food',
      icon: Shield
    },
    {
      title: 'Food Storage',
      description: 'Store raw and cooked foods separately at proper temperatures',
      icon: CheckCircle
    },
    {
      title: 'Water Quality',
      description: 'Use filtered water for drinking and food preparation',
      icon: Shield
    },
    {
      title: 'Waste Management',
      description: 'Segregate wet and dry waste properly',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Hygiene Management</h1>
        <p className="text-muted-foreground">
          Maintain and showcase your hygiene standards to build customer trust.
        </p>
      </div>

      {/* Hygiene Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hygiene Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{hygieneScore}</div>
            <p className="text-sm text-muted-foreground">Based on customer reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Practices Adopted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{practicesCount}/{totalPractices}</div>
            <Progress value={completionPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">FSSAI Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="mb-2">Certified</Badge>
            <p className="text-sm text-muted-foreground">License: {fssaiNumber}</p>
          </CardContent>
        </Card>
      </div>

      {/* Hygiene Practices Declaration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hygiene Practices Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button className="mt-4">Update Practices</Button>
        </CardContent>
      </Card>

      {/* FSSAI Certification */}
      <Card>
        <CardHeader>
          <CardTitle>FSSAI Certification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fssai">FSSAI License Number</Label>
            <Input
              id="fssai"
              value={fssaiNumber}
              onChange={(e) => setFssaiNumber(e.target.value)}
              placeholder="Enter your 14-digit FSSAI license number"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Upload FSSAI Certificate</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop your FSSAI certificate
              </p>
              <Button variant="outline" size="sm">Choose File</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hygiene Photos */}
      <Card>
        <CardHeader>
          <CardTitle>Hygiene Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Upload photos of your clean workstation</p>
              <Button variant="outline" size="sm">Add Photos</Button>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Upload photos of hygiene practices</p>
              <Button variant="outline" size="sm">Add Photos</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hygiene Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Hygiene Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}