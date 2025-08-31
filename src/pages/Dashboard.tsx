import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Badge } from "../components/ui/badge"
import { Plus, Users, Calendar, DollarSign, Clock, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"

// Mock data for demonstration
const activeBills = [
  {
    id: "1",
    title: "Team Dinner at Olive Garden",
    totalAmount: 240,
    paidAmount: 160,
    participants: 6,
    deadline: "2024-01-15",
    status: "pending" as const,
    yourShare: 40,
  },
  {
    id: "2",
    title: "Weekend Trip to Mountains",
    totalAmount: 800,
    paidAmount: 600,
    participants: 4,
    deadline: "2024-01-20",
    status: "pending" as const,
    yourShare: 200,
  },
  {
    id: "3",
    title: "Office Party Supplies",
    totalAmount: 150,
    paidAmount: 150,
    participants: 8,
    deadline: "2024-01-10",
    status: "completed" as const,
    yourShare: 18.75,
  },
]

const pastBills = [
  {
    id: "4",
    title: "Movie Night Snacks",
    totalAmount: 60,
    participants: 3,
    completedDate: "2024-01-05",
    yourShare: 20,
  },
  {
    id: "5",
    title: "Birthday Gift for Sarah",
    totalAmount: 120,
    participants: 6,
    completedDate: "2023-12-28",
    yourShare: 20,
  },
  {
    id: "6",
    title: "Lunch at Food Court",
    totalAmount: 45,
    participants: 3,
    completedDate: "2023-12-20",
    yourShare: 15,
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <Header title="Blitz" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-lg bg-white text-black rounded-2xl px-8 py-6">
              <Link to="/create-bill">
			  	<div className="flex items-center flex-col">
					<Plus className="w-5 h-5 mr-2" />
					Create New Bill
				</div>
              </Link>
            </button>
            <button className="text-lg border rounded-2xl px-8 py-6 bg-transparent">
              <Link to="/join-bill">
				<div className="flex items-center flex-col">
					<Users className="w-5 h-5 mr-2" />
					Join Existing Bill
				</div>
              </Link>
            </button>
          </div>

          {/* Active Bills Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Active Bills</h2>
              <Badge variant="secondary">
                {activeBills.filter((bill) => bill.status === "pending").length} pending
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeBills.map((bill) => (
                <Card
                  key={bill.id}
                  className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{bill.title}</CardTitle>
                      <Badge variant={bill.status === "completed" ? "default" : "outline"}>
                        {bill.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {bill.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        ${bill.paidAmount} / ${bill.totalAmount}
                      </span>
                    </div>
                    <Progress value={(bill.paidAmount / bill.totalAmount) * 100} className="h-2" />

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{bill.participants} people</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(bill.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span className="font-medium">Your share: ${bill.yourShare}</span>
                      </div>
                      <button>
                        <Link to={`/bill/${bill.id}`}>View</Link>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Past Bills Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Past Bills</h2>
              <Badge variant="outline">{pastBills.length} completed</Badge>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {pastBills.map((bill) => (
                    <div key={bill.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{bill.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${bill.totalAmount} total</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{bill.participants} people</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Completed {new Date(bill.completedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="font-medium">${bill.yourShare}</div>
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
