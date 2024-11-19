import { LocationSwitcher } from "./location-switcher";
import { UserNav } from "./user-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

export function Header(){
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="-m-2.5 p-2.5 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SidebarNav />
        </SheetContent>
      </Sheet>
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 items-center lg:gap-x-6">
        <LocationSwitcher />

        <div className="ml-auto pl-6 flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
