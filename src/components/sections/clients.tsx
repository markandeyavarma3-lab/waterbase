import { ClientsCarousel } from "@/components/sections/clients-carousel";
import { listLogos } from "@/lib/logos";

// Drop company logos (PNG with transparent background works best, ~400x160)
// into /public/clients/ — they appear automatically in the carousel.
export function Clients() {
  const clients = listLogos("clients");
  return <ClientsCarousel clients={clients} />;
}
