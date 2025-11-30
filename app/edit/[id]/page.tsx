// Using Suspense for data fetching
import { Suspense } from "react";

// Navigation component for site navigation
import Navigation from "@/components/Navigation";
// Component for updating blog posts
import BlogUpdateForm from "@/components/BlogUpdateForm";

// UI for loading animation
import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";

interface Props {
  params: Promise<{ id: string }>;
}

// interface Props {
//   params: { id: string };
// }

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Suspense fallback={<LoadingAnimation />}>
        <Navigation />
        <BlogUpdateForm id={id} />
      </Suspense>
    </>
  );
}
