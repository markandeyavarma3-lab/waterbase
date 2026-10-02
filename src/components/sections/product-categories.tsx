import { Section, Container, SectionHeading } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/sections/stagger";
import { ProductCard } from "@/components/ui/product-card";
import { listImages } from "@/lib/logos";
import { PRODUCT_GROUPS, categoriesInGroup } from "@/lib/products";

export function ProductCategories() {
  return (
    <Section tone="field">
      <Container>
        <SectionHeading
          eyebrow="Micro Irrigation"
          title="Our complete product range"
          lead="From a single dripper to turnkey micro-irrigation projects — everything we supply, design and install, all under one roof from 20+ trusted brands."
        />

        <div className="mt-12 space-y-24">
          {PRODUCT_GROUPS.map((group) => (
            <div key={group.id}>
              <h2 className="mb-8 font-display text-2xl font-bold text-heading">{group.title}</h2>
              <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoriesInGroup(group.id).map((c) => {
                  const images = listImages(`products/${c.folder}`);
                  return (
                    <StaggerItem key={c.title} className="h-full">
                      <ProductCard
                        title={c.title}
                        description={c.desc}
                        iconSmall={<c.icon className="h-5 w-5" />}
                        images={images}
                      />
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
