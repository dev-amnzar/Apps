"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TOKEN_KEY, verifyToken } from "@/lib/auth";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token || !verifyToken(token)) {
      router.replace("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="skeleton h-8 w-32 rounded-lg" />
      </div>
    );
  }

  return <>{children}</>;
}
