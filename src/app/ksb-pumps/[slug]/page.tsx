import { notFound } from "next/navigation";
import { ProductSubPage, productPageMetadata } from "@/components/sections/product-sub-page";
import { KSB_PAGES, findPage } from "@/lib/product-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return KSB_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(KSB_PAGES, slug);
  return page ? productPageMetadata(page, `/ksb-pumps/${slug}`) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findPage(KSB_PAGES, slug);
  if (!page) notFound();
  return <ProductSubPage page={page} />;
}
