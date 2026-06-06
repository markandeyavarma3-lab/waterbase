import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ContactActions({
  onDark = false,
  size = "lg",
  waMessage,
  className,
}: {
  onDark?: boolean;
  size?: "lg" | "xl";
  waMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <Button asChild size={size} className={onDark ? "bg-white text-brand-green-dark shadow-lift hover:bg-white/90" : "shadow-soft"}>
        <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Message on WhatsApp</a>
      </Button>
      <Button asChild size={size} variant="outline" className={onDark ? "border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white" : ""}>
        <Link href="/contact"><PhoneCall /> Request a callback</Link>
      </Button>
    </div>
  );
}