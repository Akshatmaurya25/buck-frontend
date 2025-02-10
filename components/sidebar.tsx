"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGrid,
  Settings,
  Users,
  SettingsIcon as Functions,
  Layers,
  X,
  Github,
} from "lucide-react";
import logo from "../logo.png";
import Image from "next/image";

export function Sidebar() {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <div
      className={cn(
        "transition-all duration-300 border-r border-[#606060] md:block hidden bg-[#212121]",
        !isHovering ? "w-16" : "w-64"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="p-4 border-b border-[#3C2322]">
        {isHovering ? (
          <div className="flex items-center gap-2">
            <div className="rounded-full h-fit overflow-hidden">
              <Image src={logo} width={40} className="" alt="" />
            </div>
            <span className="font-semibold">Buck Terminal</span>
            <span className="px-1.5 py-0.25 text-xs bg-[#ffffff] text-black rounded-full">
              BETA
            </span>
          </div>
        ) : (
          <div className="flex justify-center">
            <Image src={logo} width={30} className="" alt="" />
          </div>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="space-y-4 p-4">
          <nav className="space-y-2">
            <NavButton icon={<LayoutGrid className="h-4 w-4" />} label="Tasks" isHovering={isHovering} />
            <NavButton icon={<Functions className="h-4 w-4" />} label="Functions" isHovering={isHovering} />
            <NavButton icon={<Layers className="h-4 w-4" />} label="Integrations" isHovering={isHovering} />
            <NavButton icon={<Users className="h-4 w-4" />} label="Users" isHovering={isHovering} />
            <NavButton icon={<Settings className="h-4 w-4" />} label="Settings" isHovering={isHovering} />
          </nav>
          <div className="pt-4 border-t border-[#3C2322]">
            <NavButton 
              icon={<Github className="h-4 w-4" />} 
              label="GitHub" 
              isHovering={isHovering}
              onClick={() => window.open("https://github.com/Akshatmaurya25/buck-agent", "_blank")}
            />
            <NavButton 
              icon={<X className="h-4 w-4" />} 
              label="Tweets" 
              isHovering={isHovering}
              onClick={() => window.open("https://x.com/buck_theduck", "_blank")}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isHovering: boolean;
  onClick?: () => void;
}

function NavButton({ icon, label, isHovering, onClick }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]",
        !isHovering && "justify-center px-2"
      )}
      onClick={onClick}
    >
      <div className={cn(!isHovering ? "mr-0" : "mr-2")}>{icon}</div>
      {isHovering && label}
    </Button>
  );
}
