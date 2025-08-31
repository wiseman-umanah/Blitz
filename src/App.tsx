import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Dashboard from "./pages/Dashboard"
import CreateBill from "./pages/CreateBill"
import JoinBill from "./pages/JoinBill"
import BillDetails from "./pages/BillDetails"
import BillCompleted from "./pages/BillCompleted"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import config from "./lib/walletConfig"


const queryClient = new QueryClient()


function App() {
  return (
	<WagmiProvider config={config}>
		<QueryClientProvider client={queryClient}>
			<RainbowKitProvider>
				<div className="min-h-screen bg-background">
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/create-bill" element={<CreateBill />} />
						<Route path="/join-bill" element={<JoinBill />} />
						<Route path="/bill/:id" element={<BillDetails />} />
						<Route path="/bill/:id/completed" element={<BillCompleted />} />
					</Routes>
				</div>
			</RainbowKitProvider>
		</QueryClientProvider>
	</WagmiProvider>
    
  )
}

export default App
