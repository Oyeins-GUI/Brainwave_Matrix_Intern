import { Suspense } from "react";

export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div>
         <Suspense>{children}</Suspense>
      </div>
   );
}
