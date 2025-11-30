// Using Suspense for data fetching
import { Suspense } from "react";

import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";

import PostDetails from "./PostDetails";

interface PageProps {
  params: { id: string };
}

export default function BlogViewPage({ params }: PageProps) {
  const { id } = params;

  return (
    <>
      <Suspense fallback={<LoadingAnimation />}>
        <PostDetails id={id} />
      </Suspense>
      ;
    </>
  );
}
