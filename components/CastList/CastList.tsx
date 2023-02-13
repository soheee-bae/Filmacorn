import { Cast } from "@/interfaces/movie";

interface CastListProps {
  list: Cast[];
  title: string;
}

export default function CastList(props: CastListProps) {
  const { list, title } = props;
  if (!list || list.length === 0) return null;
  return (
    <div>
      <p>{title}</p>
      <div>
        {list.map((d) => (
          <p>{d.name}</p>
        ))}
      </div>
    </div>
  );
}
