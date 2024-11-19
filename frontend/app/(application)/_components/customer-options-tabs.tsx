"use client"

import { customerOptionsTabs } from "../_data/customer-options-tabs";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CustomerOptionsTabsProps = {
  customerId: string;
}

export function CustomerOptionsTabs(props: CustomerOptionsTabsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.split("/")[2];

  function onClick(href: string){
    router.push(href + "/" + props.customerId)
  }

  return (
    <Tabs defaultValue={"/customers/" + activeTab}>
      <TabsList>
        {customerOptionsTabs.map((tab) => (
          <TabsTrigger onClick={() => onClick(tab.href)} key={tab.href} value={tab.href}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}