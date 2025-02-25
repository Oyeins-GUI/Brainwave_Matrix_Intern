"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface DeleteBlogButtonProps {
   blogId: string;
}

export function DeleteBlogButton({ blogId }: DeleteBlogButtonProps) {
   const [isDeleting, setIsDeleting] = useState(false);
   const router = useRouter();
   const { toast } = useToast();

   console.log("delete blog", blogId);

   const handleDelete = async () => {
      setIsDeleting(true);
      try {
         // In a real application, you would make an API call here
         // For example: await fetch(`/api/posts/${blogId}`, { method: 'DELETE' })

         // Simulating API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         toast({
            title: "Blog post deleted",
            description: "Your blog post has been successfully deleted.",
         });
         router.push("/blog");
      } catch (error) {
         console.error(error);
         toast({
            title: "Error",
            description: "Failed to delete the blog post. Please try again.",
            variant: "destructive",
         });
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant="destructive" className="flex items-center">
               <Trash2 className="mr-2 h-4 w-4" />
               Delete Blog
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  Are you sure you want to delete this blog post?
               </AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your blog post and remove the data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
