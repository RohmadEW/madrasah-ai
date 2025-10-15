"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "@/store/auth";

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard"];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ["/login", "/register"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  useEffect(() => {
    // Check if current route requires authentication
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    // Check if current route is an auth route (login/register)
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !isAuthenticated) {
      // Redirect to login if trying to access protected route without auth
      router.push("/login");
    } else if (isAuthRoute && isAuthenticated) {
      // Redirect to dashboard if already authenticated and trying to access login/register
      router.push("/dashboard");
    }
  }, [pathname, isAuthenticated, router]);

  return <>{children}</>;
}
