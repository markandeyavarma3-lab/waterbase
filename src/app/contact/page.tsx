import { Contact } from "@/components/sections/contact";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Get in touch with Waterbase Technologies for irrigation product supply, system design, installation, project execution and APMIP subsidy assistance across South India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="theme-warm">
      <Contact />
      <GoogleReviews />
    </div>
  );
}