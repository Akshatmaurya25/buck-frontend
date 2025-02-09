import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sei,
  sepolia,
} from 'wagmi/chains';


export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId:'cc7548b1e3c2739cec64c6295b58cd50',
  chains: [mainnet, base,sei],
//   ssr: true, // If your dApp uses server side rendering (SSR)
});
// export const config = getDefaultConfig({
//   appName: 'Your App Name',
//   projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
//   ],
//   ssr: true,
// });
