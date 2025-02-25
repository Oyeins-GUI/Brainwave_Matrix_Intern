"use client";

import type React from "react";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Comment } from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export interface CommentData {
   id: string;
   author: string;
   content: string;
   createdAt: Date;
   avatarUrl?: string | undefined;
   replies: CommentData[];
}

interface CommentSectionProps {
   blogId: string;
   initialComments: CommentData[];
}

export function CommentSection({
   blogId,
   initialComments,
}: CommentSectionProps) {
   const { data: session } = useSession();
   const [comments, setComments] = useState<CommentData[]>(initialComments);
   const [newComment, setNewComment] = useState("");
   const { toast } = useToast();

   const handleSubmitComment = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!session) {
         toast({
            title: "Authentication required",
            description: "Please sign in to post a comment.",
            variant: "destructive",
         });
         return;
      }
      if (!newComment.trim()) return;

      const comment: CommentData = {
         id: `${Date.now()}`,
         author: session.user?.name || "Anonymous",
         content: newComment,
         createdAt: new Date(),
         avatarUrl: session.user?.image as string | undefined,
         replies: [],
      };

      setComments([comment, ...comments]);
      setNewComment("");
      toast({
         title: "Comment posted",
         description: "Your comment has been successfully posted.",
      });
   };

   const handleReply = (parentId: string, content: string) => {
      if (!session) {
         toast({
            title: "Authentication required",
            description: "Please sign in to reply to a comment.",
            variant: "destructive",
         });
         return;
      }

      const reply: CommentData = {
         id: `${Date.now()}`,
         author: session.user?.name || "Anonymous",
         content,
         createdAt: new Date(),
         avatarUrl: session.user?.image as string | undefined,
         replies: [],
      };

      const addReply = (comments: CommentData[]): CommentData[] => {
         return comments.map((comment) => {
            if (comment.id === parentId) {
               return { ...comment, replies: [reply, ...comment.replies] };
            }
            if (comment.replies.length > 0) {
               return { ...comment, replies: addReply(comment.replies) };
            }
            return comment;
         });
      };

      setComments(addReply(comments));
      toast({
         title: "Reply posted",
         description: "Your reply has been successfully posted.",
      });
   };

   return (
      <div className="mt-8">
         <h2 className="text-2xl font-bold mb-4">Comments</h2>
         {session ? (
            <form onSubmit={handleSubmitComment} className="mb-6">
               <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment..."
                  className="mb-2"
               />
               <Button type="submit">Post Comment</Button>
            </form>
         ) : (
            <p className="mb-4 text-muted-foreground">
               Please sign in to leave a comment.
            </p>
         )}
         <div className="space-y-6">
            {comments.map((comment) => (
               <Comment
                  key={comment.id}
                  {...comment}
                  onReply={handleReply}
                  currentUser={
                     session?.user
                        ? {
                             name: session.user.name || "",
                             image: session.user.image || undefined,
                          }
                        : undefined
                  }
               />
            ))}
         </div>
      </div>
   );
}
