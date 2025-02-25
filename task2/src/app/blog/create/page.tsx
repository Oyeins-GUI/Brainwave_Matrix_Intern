"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
   ssr: false,
});

export default function BlogEditor() {
   const [content, setContent] = useState("");
   const [title, setTitle] = useState("");
   const [excerpt, setExcerpt] = useState("");
   const [category, setCategory] = useState("");
   const [publishing, setPublishing] = useState(false);
   const { data: session } = useSession();
   const router = useRouter();

   if (!session) return;

   const author = session.user?.id;

   const handlePublish = async () => {
      console.log({ title, excerpt, category, content, author });
      setPublishing(true);
      const { data: blog, error } = await supabase
         .from("blogs")
         .insert([{ title, excerpt, category, content, author }])
         .select("*");

      if (error || !blog) {
         toast({
            title: "Publish failed",
            description: error.message,
            variant: "destructive",
         });
         setPublishing(false);

         return;
      }

      toast({
         title: "Blog published",
         description: "Your blog has been published successfully",
         variant: "default",
      });

      setPublishing(false);
      router.push(`/blog/${blog[0].id}`);
   };

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-2xl font-bold mb-4">Write Your Blog</h1>
         <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
         />
         <input
            type="text"
            placeholder="Enter blog excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
         />
         <input
            type="text"
            placeholder="Enter blog category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
         />
         <MdEditor
            value={content}
            style={{ height: "400px" }}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setContent(text)}
         />
         <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">Preview</h2>
            <div className="prose max-w-none">
               <ReactMarkdown>{content}</ReactMarkdown>
            </div>
         </div>

         <Button
            onClick={() => handlePublish()}
            disabled={!content.trim()}
            className={`mt-4 px-4 py-2 rounded ${
               !content.trim() ||
               !title.trim() ||
               !excerpt.trim() ||
               !category.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white"
            }`}
         >
            {publishing ? "Publshing blog..." : "Publish Blog"}
         </Button>
      </div>
   );
}
