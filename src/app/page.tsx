import Posts from "@/components/posts";

// Route segment configuration. This allows us to revalidate (ISR)
// data that we acquired WITHOUT using the fetch API.
export const revalidate = 86400; // Revalidate once a day

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
