import CategoryLandingTemplate from "@/components/templates/CategoryLandingTemplate";
import PLPTemplate from "@/components/templates/PLPTemplate";
import ContentHubTemplate from "@/components/templates/ContentHubTemplate";
import EditorialTemplate from "@/components/templates/EditorialTemplate";
import ServiceLandingTemplate from "@/components/templates/ServiceLandingTemplate";
import HelpArticleTemplate from "@/components/templates/HelpArticleTemplate";
import { notFound } from "next/navigation";

const CATEGORY_LANDING_SLUGS = ["living-room", "bedroom", "dining", "outdoor", "office", "lighting", "decor", "collections"];
const CONTENT_HUB_SLUGS = ["rooms", "materials", "shop-the-look"];
const EDITORIAL_SLUGS = ["about", "inspiration", "custom-furniture", "reviews", "projects", "real-homes"];
const SERVICE_LANDING_SLUGS = ["design-services", "trade"];
const HELP_SLUGS = ["help"];

const VALID_ROOT_SLUGS = [
  ...CATEGORY_LANDING_SLUGS,
  ...CONTENT_HUB_SLUGS,
  ...EDITORIAL_SLUGS,
  ...SERVICE_LANDING_SLUGS,
  ...HELP_SLUGS,
  "new-arrivals",
  "sale"
];

export default async function DynamicCategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const rootSlug = slug[0];

  // Validate the root slug against our Master URL list
  if (!VALID_ROOT_SLUGS.includes(rootSlug)) {
    notFound();
  }

  // 1. Content Hubs
  if (CONTENT_HUB_SLUGS.includes(rootSlug)) {
    return <ContentHubTemplate title={rootSlug} slug={slug} />;
  }

  // 2. Editorial / Brand Story
  if (EDITORIAL_SLUGS.includes(rootSlug)) {
    return <EditorialTemplate title={rootSlug} slug={slug} />;
  }

  // 3. Service Landing
  if (SERVICE_LANDING_SLUGS.includes(rootSlug)) {
    return <ServiceLandingTemplate title={rootSlug} slug={slug} />;
  }

  // 4. Help & Support
  if (HELP_SLUGS.includes(rootSlug)) {
    return <HelpArticleTemplate title={rootSlug} slug={slug} />;
  }

  // 5. Category Landing
  if (slug.length === 1 && CATEGORY_LANDING_SLUGS.includes(rootSlug)) {
    return <CategoryLandingTemplate categorySlug={rootSlug} />;
  }

  // 6. Default to PLP (Product Listing Page) for nested commerce routes and /new-arrivals, /sale
  return <PLPTemplate categorySlug={rootSlug} subCategorySlug={slug[1]} />;
}
