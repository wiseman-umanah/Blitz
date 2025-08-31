import { Card } from "../components/ui/card"
import { Users, Shield, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { ConnectButton } from "@rainbow-me/rainbowkit"


export default function LandingPage() {
  return (
    <div className="min-h-screen super bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Blitz</span>
          </div>
          <button>
            Learn More
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Split bills transparently on <span className="text-primary">Shardeum</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              The easiest way to split expenses with friends using blockchain technology. Transparent, secure, and
              hassle-free group payments.
            </p>
          </div>

          {/* Connect Wallet Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ConnectButton />
            <button className="text-lg px-8 py-6 bg-transparent">
              <Link to="/dashboard">View Dashboard</Link>
            </button>
          </div>

          {/* Illustration/Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 text-center space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Easy Group Management</h3>
              <p className="text-sm text-muted-foreground">
                Add friends, split bills, and track payments all in one place
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Blockchain Security</h3>
              <p className="text-sm text-muted-foreground">
                All transactions are secured and verified on the Shardeum network
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Instant Settlements</h3>
              <p className="text-sm text-muted-foreground">
                Fast and low-cost transactions powered by Shardeum's efficiency
              </p>
            </Card>
          </div>

          {/* Visual Illustration */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
              <div className="flex items-center justify-center space-x-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">A</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Alice</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="border-t-2 border-dashed border-primary/50 w-full relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-2">
                      <span className="text-sm font-medium text-primary">$120 dinner</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-accent-foreground font-semibold">B</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Bob</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="border-t-2 border-dashed border-accent/50 w-full"></div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">C</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Carol</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Split equally: <span className="font-semibold text-foreground">$40 each</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-sm text-muted-foreground">
          <p>Built on Shardeum • Secure • Transparent • Decentralized</p>
        </div>
      </footer>
    </div>
  )
}
