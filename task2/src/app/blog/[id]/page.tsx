import { notFound } from "next/navigation";
import { Calendar, User, Tag } from "lucide-react";
import { CommentData, CommentSection } from "@/components/CommentSection";
import { DeleteBlogButton } from "@/components/DeleteBlogButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// This is mock data. In a real app, you'd fetch this from an API or database.
const posts = [
   {
      id: "1",
      title: "The Future of Web Development",
      content: `
      <p>Web development is constantly evolving, with new technologies and methodologies emerging all the time. In this post, we'll explore some of the most exciting trends shaping the future of web development.</p>
      
      <h2>1. JAMstack Architecture</h2>
      <p>JAMstack (JavaScript, APIs, and Markup) is gaining popularity due to its focus on performance, security, and developer experience. By pre-rendering pages and serving them directly from a CDN, JAMstack sites can achieve incredibly fast load times.</p>
      
      <h2>2. Progressive Web Apps (PWAs)</h2>
      <p>PWAs combine the best of web and mobile apps, offering offline functionality, push notifications, and app-like interfaces. As browsers continue to support more native features, we can expect PWAs to become even more powerful.</p>
      
      <h2>3. AI and Machine Learning Integration</h2>
      <p>Artificial Intelligence and Machine Learning are finding their way into web development, powering everything from chatbots to personalized user experiences. As these technologies become more accessible, we'll see more developers incorporating them into their projects.</p>
      
      <h2>4. WebAssembly</h2>
      <p>WebAssembly allows high-performance code written in languages like C++ or Rust to run in the browser. This opens up new possibilities for web applications, especially in areas like gaming and complex visualizations.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning, developers can create more powerful, efficient, and user-friendly web applications.</p>
    `,
      author: "Jane Doe",
      authorId: "1", // Assuming this is the user ID of the author
      date: "2023-05-15",
      category: "Technology",
      comments: [
         {
            id: "1",
            author: "John Smith",
            content:
               "Great article! I'm particularly excited about the potential of WebAssembly.",
            createdAt: new Date("2023-05-16T10:30:00"),
            avatarUrl: "/placeholder.svg?height=40&width=40",
            replies: [
               {
                  id: "3",
                  author: "Jane Doe",
                  content:
                     "Thanks, John! WebAssembly is indeed a game-changer. What specific use cases are you most interested in?",
                  createdAt: new Date("2023-05-16T11:15:00"),
                  avatarUrl: "/placeholder.svg?height=40&width=40",
                  replies: [],
               },
               {
                  id: "4",
                  author: "Jane Doe",
                  content:
                     "Thanks, John! WebAssembly is indeed a game-changer. What specific use cases are you most interested in?",
                  createdAt: new Date("2023-05-16T11:15:00"),
                  avatarUrl: "/placeholder.svg?height=40&width=40",
                  replies: [
                     {
                        id: "5",
                        author: "D Jane Doe",
                        content: "Thanks, John!",
                        createdAt: new Date("2023-05-16T11:15:00"),
                        avatarUrl: "/placeholder.svg?height=40&width=40",
                        replies: [],
                     },
                  ],
               },
               {
                  id: "6",
                  author: "6 Jane Doe",
                  content:
                     "Thanks, John! WebAssembly is indeed a game-changer. What specific use cases are you most interested in?",
                  createdAt: new Date("2023-05-16T11:15:00"),
                  avatarUrl: "/placeholder.svg?height=40&width=40",
                  replies: [
                     {
                        id: "7",
                        author: "D7 Jane Doe",
                        content: "Thanks, John!",
                        createdAt: new Date("2023-05-16T11:15:00"),
                        avatarUrl: "/placeholder.svg?height=40&width=40",
                        replies: [],
                     },
                  ],
               },
            ],
         },
         {
            id: 2,
            author: "Emily Johnson",
            content:
               "I've been using JAMstack for my recent projects and the performance improvements are remarkable.",
            createdAt: new Date("2023-05-17T14:45:00"),
            avatarUrl: "/placeholder.svg?height=40&width=40",
            replies: [],
         },
      ],
   },
   // Add more mock posts here...
];

export default async function BlogPost({
   params,
}: {
   params: Promise<{ id: string }>;
}) {
   const blogId = (await params).id;
   const post = posts.find((p) => p.id === blogId);
   const session = await getServerSession(authOptions);

   console.log(session);

   if (!post) {
      notFound();
   }

   // const isAuthor = session?.user?.id === post.authorId;
   const isAuthor = true;

   return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
         <article className="max-w-3xl mx-auto">
            <header className="mb-8">
               <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                  {post.title}
               </h1>
               <div className="flex flex-wrap items-center text-muted-foreground mb-2">
                  <User className="mr-2 h-4 w-4" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">{post.date}</span>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>{post.category}</span>
               </div>
               {isAuthor && (
                  <div className="mt-4">
                     <DeleteBlogButton postId={+post.id} />
                  </div>
               )}
            </header>
            <div
               className="prose dark:prose-invert max-w-none mb-12"
               dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <CommentSection
               postId={+post.id}
               initialComments={post.comments as CommentData[]}
            />
         </article>
      </div>
   );
}
