import { useEffect, useState } from "react";
import { siteContentStore, SiteContent } from "@/store/siteContent";

export const useSiteContent = (): SiteContent => {
  const [content, setContent] = useState<SiteContent>(() => siteContentStore.get());
  useEffect(() => siteContentStore.subscribe(() => setContent(siteContentStore.get())), []);
  return content;
};
