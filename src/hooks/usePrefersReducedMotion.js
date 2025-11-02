import { useEffect, useState } from "react";

const ATTRIBUTE = "data-reduced-motion";

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event) => {
      setReduced(event.matches);
    };

    setReduced(mediaQuery.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(ATTRIBUTE, String(reduced));
    return () => {
      document.documentElement.removeAttribute(ATTRIBUTE);
    };
  }, [reduced]);

  return { reducedMotion: reduced, setReducedMotion: setReduced };
};
