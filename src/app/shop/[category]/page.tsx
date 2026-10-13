import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  redirect(`/shop/search?category=${category}`);
}

