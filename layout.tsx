"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount();

  return (
    <div className="flex h-screen bg-[#141414] max-h-screen overflow-y-hidden text-[#F1E9E9]">
      <Sidebar />
      
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
                          "aria-hidden": true,
                          style: {
                            opacity: 0,
                            pointerEvents: "none",
                            userSelect: "none",
                          },
                        })}
                      >
                        {(() => {
                          if (!mounted || !account || !chain) {
                            return (
                              <button
                                onClick={openConnectModal}
                                className="group relative px-6 py-2  rounded-lg overflow-hidden transition-all duration-300 ease-out hover:scale-105"
                              >
                                <span className="relative z-10 text-white font-medium">
                                  Connect Wallet
                                </span>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </button>
                            );
                          }
                          return (
                            <div className="relative  rounded-lg overflow-hidden group transition-all duration-300 ease-out hover:scale-105">
                              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="relative z-10 px-4 py-2">
                                <ConnectButton
                                  accountStatus="avatar"
                                  chainStatus="none"
                                  showBalance={false}
                                />
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
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
      </div>
    </div>
  );
}
