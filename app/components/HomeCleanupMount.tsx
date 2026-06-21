"use client";

import { useEffect } from "react";

export function HomeCleanupMount() {
  useEffect(() => {
    const removeOldSections = () => {
      document.getElementById("features")?.remove();
      document.getElementById("plugin-lab")?.remove();
    };

    removeOldSections();
    const timer = window.setTimeout(removeOldSections, 150);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
