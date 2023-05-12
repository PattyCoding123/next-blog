import Posts from "@/components/posts";

export default function Home() {
  return (
    <main className="mx-auto px-6">
      <p className="mb-12 mt-12 text-center text-3xl text-foreground">
        Hello and Welcome to my Blog!
      </p>
      <Posts />
    </main>
  );
}
