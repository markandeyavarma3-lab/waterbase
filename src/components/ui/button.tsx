import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Button is a SERVER component again.
 *
 * It was briefly a framer-motion component so every button on the site could
 * pull magnetically toward the cursor. That one decision put framer-motion on
 * the critical path of every page that renders a button — which is all of them —
 * and made each button mount two springs and two pointer handlers. The paid
 * landing pages were shipping ~368 KB of gzipped JS, on pages whose whole job is
 * to load fast for a farmer on 4G.
 *
 * The press feedback that actually mattered is now three lines of CSS below
 * (`active:scale-[0.97]`), which costs nothing and works on touch — where there
 * is no cursor to be magnetic toward, i.e. where most of this traffic is.
 * `MotionPress` still exists for the handful of hero CTAs that want a ripple.
 */

const buttonVariants = cva(
  // Press feedback is a CSS transform, not a JS spring: it works on touch,
  // costs no JavaScript, and honours prefers-reduced-motion via the
  // motion-reduce: variants at the end of this string.
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-out-expo active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Translucent tint + border + blur — the same recipe as the
        // WhatsApp/callback buttons on the "Planning a project" CTA panel,
        // now the default everywhere rather than a one-off. Text switches to
        // each hue's darkest token (not the mid "-dark" one): a translucent
        // 15% fill needs a darker foreground than a solid fill would to hold
        // 4.5:1 contrast.
        default: "bg-brand-green text-white shadow-[0_8px_20px_-6px_rgba(46,148,102,0.55)] hover:bg-brand-green-dark hover:shadow-[0_12px_26px_-8px_rgba(46,148,102,0.6)]",
        accent: "border border-brand-blue/25 bg-brand-blue/15 text-brand-blue-deep shadow-soft backdrop-blur-sm hover:bg-brand-blue/25",
        outline:
          "border-brand-blue-light/60 bg-white text-water-deep shadow-xs hover:border-brand-green/50 hover:bg-brand-green-soft hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
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

type ButtonProps = React.ComponentProps<"button"> &
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
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
