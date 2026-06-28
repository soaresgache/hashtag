export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="28" height="28" rx="8" fill="#16306E" />
        <path
          d="M10.5 8.5L9 19.5M16.5 8.5L15 19.5M7.5 12H19.5M6.8 16H18.8"
          stroke="#13C2C2"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-ink">
        Hashtag <span className="text-brand-600">Digital</span>
      </span>
    </span>
  );
}
