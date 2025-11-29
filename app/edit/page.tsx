"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";

export default function EditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    if (id) {
      // redirect to dynamic route /edit/[id]
      router.replace(`/edit/${id}`);
    }
  }, [id, router]);

  return (
    <>
      <Navigation />

      <div className='p-6 text-center mt-5'>
        <p>If you were trying to edit a post, you are being redirected...</p>
      </div>
    </>
  );
}
