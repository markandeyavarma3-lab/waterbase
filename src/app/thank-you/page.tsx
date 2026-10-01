import { Suspense } from "react";
import { ThankYou } from "@/components/sections/thank-you";
import { FormConversionTracker } from "@/components/sections/form-conversion-tracker";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    title: "Thank you",
    description:
      "Your callback request has reached Waterbase Technologies. Our team will get in touch shortly to discuss your irrigation requirement.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      {/* Only the tracker reads search params, so only the tracker is deferred.
          The confirmation itself is prerendered — a visitor who just converted
          sees the page immediately instead of a blank screen waiting on JS. */}
      <Suspense fallback={null}>
        <FormConversionTracker />
      </Suspense>
      <ThankYou />
    </>
  );
}
