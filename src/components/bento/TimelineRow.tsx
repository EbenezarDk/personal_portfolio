type TimelineRowProps = {
  dates: string;
  title: string;
  subtitle: string;
};

export function TimelineRow({ dates, title, subtitle }: TimelineRowProps) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 sm:gap-x-6">
      <span className="whitespace-nowrap text-xs text-[var(--muted)] sm:text-sm">
        {dates}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-white sm:text-sm">{title}</p>
        <p className="text-xs text-[var(--muted)] sm:text-sm">{subtitle}</p>
      </div>
    </li>
  );
}
