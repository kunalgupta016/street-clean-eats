import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Eye, 
  Star, 
  MessageSquare, 
  ShoppingCart, 
  Plus, 
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Users,
  Clock,
  AlertCircle
} from 'lucide-react';

interface DashboardOverviewProps {
  vendorProfile: any;
  vendorDetails: any;
}

export function DashboardOverview({ vendorProfile, vendorDetails }: DashboardOverviewProps) {
  const profileCompletion = vendorDetails ? 85 : 45;
  
  const summaryStats = [
    {
      title: 'Profile Views',
      value: '127',
      change: '+12%',
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      title: 'Average Rating',
      value: '4.2',
      change: '+0.3',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'New Reviews',
      value: '8',
      change: '+3',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      title: 'Open Orders',
      value: '3',
      change: 'Active',
      icon: ShoppingCart,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Update Daily Menu',
      description: 'Add today\'s specials and update availability',
      icon: Plus,
      action: 'Add Items',
      urgent: true
    },
    {
      title: 'Go Online',
      description: 'Mark your stall as open and accepting orders',
      icon: ToggleRight,
      action: 'Go Online',
      urgent: false
    },
    {
      title: 'Respond to Reviews',
      description: '5 new reviews need your response',
      icon: MessageSquare,
      action: 'Respond',
      urgent: true
    }
  ];

  const recentActivity = [
    {
      type: 'review',
      message: 'New 5-star review from Priya S.',
      time: '2 hours ago',
      icon: Star
    },
    {
      type: 'order',
      message: 'Order #1234 completed successfully',
      time: '4 hours ago',
      icon: ShoppingCart
    },
    {
      type: 'profile',
      message: 'Profile viewed 15 times today',
      time: '6 hours ago',
      icon: Eye
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your stall today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Profile Completion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Complete your profile to increase visibility
            </span>
            <span className="text-sm font-bold">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          {profileCompletion < 100 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Add menu items and hygiene practices to reach 100%
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {action.title}
                        {action.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant={action.urgent ? "default" : "outline"}>
                    {action.action}
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm">{activity.message}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Platform Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">💡 Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Boost Visibility</h4>
              <p className="text-sm text-muted-foreground">
                Upload appetizing photos and update your menu daily to attract more customers.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Build Trust</h4>
              <p className="text-sm text-muted-foreground">
                Maintain high hygiene standards and respond to customer reviews promptly.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Go Green</h4>
              <p className="text-sm text-muted-foreground">
                Adopt sustainable practices to earn eco-friendly badges and attract conscious customers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}