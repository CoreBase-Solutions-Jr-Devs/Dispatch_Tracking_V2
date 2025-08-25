import React from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function UserNav({ userName, profilePicture, onLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative !bg-transparent h-8 w-8 rounded-full !gap-0"
        >
          <Avatar className="h-10 w-10 !cursor-pointer">
            <AvatarImage src={profilePicture || ""} className="!cursor-pointer" />
            <AvatarFallback>
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="!w-3 !h-3 ml-1 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-md shadow-lg"
        align="end"
        forceMount
        style={{
          backgroundColor: "oklch(var(--dropdown-background))",
          color: "oklch(var(--dropdown-foreground))",
        }}
      >
        <DropdownMenuLabel className="flex flex-col items-start gap-1">
          <span className="font-semibold">{userName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onLogout}
            style={{
              color: "oklch(var(--muted-foreground))",
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
