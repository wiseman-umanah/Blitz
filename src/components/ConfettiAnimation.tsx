import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  rotationSpeed: number
}

export default function ConfettiAnimation() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  const colors = ["#8b5cf6", "#6b5b9a", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  useEffect(() => {
    // Create initial confetti pieces
    const pieces: ConfettiPiece[] = []
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }
    setConfetti(pieces)

    // Stop animation after 5 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setConfetti(
        (prev) =>
          prev
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.velocityX,
              y: piece.y + piece.velocityY,
              rotation: piece.rotation + piece.rotationSpeed,
              velocityY: piece.velocityY + 0.1, // gravity
            }))
            .filter((piece) => piece.y < window.innerHeight + 20), // remove pieces that fall off screen
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [isAnimating])

  if (!isAnimating && confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: "2px",
          }}
        />
      ))}
    </div>
  )
}
