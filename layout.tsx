"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGrid,
  Settings,
  Users,
  SettingsIcon as Functions,
  Layers,
  Eye,
  BarChart2,
  X,
  Github,
  Twitter,
} from "lucide-react";
import logo from "./logo.png";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Children } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount();

  return (
    <div className="flex h-screen bg-[#141414] max-h-screen overflow-y-hidden text-[#F1E9E9]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#606060] md:block hidden bg-[#212121]  bg">
        <div className="p-4 border-b border-[#3C2322]">
          <div className="flex items-center gap-2">
            <div className="rounded-full h-fit overflow-hidden">
              <Image src={logo} width={40} className="" alt="" />
            </div>
            <span className="font-semibold">Buck Terminal</span>
            <span className="px-1.5 py-0.25 text-xs bg-[#ffffff] text-black rounded-full">BETA</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="space-y-4 p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Tasks
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
              >
                <Functions className="mr-2 h-4 w-4" />
                Functions
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
              >
                <Layers className="mr-2 h-4 w-4" />
                Integrations
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
            <div className="pt-4 border-t border-[#3C2322]">
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
                onClick={() =>
                  window.open(
                    "https://github.com/Akshatmaurya25/buck-agent",
                    "_blank"
                  )
                }
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#F1E9E9] hover:bg-[#3C2322] hover:text-[#dfcaca]"
                onClick={() =>
                  window.open("https://x.com/buck_theduck", "_blank")
                }
              >
                <X className="mr-2 h-4 w-4" />
                Tweets
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-[#3C2322] px-4 flex items-center justify-between">
            <h1 className="text-sm font-medium">Start Your Conversation</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <ConnectButton.Custom>
                  {({ account, chain, openConnectModal, mounted }) => {
                    return (
                      <div
                        {...(!mounted && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return (
                              <button
                                onClick={openConnectModal}
                                className="group relative px-6 py-2 bg-[#9E1F19] rounded-lg overflow-hidden transition-all duration-300 ease-out hover:scale-105"
                              >
                                <span className="relative z-10 text-white font-medium">Connect Wallet</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#9E1F19] to-[#FF3B30] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </button>
                            )
                          }
                          return (
                            <div className="relative bg-[#9E1F19] rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:scale-105">
                              <div className="absolute inset-0 bg-gradient-to-r from-[#9E1F19] to-[#FF3B30] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative z-10 px-4 py-2">
                                <ConnectButton 
                                  accountStatus="avatar"
                                  chainStatus="none"
                                  showBalance={false}
                                />
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </header>
          {account.isConnected ? (
            children
          ) : (
            <div className=" h-full  justify-center items-center flex  text-red-600">
              Please connect your wallet to continue
            </div>
          )}
        </div>
        {/* Right Panel */}
        {/* <div className="w-80 border-l border-[#3C2322]">
          <div className="h-14 border-b border-[#3C2322] px-4 flex items-center">
            <h2 className="font-medium">Conversation details</h2>
          </div>
          <div className="p-4">
            <div className="flex gap-4 border-b border-[#3C2322] pb-4">
              <Button variant="secondary" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Actions
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Customer
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full text-[#F1E9E9] hover:bg-[#3C2322]">
                Settings
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
