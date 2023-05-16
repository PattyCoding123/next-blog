import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  priority?: string; // Use string since mdx files will be parsed as strings.
}

export default function CustomImage({ src, alt, priority }: CustomImageProps) {
  const prty = priority ? true : false;

  return (
    <div className="h-full w-full">
      {/* NextJS knows how to keep aspect ratio for images */}
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        width={650}
        height={650}
        priority={prty}
      />
    </div>
  );
}
