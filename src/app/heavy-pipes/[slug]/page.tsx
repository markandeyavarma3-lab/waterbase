import { notFound } from "next/navigation";
import { ProductSubPage, productPageMetadata } from "@/components/sections/product-sub-page";
import { PIPE_PAGES, findPage } from "@/lib/product-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return PIPE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(PIPE_PAGES, slug);
  return page ? productPageMetadata(page, `/heavy-pipes/${slug}`) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(PIPE_PAGES, slug);
  if (!page) notFound();
  return <ProductSubPage page={page} />;
}
