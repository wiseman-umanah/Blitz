import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Badge } from "../components/ui/badge"
import { ArrowLeft, ArrowRight, DollarSign, Check, Copy, QrCode, Share } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"

interface BillData {
  title: string
  amount: string
  description: string
  currency: string
  deadline: string
  participants: string[]
  splitMethod: "equal" | "custom" | "percentage"
  customSplits: { [key: string]: number }
}

export default function CreateBill() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [billData, setBillData] = useState<BillData>({
    title: "",
    amount: "",
    description: "",
    currency: "USD",
    deadline: "",
    participants: [],
    splitMethod: "equal",
    customSplits: {},
  })
  const [newParticipant, setNewParticipant] = useState("")

  const steps = [
    { number: 1, title: "Bill Details", description: "Basic information" },
    { number: 2, title: "Add Participants", description: "Who's splitting?" },
    { number: 3, title: "Split Method", description: "How to divide" },
    { number: 4, title: "Confirmation", description: "Review & create" },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addParticipant = () => {
    if (newParticipant.trim() && !billData.participants.includes(newParticipant.trim())) {
      setBillData({
        ...billData,
        participants: [...billData.participants, newParticipant.trim()],
      })
      setNewParticipant("")
    }
  }

  const removeParticipant = (participant: string) => {
    setBillData({
      ...billData,
      participants: billData.participants.filter((p) => p !== participant),
    })
  }

  const calculateSplits = () => {
    const amount = Number.parseFloat(billData.amount) || 0
    const participantCount = billData.participants.length + 1 // +1 for creator

    if (billData.splitMethod === "equal") {
      return amount / participantCount
    }
    return 0
  }

  const handleCreateBill = () => {
    // TODO: Implement blockchain transaction
    console.log("Creating bill:", billData)
    navigate("/dashboard")
  }

  const mockBillId = "BILL-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const mockInviteLink = `https://splitshard.app/join/${mockBillId}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <Header title="Create Blitz" />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.number <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-px mx-4 ${step.number < currentStep ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                Step {currentStep}: {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Bill Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bill Title</label>
                    <Input
                      placeholder="e.g., Team Dinner at Olive Garden"
                      value={billData.title}
                      onChange={(e) => setBillData({ ...billData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Total Amount</label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={billData.amount}
                        onChange={(e) => setBillData({ ...billData, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Currency</label>
                      <Select
                        value={billData.currency}
                        onValueChange={(value) => setBillData({ ...billData, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="SHM">SHM (Shardeum)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                    <Textarea
                      placeholder="Add any additional details about this bill..."
                      value={billData.description}
                      onChange={(e) => setBillData({ ...billData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Payment Deadline</label>
                    <Input
                      type="date"
                      value={billData.deadline}
                      onChange={(e) => setBillData({ ...billData, deadline: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Add Participants */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Add Participants</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter wallet address or email"
                        value={newParticipant}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addParticipant()}
                      />
                      <button onClick={addParticipant}>Add</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Participants ({billData.participants.length + 1})</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground text-sm font-semibold">You</span>
                          </div>
                          <span className="font-medium">You (Bill Creator)</span>
                        </div>
                        <Badge variant="default">Organizer</Badge>
                      </div>
                      {billData.participants.map((participant, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                              <span className="text-accent-foreground text-sm font-semibold">
                                {participant.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span>{participant}</span>
                          </div>
                          <button onClick={() => removeParticipant(participant)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Split Method */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">How would you like to split this bill?</label>
                    <div className="grid gap-3">
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          billData.splitMethod === "equal"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                        onClick={() => setBillData({ ...billData, splitMethod: "equal" })}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Split Equally</div>
                            <div className="text-sm text-muted-foreground">Everyone pays the same amount</div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            {billData.splitMethod === "equal" && <div className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Split Preview</div>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Total Amount:</span>
                            <span className="font-medium">${billData.amount || "0.00"}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Number of People:</span>
                            <span className="font-medium">{billData.participants.length + 1}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between">
                            <span className="font-medium">Each Person Pays:</span>
                            <span className="font-bold text-primary">${calculateSplits().toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Bill Created Successfully!</h3>
                      <p className="text-muted-foreground">Your bill has been created and is ready to share</p>
                    </div>
                  </div>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Bill ID:</span>
                        <span className="font-mono text-sm">{mockBillId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Title:</span>
                        <span className="font-medium text-sm">{billData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Amount:</span>
                        <span className="font-medium text-sm">${billData.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Participants:</span>
                        <span className="font-medium text-sm">{billData.participants.length + 1} people</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Each Pays:</span>
                        <span className="font-bold text-primary">${calculateSplits().toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <div className="text-sm font-medium">Share with participants:</div>
                    <div className="flex gap-2">
                      <Input value={mockInviteLink} readOnly className="font-mono text-sm" />
                      <button>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-transparent">
                        <QrCode className="w-4 h-4 mr-2" />
                        Show QR Code
                      </button>
                      <button className="flex-1 bg-transparent">
                        <Share className="w-4 h-4 mr-2" />
                        Share Link
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button onClick={handlePrevious} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button onClick={handleCreateBill}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Create Bill
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
