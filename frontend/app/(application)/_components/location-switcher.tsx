"use client"

import * as React from "react"
import {
  ArrowDownUp,
  Check,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const groups = [
  {
    label: "Locations",
    locations: [
      {
        label: "Pune",
        value: "pune",
      },
    ],
  },
]

type Location = (typeof groups)[number]["locations"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface LocationSwitcherProps extends PopoverTriggerProps {
    className?: string
}

export function LocationSwitcher({ className }: LocationSwitcherProps) {
    
    const [open, setOpen] = React.useState(false)
    const [selectedLocation, setSelectedLocation] = React.useState<Location>(
        groups[0].locations[0]
    )



  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a location"
                className={cn("w-[240px] justify-between", className)}
            >
                <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                    src={`https://avatar.vercel.sh/avatar.png`}
                    alt={selectedLocation.label}
                />
                <AvatarFallback>BW</AvatarFallback>
                </Avatar>
                {selectedLocation.label}
                <ArrowDownUp  className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
            <Command>
                <CommandList>
                <CommandInput placeholder="Search location..." />
                <CommandEmpty>No location found.</CommandEmpty>
                    {groups.map((group) => (
                        <CommandGroup key={group.label} heading={group.label}>
                        {group.locations.map((location) => (
                            <CommandItem
                            key={location.value}
                            onSelect={() => {
                                setSelectedLocation(location)
                                setOpen(false)
                            }}
                            className="text-sm"
                            >
                            <Avatar className="mr-2 h-5 w-5">
                                <AvatarImage
                                    src="https://avatar.vercel.sh/avatar.png"
                                    alt={location.label}
                                />
                                <AvatarFallback>NB</AvatarFallback>
                            </Avatar>
                            {location.label}
                            <Check
                                className={cn(
                                "ml-auto h-4 w-4",
                                selectedLocation.value === location.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                            />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    ))}

                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}