import { ConvexAiChat } from "@/components/aiChat";

export default function Home() {
  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        {/* Convex Vector Search Chat */}
        Chat (Beta)
      </h1>
      <ConvexAiChat
        convexUrl="https://upbeat-bison-801.convex.cloud"
        name="Quanta"
        infoMessage="AI can make mistakes. Verify answers."
        welcomeMessage="Hey there, what can I help you with?"
      />
    </main>
  );
}
