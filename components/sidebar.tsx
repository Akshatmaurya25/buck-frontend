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
        "transition-all duration-500 ease-in-out border-r border-[#606060] md:block hidden bg-[#212121] overflow-hidden relative",
        !isHovering ? "w-16" : "w-64"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fixed Logo Section */}
      <div className="absolute top-0 left-0 right-0 bg-[#212121] z-10 border-b border-[#3C2322]">
        <div className="p-3 whitespace-nowrap">
          <div className={cn(
            "transition-all duration-500 ease-in-out flex items-center",
            !isHovering ? "justify-center" : "justify-start gap-3"
          )}>
            <div className={cn(
              "rounded-full overflow-hidden flex-shrink-0 bg-[#3C2322]",
              !isHovering ? "w-9 h-9" : "w-10 h-10",
              "flex items-center justify-center"
            )}>
              <Image 
                src={logo} 
                width={!isHovering ? 24 : 28}
                height={!isHovering ? 24 : 28}
                className="transition-all duration-500 object-contain" 
                alt="Buck Terminal"
              />
            </div>
            <div className={cn(
              "transition-all duration-500 flex items-center gap-2 overflow-hidden",
              !isHovering ? "w-0" : "w-auto"
            )}>
              <span className="font-semibold whitespace-nowrap">Buck Terminal</span>
              <span className="px-1.5 py-0.25 text-xs bg-[#ffffff] text-black rounded-full whitespace-nowrap">
                BETA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-[60px]"> {/* Adjust this value based on your logo section height */}
        <ScrollArea className="h-[calc(100vh-60px)]">
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
        "w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca] transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap",
        !isHovering && "justify-center px-2"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "transition-all duration-500 ease-in-out flex items-center",
        !isHovering ? "mr-0" : "mr-2"
      )}>
        {icon}
      </div>
      <span className={cn(
        "transition-opacity duration-500",
        !isHovering ? "opacity-0 w-0" : "opacity-100 w-auto"
      )}>
        {label}
      </span>
    </Button>
  );
}
