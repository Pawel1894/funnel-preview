import { ListBlock as ListBlockType } from "../../funnel";

type ListBlockProps = {
  block: ListBlockType;
};

export function ListBlock({ block }: ListBlockProps) {
  return (
    <ul className="list-disc pl-5">
      {block.items.map((item) => (
        <li key={item.id} className="mb-2">
          <div className="font-semibold">{item.title}</div>
          {item.description && <div>{item.description}</div>}
          {item.src && <img src={item.src} alt={item.title} className="mt-1 max-w-full h-auto" />}
        </li>
      ))}
    </ul>
  );
}
