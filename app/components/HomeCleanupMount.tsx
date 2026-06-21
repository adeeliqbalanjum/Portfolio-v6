"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HomeCleanupMount() {
  const pathname = usePathname();

  useEffect(() => {
    const removeOldSections = () => {
      document.getElementById("features")?.remove();
      document.getElementById("plugin-lab")?.remove();
    };

    removeOldSections();
    const firstTimer = window.setTimeout(removeOldSections, 80);
    const secondTimer = window.setTimeout(removeOldSections, 220);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, [pathname]);

  return null;
}
