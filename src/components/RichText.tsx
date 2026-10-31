import type { Rich } from '@/data/site';

interface RichTextProps {
  parts: Rich;
  /** Classes applied to each emphasised run. */
  emClassName: string;
}

/** Renders a `Rich` value: plain strings as text, `{ em }` runs as styled spans. */
const RichText = ({ parts, emClassName }: RichTextProps) => (
  <>
    {parts.map((part, i) =>
      typeof part === 'string' ? (
        part
      ) : (
        <span key={i} className={emClassName}>
          {part.em}
        </span>
      )
    )}
  </>
);

export default RichText;
