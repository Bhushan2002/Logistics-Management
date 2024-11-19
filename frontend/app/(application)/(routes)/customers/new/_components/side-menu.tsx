"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string
    query: string
  }[],
}

export function SideMenu({ className, items, ...props }: SidebarMenuProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.query}
          href={pathname + "?tab=" + item.query}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            tab === item.query
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}