// Using Suspense for data fetching
import { Suspense } from "react";

// UI for loading animation
import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";
// Navigation component for site navigation
import Navigation from "@/components/Navigation";
// Component to display post details
import PostDetails from "./PostDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

// interface PageProps {
//   params: { id: string };
// }

export default async function BlogViewPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<LoadingAnimation />}>
        <Navigation />
        <PostDetails id={id} />
      </Suspense>
      ;
    </>
  );
}
