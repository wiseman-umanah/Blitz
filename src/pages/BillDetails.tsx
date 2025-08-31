import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Header } from "../components/Header"
import {
  Users,
  Calendar,
  DollarSign,
  Check,
  X,
  Share,
  Copy,
  QrCode,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

interface BillDetails {
  id: string
  title: string
  description: string
  totalAmount: number
  paidAmount: number
  organizer: {
    name: string
    address: string
  }
  deadline: string
  status: "active" | "completed" | "cancelled"
  participants: Array<{
    name: string
    address: string
    amount: number
    paid: boolean
    isYou?: boolean
  }>
  createdAt: string
  isOrganizer: boolean
}

export default function BillDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Mock bill data - in real app, this would be fetched based on the ID
  const billDetails: BillDetails = {
    id: id || "BILL-ABC123XYZ",
    title: "Team Dinner at Olive Garden",
    description: "Annual team dinner celebration with the whole crew",
    totalAmount: 240,
    paidAmount: 160,
    organizer: {
      name: "Alice Johnson",
      address: "0x1234...5678",
    },
    deadline: "2024-01-15",
    status: "active",
    participants: [
      { name: "Alice Johnson", address: "0x1234...5678", amount: 40, paid: true },
      { name: "Bob Smith", address: "0x2345...6789", amount: 40, paid: true },
      { name: "Carol Davis", address: "0x3456...7890", amount: 40, paid: true },
      { name: "David Wilson", address: "0x4567...8901", amount: 40, paid: true },
      { name: "Eve Brown", address: "0x5678...9012", amount: 40, paid: false },
      { name: "You", address: "0x6789...0123", amount: 40, paid: false, isYou: true },
    ],
    createdAt: "2024-01-01",
    isOrganizer: false, // Change to true to see organizer actions
  }

  const progressPercentage = (billDetails.paidAmount / billDetails.totalAmount) * 100
  const remainingAmount = billDetails.totalAmount - billDetails.paidAmount
  const paidParticipants = billDetails.participants.filter((p) => p.paid).length
  const yourShare = billDetails.participants.find((p) => p.isYou)?.amount || 0
  const youHavePaid = billDetails.participants.find((p) => p.isYou)?.paid || false

  const handlePayShare = () => {
    // Navigate to payment flow
    navigate("/join-bill")
  }

  const handleFinalizeBill = () => {
    // TODO: Implement finalize bill logic
    console.log("Finalizing bill...")
    navigate(`/bill/${id}/completed`)
  }

  const handleCancelBill = () => {
    // TODO: Implement cancel bill logic
    console.log("Cancelling bill...")
    setShowCancelDialog(false)
    navigate("/dashboard")
  }

  const handleCopyLink = () => {
    const inviteLink = `https://splitshard.app/join/${billDetails.id}`
    navigator.clipboard.writeText(inviteLink)
    // TODO: Show toast notification
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <Header title="Blitz Details" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Bill Overview */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{billDetails.title}</CardTitle>
                  <p className="text-muted-foreground">{billDetails.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Organized by {billDetails.organizer.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due {new Date(billDetails.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="font-mono">
                  {billDetails.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Progress */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-primary">${billDetails.totalAmount}</div>
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">${billDetails.paidAmount}</div>
                    <div className="text-sm text-muted-foreground">Collected</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-orange-600">${remainingAmount}</div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Payment Progress</span>
                    <span className="font-medium">
                      {paidParticipants} / {billDetails.participants.length} paid
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="text-center text-sm text-muted-foreground">
                    {progressPercentage.toFixed(1)}% complete
                  </div>
                </div>
              </div>

              {/* Your Share (if not organizer) */}
              {!billDetails.isOrganizer && (
                <div
                  className={`p-4 rounded-lg border ${
                    youHavePaid ? "bg-green-50 border-green-200" : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Your Share</div>
                      <div className="text-sm text-muted-foreground">
                        {youHavePaid ? "Payment completed" : "Payment pending"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl font-bold ${youHavePaid ? "text-green-600" : "text-primary"}`}>
                        ${yourShare}
                      </div>
                      {youHavePaid ? (
                        <Badge variant="default" className="bg-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Paid
                        </Badge>
                      ) : (
                        <button onClick={handlePayShare}>
                          <DollarSign className="w-4 h-4 mr-2" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Participants List */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Participants ({billDetails.participants.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {billDetails.participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-accent-foreground font-semibold">
                          {participant.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {participant.name}
                          {participant.isYou && <Badge variant="outline">You</Badge>}
                          {participant.address === billDetails.organizer.address && (
                            <Badge variant="default">Organizer</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">{participant.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">${participant.amount}</div>
                        <div className="text-xs text-muted-foreground">Share</div>
                      </div>
                      <Badge variant={participant.paid ? "default" : "outline"}>
                        {participant.paid ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Paid
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Organizer Actions */}
            {billDetails.isOrganizer && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Organizer Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button
                    onClick={handleFinalizeBill}
                    className="w-full"
                    disabled={billDetails.paidAmount < billDetails.totalAmount}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalize Bill
                  </button>
                  <button onClick={() => setShowCancelDialog(true)} className="w-full">
                    <X className="w-4 h-4 mr-2" />
                    Cancel Bill
                  </button>
                  {billDetails.paidAmount < billDetails.totalAmount && (
                    <div className="text-xs text-muted-foreground text-center">
                      Bill can only be finalized when all payments are received
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Share Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Share Bill</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button onClick={handleCopyLink} className="w-full bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Invite Link
                </button>
                <button className="w-full bg-transparent">
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR Code
                </button>
                <button className="w-full bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Share via...
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Cancel Confirmation Dialog */}
          {showCancelDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Cancel Bill
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to cancel this bill? This action cannot be undone. All participants will be
                    notified and no further payments can be made.
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setShowCancelDialog(false)} className="flex-1">
                      Keep Bill
                    </button>
                    <button onClick={handleCancelBill} className="flex-1">
                      Cancel Bill
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
