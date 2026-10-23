import { notFound } from "next/navigation";
import { ProductSubPage, productPageMetadata } from "@/components/sections/product-sub-page";
import { JAIN_PAGES, findPage } from "@/lib/product-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return JAIN_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(JAIN_PAGES, slug);
  return page ? productPageMetadata(page, `/jain-systems/${slug}`) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(JAIN_PAGES, slug);
  if (!page) notFound();
  return <ProductSubPage page={page} />;
}
