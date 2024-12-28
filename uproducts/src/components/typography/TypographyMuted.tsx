export function TypographyMuted({ text, className }: { text: string; className?: string }): JSX.Element {
  return <p className={`text-sm text-muted-foreground hover:text-black ${className}`}>{text}</p>;
}
