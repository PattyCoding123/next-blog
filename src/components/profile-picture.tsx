import Image from "next/image";

export default function ProfilePicture() {
  return (
    <section className="mx-auto w-full">
      <Image
        className="mx-auto mt-8 rounded-full border-4 border-border drop-shadow-xl"
        src="/images/profile.jpg"
        alt="Patrick's profile picture"
        width={200}
        height={200}
        priority={true}
      />
    </section>
  );
}
