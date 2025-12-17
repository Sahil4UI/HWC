"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let width = window.innerWidth
        let height = window.innerHeight

        canvas.width = width
        canvas.height = height

        const particles: Particle[] = []
        const particleCount = 45 // Reduced for visibility
        const connectionDistance = 150
        const mouseDistance = 200

        const mouse = { x: -1000, y: -1000 }

        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            color: string

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                // Cyberpunk speed: Moderate
                this.vx = (Math.random() - 0.5) * 1.5
                this.vy = (Math.random() - 0.5) * 1.5
                this.size = Math.random() * 2 + 1
                // Neon Cyan and Purple palette
                this.color = Math.random() > 0.5 ? "rgba(0, 243, 255, " : "rgba(189, 0, 255, "
            }



            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                // Mouse repulsion (Force Field)
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    const directionX = forceDirectionX * force * 5
                    const directionY = forceDirectionY * force * 5
                    this.x -= directionX
                    this.y -= directionY
                }
            }

            draw() {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fillStyle = this.color + "0.6)" // Reduced opacity
                ctx.shadowBlur = 8
                ctx.shadowColor = this.color + "0.8)" // Neon Glow
                ctx.fill()
            }
        }

        const init = () => {
            // Performance: Limit particles (Max 60 for mobile/desktop balance)
            const numberOfParticles = Math.min((width * height) / 15000, 60)
            particles.length = 0 // Clear array instead of reassigning
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        const animate = () => {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            // Cyberpunk Grid Background (Subtle)
            // Perf: Render grid less frequently or use CSS?
            // Keeping canvas grid for now but optimized opacity
            ctx.strokeStyle = "rgba(0, 243, 255, 0.03)"
            ctx.lineWidth = 1
            const gridSize = 50
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            // Update and draw particles
            particles.forEach((particle, i) => {
                particle.update()
                particle.draw()

                // Draw connections - Optimized distance
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Reduced connection distance for performance
                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 - distance / 100 * 0.15})` // Cyan connections
                        ctx.lineWidth = 1
                        ctx.shadowBlur = 0 // Performance
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        init()
        animate()

        const handleResize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
            init()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-black"
            style={{ pointerEvents: "none" }}
        />
    )
}
