import PrasadBookingPage from "@/components/prasad/PrasadBookingPage";

interface Props {
  params: Promise<{
    slug: string;
    prasadId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { slug, prasadId } = await params;

  return <PrasadBookingPage slug={slug} prasadId={prasadId} />;
}
