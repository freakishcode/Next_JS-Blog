import PostDetails from "./PostDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogViewPage({ params }: PageProps) {
  const { id } = await params;

  return <PostDetails id={id} />;
}
