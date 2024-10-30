"use client";
import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Nav({
  className,
  children,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <nav
      className={`flex justify-center px-4 text-primary-foreground my-1 ${className}`}
    >
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-2 text-slate-500 font-bold hover:text-primary focus-visible:text-secondary",
        props.href === pathname && "text-secondary-foreground"
      )}
    />
  );
}
