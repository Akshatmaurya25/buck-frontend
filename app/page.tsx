"use client";

// import Sofa from "@/sofa";
// import Page from "../page"
import Component from "@/app/landing-page";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, base, sei, seiTestnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Address, createWalletClient, custom } from "viem";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cc7548b1e3c2739cec64c6295b58cd50",
  chains: [mainnet, base, sei],
  ssr: true,
});

const queryClient = new QueryClient();

export default function BuckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* Your App */}
          <div>
            {/* <Page /> */}
            <Component />
            {/* <Sofa /> */}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
