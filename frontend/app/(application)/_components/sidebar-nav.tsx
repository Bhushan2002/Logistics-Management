"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { sidemenu } from "../_data/sidebar-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";

import * as React from "react"
import Image from "next/image";

export function SidebarNav() {

  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto lg:border-r lg:border-gray-200 lg:bg-white px-6 pb-4">
      <div className="relative pt-4 w-full flex shrink-0">
        <Image
          width={36}
          height={36}
          src="/logo.png"
          alt="Logo"
        />
      </div>
      <div className={cn("pb-12")}>
        <div className="space-y-4 py-4">
          {sidemenu?.map((group, index) => {
            return (
              <div className="py-2" key={index}>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">
                  {group.submenu}
                </h2>
                <div className="flex flex-col gap-1">
                  {group.list.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <Button
                        variant={pathname.includes(item.href) ? "secondary" : "ghost"}
                        className="w-full justify-start -mx-4"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}