"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

const MAGNETIC_PULL = 0.22
const MAGNETIC_MAX = 8

const buttonVariants = cva(
  // Note: the old `active:...:translate-y-px` press effect is gone — every
  // button now gets its transform from framer-motion below (magnetic pull +
  // tap scale), and an inline style transform always wins over this
  // stylesheet rule, so it was dead weight once that landed.
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Translucent tint + border + blur — the same recipe as the
        // WhatsApp/callback buttons on the "Planning a project" CTA panel,
        // now the default everywhere rather than a one-off. Text switches to
        // each hue's darkest token (not the mid "-dark" one): a translucent
        // 15% fill needs a darker foreground than a solid fill would to hold
        // 4.5:1 contrast.
        default: "border border-brand-green/25 bg-brand-green/15 text-brand-green-darker shadow-soft backdrop-blur-sm hover:bg-brand-green/25",
        accent: "border border-brand-blue/25 bg-brand-blue/15 text-brand-blue-deep shadow-soft backdrop-blur-sm hover:bg-brand-blue/25",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-full px-2 text-xs in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-full px-2.5 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xl: "h-12 gap-2 px-6 text-base [&_svg:not([class*='size-'])]:size-5 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-full in-data-[slot=button-group]:rounded-full [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-full in-data-[slot=button-group]:rounded-full",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// The button is now a framer-motion component (for the magnetic pull below),
// which defines its own onDrag/onDragStart/onDragEnd/onAnimationStart/
// onAnimationEnd with gesture-event signatures that collide with the native
// HTML ones of the same name — omit them from the accepted props so
// TypeScript resolves to framer-motion's versions instead of erroring on the
// mismatch. Nothing in the codebase passes these to a Button today.
type ButtonProps = Omit<
  React.ComponentProps<"button">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 }
  // useSpring(source) stays subscribed to `source` and keeps re-syncing
  // toward it — .set() has to target the raw source value, not the spring's
  // own output, or the pull gets silently overridden within a frame.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  // Every button pulls gently toward the cursor — the same magnetic feel
  // MotionPress already gave the WhatsApp/callback buttons, now everywhere
  // rather than a one-off. Mouse only (touch has no hover to magnetise
  // toward), and off entirely under reduced motion.
  const handlePointerMove = (e: React.PointerEvent) => {
    if (prefersReducedMotion || e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    const nx = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relX * MAGNETIC_PULL))
    const ny = Math.max(-MAGNETIC_MAX, Math.min(MAGNETIC_MAX, relY * MAGNETIC_PULL))
    rawX.set(nx)
    rawY.set(ny)
  }
  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const motionProps = {
    style: prefersReducedMotion ? undefined : { x, y },
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
    whileTap: prefersReducedMotion ? undefined : { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  }

  const buttonClassName = cn(buttonVariants({ variant, size, className }))

  // asChild renders through Radix's Slot, which clones its props onto a
  // single arbitrary child (an <a>, a <Link>, ...). Wrapping THAT in
  // motion.create() does not reliably reach the real DOM node — framer-motion
  // needs a direct ref to the element it's animating, and Slot's prop-cloning
  // sits in the way. So for asChild, the motion lives on an outer
  // motion.span instead (same pattern MotionPress already uses elsewhere),
  // and Slot.Root underneath is left completely plain.
  if (asChild) {
    return (
      <motion.span className="inline-flex" {...motionProps}>
        <Slot.Root data-slot="button" data-variant={variant} data-size={size} className={buttonClassName} {...props} />
      </motion.span>
    )
  }

  return (
    <motion.button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonClassName}
      {...motionProps}
      {...props}
    />
  )
}

export { Button, buttonVariants }
