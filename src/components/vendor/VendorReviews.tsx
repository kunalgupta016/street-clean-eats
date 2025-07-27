import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare, TrendingUp } from 'lucide-react';

interface VendorReviewsProps {
  vendorDetails: any;
}

export function VendorReviews({ vendorDetails }: VendorReviewsProps) {
  const reviews = [
    {
      id: 1,
      customer: 'Priya S.',
      avatar: null,
      rating: 5,
      hygieneRating: 5,
      comment: 'Amazing food quality and very clean preparation! The aloo paratha was perfect.',
      date: '2 hours ago',
      responded: false
    },
    {
      id: 2,
      customer: 'Rajesh M.',
      avatar: null,
      rating: 4,
      hygieneRating: 4,
      comment: 'Good taste but could improve on serving speed during peak hours.',
      date: '1 day ago',
      responded: true,
      response: 'Thank you for your feedback! We\'re working on improving our service speed.'
    },
    {
      id: 3,
      customer: 'Anita K.',
      avatar: null,
      rating: 5,
      hygieneRating: 5,
      comment: 'Excellent hygiene standards and delicious food. Highly recommended!',
      date: '2 days ago',
      responded: false
    }
  ];

  const averageRating = 4.7;
  const totalReviews = 156;
  const averageHygiene = 4.8;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-muted-foreground">
          See what customers are saying about your stall.
        </p>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{averageRating}</span>
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Based on {totalReviews} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hygiene Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{averageHygiene}</span>
              <div className="flex">{renderStars(Math.round(averageHygiene))}</div>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +0.2 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">67%</div>
            <p className="text-sm text-muted-foreground mt-1">
              3 pending responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Reviews</h2>
          <Badge variant="secondary">{reviews.filter(r => !r.responded).length} Need Response</Badge>
        </div>

        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.customer}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Overall:</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Hygiene:</span>
                    <div className="flex">{renderStars(review.hygieneRating)}</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{review.comment}</p>
              
              {review.responded ? (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Your Response:</span>
                  </div>
                  <p className="text-sm">{review.response}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-sm font-medium">Respond to this review:</span>
                  </div>
                  <Textarea
                    placeholder="Thank your customer or address their concerns..."
                    className="min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm">Post Response</Button>
                    <Button size="sm" variant="outline">Save Draft</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}