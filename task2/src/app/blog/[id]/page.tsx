import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CommentSection } from "@/components/CommentSection";
import { DeleteBlogButton } from "@/components/DeleteBlogButton";
import { supabase } from "@/lib/supabase";
import { Blog } from "@/supbase";
import { formatDistanceToNow } from "date-fns";
import { Calendar, Tag, User } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

export default async function BlogPost({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const blogId = (await params).id;
   const { data: blog } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", blogId)
      .single<Blog>();
   const session = await getServerSession(authOptions);

   if (!blog) {
      notFound();
   }

   const isAuthor = session?.user?.id === blog.author;

   return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
         <article className="max-w-3xl mx-auto">
            <header className="mb-8">
               <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  {blog.title}
               </h1>
               <div className="flex flex-wrap items-center text-muted-foreground mb-2">
                  <User className="mr-2 h-4 w-4" />
                  <span className="mr-4">{blog.author}</span>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">
                     {formatDistanceToNow(blog.created_at)} ago
                  </span>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>{blog.category}</span>
               </div>
               {isAuthor && (
                  <div className="mt-4">
                     <DeleteBlogButton blogId={blog.id} />
                  </div>
               )}
            </header>
            <div className="prose dark:prose-invert max-w-none mb-12">
               <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
            <CommentSection
               blogId={blog.id}
               // initialComments={blog.comments as CommentData[]}
               initialComments={[]}
            />
         </article>
      </div>
   );
}
