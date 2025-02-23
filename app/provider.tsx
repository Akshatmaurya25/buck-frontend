"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { base, seiTestnet, sei, polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Address, createWalletClient, custom } from "viem";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "cc7548b1e3c2739cec64c6295b58cd50",
  chains: [sei, base, seiTestnet, polygon],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export const getAccount = async (): Promise<Address> => {
  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return account as Address; // Type assertion to Address
};



const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
