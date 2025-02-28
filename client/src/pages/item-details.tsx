import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Item, User } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Phone, HandshakeIcon } from "lucide-react";

export default function ItemDetails() {
  const { id } = useParams();

  const { data: item, isLoading } = useQuery<Item>({
    queryKey: [`/api/items/${id}`],
  });

  const { data: user } = useQuery<User>({
    queryKey: [`/api/users/${item?.userId}`],
    enabled: !!item?.userId,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <Skeleton className="h-[400px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-[300px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{item.title}</h1>
          <div className="flex gap-2">
            <Badge>{item.category}</Badge>
            <Badge variant="secondary">{item.condition}</Badge>
          </div>
        </div>

        <p className="text-lg text-muted-foreground">{item.description}</p>

        <div className="space-y-4">
          <Link href={`/items/${id}/offer`}>
            <Button className="w-full" size="lg">
              <HandshakeIcon className="mr-2 h-5 w-5" />
              Make a Trade Offer
            </Button>
          </Link>

          {user && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {user.email}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    {user.phone}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}