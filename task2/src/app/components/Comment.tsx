"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { CommentData } from "./CommentSection";

export interface CommentProps {
   id: string;
   author: string;
   content: string;
   createdAt: Date;
   avatarUrl?: string;
   replies: CommentData[];
   onReply: (parentId: string, content: string) => void;
   currentUser?: {
      name: string;
      image?: string;
   };
}

export function Comment({
   id,
   author,
   content,
   createdAt,
   avatarUrl,
   replies,
   onReply,
   currentUser,
}: CommentProps) {
   const [isReplying, setIsReplying] = useState(false);
   const [replyContent, setReplyContent] = useState("");

   const handleReply = () => {
      if (replyContent.trim()) {
         onReply(id, replyContent);
         setReplyContent("");
         setIsReplying(false);
      }
   };

   return (
      <div className="space-y-4">
         <div className="flex space-x-4">
            <Avatar>
               <AvatarImage src={avatarUrl} alt={author} />
               <AvatarFallback>
                  {author.slice(0, 2).toUpperCase()}
               </AvatarFallback>
            </Avatar>
            <div className="flex-1">
               <div className="flex items-center mb-1">
                  <h4 className="font-semibold mr-2">{author}</h4>
                  <span className="text-sm text-muted-foreground">
                     {formatDistanceToNow(createdAt, { addSuffix: true })}
                  </span>
               </div>
               <p className="text-sm mb-2">{content}</p>
               {currentUser && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => setIsReplying(!isReplying)}
                  >
                     Reply
                  </Button>
               )}
            </div>
         </div>
         {isReplying && (
            <div className="ml-12 mt-2">
               <Textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="mb-2"
               />
               <Button size="sm" onClick={handleReply}>
                  Post Reply
               </Button>
            </div>
         )}
         {replies.length > 0 && (
            <div className="ml-12 space-y-4">
               {replies.map((reply) => (
                  <Comment
                     key={reply.id}
                     {...reply}
                     onReply={onReply}
                     currentUser={currentUser}
                  />
               ))}
            </div>
         )}
      </div>
   );
}
