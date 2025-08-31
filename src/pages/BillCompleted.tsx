import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import ConfettiAnimation from "../components/ConfettiAnimation"
import { CheckCircle, Download, Share, Users, Calendar, DollarSign, FileText } from "lucide-react"
import { Header } from "../components/Header"



interface CompletedBillData {
  id: string
  title: string
  description: string
  totalAmount: number
  organizer: {
    name: string
    address: string
  }
  completedDate: string
  participants: Array<{
    name: string
    address: string
    amount: number
    paidDate: string
    transactionHash: string
  }>
  transactionHashes: string[]
}

export default function BillCompleted() {
  const { id } = useParams()

  // Mock completed bill data
  const billData: CompletedBillData = {
    id: id || "BILL-ABC123XYZ",
    title: "Team Dinner at Olive Garden",
    description: "Annual team dinner celebration with the whole crew",
    totalAmount: 240,
    organizer: {
      name: "Alice Johnson",
      address: "0x1234...5678",
    },
    completedDate: "2024-01-15T18:30:00Z",
    participants: [
      {
        name: "Alice Johnson",
        address: "0x1234...5678",
        amount: 40,
        paidDate: "2024-01-10T14:20:00Z",
        transactionHash: "0xabcd...1234",
      },
      {
        name: "Bob Smith",
        address: "0x2345...6789",
        amount: 40,
        paidDate: "2024-01-11T09:15:00Z",
        transactionHash: "0xbcde...2345",
      },
      {
        name: "Carol Davis",
        address: "0x3456...7890",
        amount: 40,
        paidDate: "2024-01-12T16:45:00Z",
        transactionHash: "0xcdef...3456",
      },
      {
        name: "David Wilson",
        address: "0x4567...8901",
        amount: 40,
        paidDate: "2024-01-13T11:30:00Z",
        transactionHash: "0xdefg...4567",
      },
      {
        name: "Eve Brown",
        address: "0x5678...9012",
        amount: 40,
        paidDate: "2024-01-14T20:10:00Z",
        transactionHash: "0xefgh...5678",
      },
      {
        name: "You",
        address: "0x6789...0123",
        amount: 40,
        paidDate: "2024-01-15T18:30:00Z",
        transactionHash: "0xfghi...6789",
      },
    ],
    transactionHashes: [
      "0xabcd...1234",
      "0xbcde...2345",
      "0xcdef...3456",
      "0xdefg...4567",
      "0xefgh...5678",
      "0xfghi...6789",
    ],
  }

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log("Exporting PDF receipt...")
  }

  const handleExportCSV = () => {
    // TODO: Implement CSV export
    console.log("Exporting CSV data...")
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log("Sharing completion...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <ConfettiAnimation />

      {/* Header */}
      <Header title="Completed Blitz" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Celebration Header */}
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-green-600">Congratulations!</h1>
              <p className="text-xl text-muted-foreground">All payments have been completed successfully</p>
            </div>
          </div>

          {/* Bill Summary */}
          <Card className="border-green-200 bg-green-50/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center">{billData.title}</CardTitle>
              <p className="text-center text-muted-foreground">{billData.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <DollarSign className="w-5 h-5" />
                    <span>Total Amount</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600">${billData.totalAmount}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5" />
                    <span>Participants</span>
                  </div>
                  <div className="text-3xl font-bold">{billData.participants.length}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>Completed</span>
                  </div>
                  <div className="text-lg font-medium">{new Date(billData.completedDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-sm text-green-800 mb-1">Organized by</div>
                <div className="font-medium text-green-900">{billData.organizer.name}</div>
                <div className="text-xs text-green-700 font-mono">{billData.organizer.address}</div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billData.participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Paid on {new Date(participant.paidDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">TX: {participant.transactionHash}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${participant.amount}</div>
                      <Badge variant="default" className="bg-green-600 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Collected:</span>
                  <span>${billData.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Export Receipt</CardTitle>
              <p className="text-sm text-muted-foreground">
                Download a detailed receipt for your records or share the completion with others
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <button onClick={handleExportPDF} className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <button onClick={handleExportCSV} className="bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
                <button onClick={handleShare} className="bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Share Completion
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Details */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Blockchain Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Network:</span>
                  <span className="ml-2 font-medium">Shardeum</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Bill ID:</span>
                  <span className="ml-2 font-mono">{billData.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Transactions:</span>
                  <span className="ml-2 font-medium">{billData.transactionHashes.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Final Status:</span>
                  <Badge variant="default" className="ml-2 bg-green-600">
                    Completed
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="text-sm text-muted-foreground mb-2">All Transaction Hashes:</div>
                <div className="space-y-1">
                  {billData.transactionHashes.map((hash, index) => (
                    <div key={index} className="text-xs font-mono bg-muted/50 p-2 rounded">
                      {hash}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90">
              <Link to="/dashboard">Back to Dashboard</Link>
            </button>
            <button className="bg-transparent">
              <Link to="/create-bill">Create New Bill</Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
