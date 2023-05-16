interface VideoProps {
  id: string;
}

export default function Video({ id }: VideoProps) {
  return (
    <div className="aspect-h-9 aspect-w-16">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
