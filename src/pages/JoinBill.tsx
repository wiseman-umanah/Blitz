import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { QrCode, Search, Users, Calendar, DollarSign, Check, Loader2, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"

interface BillInfo {
  id: string
  title: string
  totalAmount: number
  yourShare: number
  organizer: string
  deadline: string
  participants: Array<{
    name: string
    address: string
    amount: number
    paid: boolean
  }>
  description?: string
}

export default function JoinBill() {
  const [currentStep, setCurrentStep] = useState(1) // 1: Enter ID, 2: Bill Summary, 3: Payment, 4: Success
  const [billId, setBillId] = useState("")
  const [billInfo, setBillInfo] = useState<BillInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentLoading, setPaymentLoading] = useState(false)

  // Mock bill data for demonstration
  const mockBillData: BillInfo = {
    id: "BILL-ABC123XYZ",
    title: "Team Dinner at Olive Garden",
    totalAmount: 240,
    yourShare: 40,
    organizer: "Alice Johnson",
    deadline: "2024-01-15",
    description: "Annual team dinner celebration",
    participants: [
      { name: "Alice Johnson", address: "0x1234...5678", amount: 40, paid: true },
      { name: "Bob Smith", address: "0x2345...6789", amount: 40, paid: true },
      { name: "Carol Davis", address: "0x3456...7890", amount: 40, paid: false },
      { name: "David Wilson", address: "0x4567...8901", amount: 40, paid: false },
      { name: "Eve Brown", address: "0x5678...9012", amount: 40, paid: false },
      { name: "You", address: "0x6789...0123", amount: 40, paid: false },
    ],
  }

  const handleSearchBill = async () => {
    if (!billId.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setBillInfo(mockBillData)
      setCurrentStep(2)
      setIsLoading(false)
    }, 1500)
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    // Simulate blockchain transaction
    setTimeout(() => {
      setPaymentLoading(false)
      setCurrentStep(4)
    }, 3000)
  }

  const paidAmount = billInfo?.participants.reduce((sum, p) => (p.paid ? sum + p.amount : sum), 0) || 0
  const progressPercentage = billInfo ? (paidAmount / billInfo.totalAmount) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <Header title="Join Blitz" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Enter Bill ID */}
          {currentStep === 1 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Enter Bill ID</CardTitle>
                <p className="text-muted-foreground">Enter the bill ID or scan a QR code to join</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bill ID</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., BILL-ABC123XYZ"
                        value={billId}
                        onChange={(e) => setBillId(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearchBill()}
                      />
                      <button onClick={handleSearchBill} disabled={!billId.trim() || isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-4">Or</div>
                    <button className="w-full bg-transparent">
                      <QrCode className="w-4 h-4 mr-2" />
                      Scan QR Code
                    </button>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">How to find your Bill ID:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Check the invitation link sent by the bill creator</li>
                    <li>• Scan the QR code shared by the organizer</li>
                    <li>• Ask the bill creator for the Bill ID directly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Bill Summary */}
          {currentStep === 2 && billInfo && (
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{billInfo.title}</CardTitle>
                      <p className="text-muted-foreground">Organized by {billInfo.organizer}</p>
                    </div>
                    <Badge variant="outline">Bill ID: {billInfo.id}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {billInfo.description && (
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{billInfo.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>Total Amount</span>
                      </div>
                      <div className="text-2xl font-bold">${billInfo.totalAmount}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline</span>
                      </div>
                      <div className="text-lg font-medium">{new Date(billInfo.deadline).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment Progress</span>
                      <span className="font-medium">
                        ${paidAmount} / ${billInfo.totalAmount}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Your Share</div>
                        <div className="text-sm text-muted-foreground">
                          Equal split among {billInfo.participants.length} people
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">${billInfo.yourShare}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Participants ({billInfo.participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {billInfo.participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground text-sm font-semibold">
                              {participant.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-xs text-muted-foreground font-mono">{participant.address}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">${participant.amount}</span>
                          <Badge variant={participant.paid ? "default" : "outline"}>
                            {participant.paid ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                Paid
                              </>
                            ) : (
                              "Pending"
                            )}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <button onClick={() => setCurrentStep(1)} className="flex-1 bg-transparent">
                  Back
                </button>
                <button onClick={() => setCurrentStep(3)} className="flex-1">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pay My Share (${billInfo.yourShare})
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Processing */}
          {currentStep === 3 && billInfo && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle>Processing Payment</CardTitle>
                <p className="text-muted-foreground">Confirm your payment on the blockchain</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    {paymentLoading ? (
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    ) : (
                      <DollarSign className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${billInfo.yourShare}</div>
                    <div className="text-muted-foreground">Payment Amount</div>
                  </div>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Bill:</span>
                      <span className="font-medium">{billInfo.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Organizer:</span>
                      <span className="font-medium">{billInfo.organizer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Your Share:</span>
                      <span className="font-bold text-primary">${billInfo.yourShare}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network:</span>
                      <span className="font-medium">Shardeum</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={paymentLoading}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </button>
                  <button onClick={handlePayment} disabled={paymentLoading} className="flex-1">
                    {paymentLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Confirm Payment
                      </>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment Success */}
          {currentStep === 4 && billInfo && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">Payment Successful!</CardTitle>
                <p className="text-muted-foreground">Your payment has been processed successfully</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Transaction Hash:</span>
                      <span className="font-mono text-xs">0xabcd...1234</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Amount Paid:</span>
                      <span className="font-bold text-green-600">${billInfo.yourShare}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network:</span>
                      <span className="font-medium">Shardeum</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge variant="default" className="bg-green-600">
                        <Check className="w-3 h-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    You have successfully paid your share for "{billInfo.title}". The organizer and other participants
                    will be notified.
                  </p>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-transparent">
                      <Link to={`/bill/${billInfo.id}`}>View Bill Details</Link>
                    </button>
                    <button className="flex-1">
                      <Link to="/dashboard">Back to Dashboard</Link>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
