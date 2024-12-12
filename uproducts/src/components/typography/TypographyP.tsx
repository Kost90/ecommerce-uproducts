export function TypographyP({ text }: { text: string }): JSX.Element {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}
