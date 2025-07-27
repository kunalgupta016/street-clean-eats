import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Image } from 'lucide-react';

interface VendorMenuProps {
  vendorDetails: any;
}

export function VendorMenu({ vendorDetails }: VendorMenuProps) {
  const menuItems = [
    {
      id: 1,
      name: 'Aloo Paratha',
      description: 'Fresh stuffed potato paratha with butter and curd',
      price: 60,
      category: 'Main Course',
      available: true,
      image: null
    },
    {
      id: 2,
      name: 'Masala Chai',
      description: 'Hot spiced tea with milk',
      price: 15,
      category: 'Beverages',
      available: true,
      image: null
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My Menu</h1>
          <p className="text-muted-foreground">
            Manage your food items and daily availability.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Item
        </Button>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <Image className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Available" : "Sold Out"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">₹{item.price}</div>
                  <div className="text-xs text-muted-foreground">{item.category}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Item Card */}
        <Card className="border-dashed border-2 flex items-center justify-center min-h-[300px] cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="text-center space-y-2">
            <Plus className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="font-semibold">Add New Item</h3>
            <p className="text-sm text-muted-foreground">Create a new menu item</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button variant="outline">Mark All Available</Button>
          <Button variant="outline">Mark All Sold Out</Button>
          <Button variant="outline">Export Menu</Button>
        </CardContent>
      </Card>
    </div>
  );
}