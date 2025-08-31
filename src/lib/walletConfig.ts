import '@rainbow-me/rainbowkit/styles.css'
import { shardeum } from 'viem/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { defineChain, http } from 'viem'


export const shardeumTestnet = defineChain({
  id: 8080,
  name: "Shardeum Unstablenet",
  nativeCurrency: {
    decimals: 18,
    name: "Shardeum",
    symbol: "SHM",
  },
  rpcUrls: {
    default: {
      http: ["https://api-unstable.shardeum.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Shardeum Explorer",
      url: "https://explorer-unstable.shardeum.org",
    },
  },
  testnet: true,
})


const config = getDefaultConfig({
	appName: 'Blitz',
	projectId: import.meta.env.VITE_WALLETCONNECT_ID,
	chains: [shardeum, shardeumTestnet],
	transports: {
		[shardeum.id]: http(),
		[shardeumTestnet.id]: http()
	},

});

export default config;
