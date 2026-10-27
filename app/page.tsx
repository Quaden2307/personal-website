import Notebook from "@/components/Notebook";

export default function Home() {
  return (
    <main id="notebook" className="notebook" tabIndex={-1}>
      <Notebook />
    </main>
  );
}
