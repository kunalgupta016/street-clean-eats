import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Phone, MapPin } from 'lucide-react';

interface VendorOrdersProps {
  vendorDetails: any;
}

export function VendorOrders({ vendorDetails }: VendorOrdersProps) {
  const orders = [
    {
      id: 'ORD-001',
      customer: 'Priya S.',
      items: [
        { name: 'Aloo Paratha', quantity: 2, price: 60 },
        { name: 'Masala Chai', quantity: 1, price: 15 }
      ],
      total: 135,
      status: 'pending',
      orderTime: '10:30 AM',
      pickupTime: '11:00 AM',
      phone: '+91 98765 43210'
    },
    {
      id: 'ORD-002',
      customer: 'Rahul K.',
      items: [
        { name: 'Chole Bhature', quantity: 1, price: 80 }
      ],
      total: 80,
      status: 'preparing',
      orderTime: '10:45 AM',
      pickupTime: '11:15 AM',
      phone: '+91 87654 32109'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'destructive';
      case 'preparing': return 'secondary';
      case 'ready': return 'default';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground">
          Track and manage your customer orders efficiently.
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Orders (2)</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {orders.filter(order => order.status !== 'completed').map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg">{order.id}</CardTitle>
                    <Badge variant={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.total}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {order.orderTime}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {order.phone}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Pickup Time</div>
                    <div className="text-sm text-muted-foreground">{order.pickupTime}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Order Items:</div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  {order.status === 'pending' && (
                    <>
                      <Button size="sm" variant="destructive">Reject</Button>
                      <Button size="sm">Accept & Start Preparing</Button>
                    </>
                  )}
                  {order.status === 'preparing' && (
                    <Button size="sm">Mark as Ready</Button>
                  )}
                  {order.status === 'ready' && (
                    <Button size="sm">Mark as Completed</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No completed orders yet today.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">All orders will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}