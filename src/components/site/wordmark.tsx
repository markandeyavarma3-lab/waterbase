import { cn } from "@/lib/utils";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="logo-letter" style={{ ["--i" as string]: offset + i }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </>
  );
}

/**
 * The name as individual letters so a ripple can run through it. Screen readers
 * get the name once from aria-label; the letter spans are hidden from them.
 */
export function Wordmark({ animate = true, className }: { animate?: boolean; className?: string }) {
  const first = "Waterbase";
  return (
    <span
      role="img"
      aria-label="Waterbase Technologies"
      className={cn("logo-word inline-flex min-w-0 items-center whitespace-nowrap leading-none", animate && "logo-anim", className)}
    >
      <span aria-hidden="true">
        <Letters text={first} />
        <span className="hidden sm:inline">
          <Letters text=" Technologies" offset={first.length} />
        </span>
      </span>
    </span>
  );
}
