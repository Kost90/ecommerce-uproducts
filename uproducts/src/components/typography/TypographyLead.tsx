export function TypographyLead({ text }: { text: string }): JSX.Element {
  return <p className="text-xl text-muted-foreground hover:text-black font-semibold">{text}</p>;
}
