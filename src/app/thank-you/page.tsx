import { Suspense } from "react";
import { ThankYou } from "@/components/sections/thank-you";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Thank you",
  description: "Your callback request has reached Waterbase Technologies. Our team will get in touch shortly to discuss your irrigation requirement.",
  path: "/thank-you",
});

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  );
}