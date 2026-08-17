type BlueprintFrameProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export default function BlueprintFrame({
  children,
  className = "",
  as: Tag = "div",
}: BlueprintFrameProps) {
  return (
    <Tag className={`blueprint ${className}`.trim()}>
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
      {children}
    </Tag>
  );
}
