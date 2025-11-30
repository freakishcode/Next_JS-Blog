import Navigation from "@/components/Navigation";
import BlogUpdateForm from "@/components/BlogUpdateForm";

// Using Suspense for data fetching
import { Suspense } from "react";

import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";

// interface Props {
//   params: Promise<{ id: string }>;
// }

interface Props {
  params: { id: string };
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Navigation />

      <Suspense fallback={<LoadingAnimation />}>
        <BlogUpdateForm id={id} />
      </Suspense>
    </>
  );
}
