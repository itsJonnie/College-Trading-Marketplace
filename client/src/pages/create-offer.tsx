import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { conditionOptions } from "@shared/schema";
import { z } from "zod";
import { useParams, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

const tradeOfferSchema = z.object({
  title: z.string().min(1, "Please enter what you're offering"),
  condition: z.enum(conditionOptions),
  notes: z.string().optional(),
  images: z.array(z.string()).min(1, "Please upload at least one photo"),
});

type TradeOfferForm = z.infer<typeof tradeOfferSchema>;

export default function CreateOffer() {
  const { toast } = useToast();
  const { id } = useParams();
  const [, navigate] = useLocation();

  const form = useForm<TradeOfferForm>({
    resolver: zodResolver(tradeOfferSchema),
    defaultValues: {
      title: "",
      condition: "New",
      notes: "",
      images: [],
    },
  });

  const [images, setImages] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: async (values: TradeOfferForm) => {
      const res = await apiRequest("POST", `/api/items/${id}/offers`, {
        ...values,
        offeringUserId: 1, // Using mock user ID for now
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your trade offer has been sent",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/items/${id}/offers`] });
      navigate(`/items/${id}`);
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const newImages = [...images, reader.result];
          setImages(newImages);
          form.setValue('images', newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: string, i: number) => i !== index);
    setImages(newImages);
    form.setValue('images', newImages);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Make a Trade Offer</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you offering?</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {conditionOptions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Upload Photos</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img 
                      src={image} 
                      alt={`Upload ${index + 1}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {images.length < 4 && (
                  <div className="border-2 border-dashed rounded-md flex items-center justify-center aspect-square">
                    <div className="text-center p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                      >
                        Click to upload or drag and drop
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any details about your offer..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit Offer"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}