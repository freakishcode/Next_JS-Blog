import Navigation from "@/components/Navigation";
import BlogUpdateForm from "@/components/BlogUpdateForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Navigation />
      <BlogUpdateForm id={id} />
    </>
  );
}
