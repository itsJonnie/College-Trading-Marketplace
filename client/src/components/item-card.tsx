import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { type Item } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-[4/3] relative">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">{item.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Badge variant="secondary">{item.condition}</Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
