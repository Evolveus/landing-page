import { useEffect, useState } from "react";

/* The site's theme, "light" or "dark", kept current. The nav's button
   sets html[data-theme] (see useTheme in landing/brand/pageMotion.js);
   until a visitor picks one, the system setting decides. This only
   reads it: the print pieces show themselves in whatever the site is in. */
const read = () =>
  document.documentElement.dataset.theme ||
  (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export function useSiteTheme() {
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const sync = () => setTheme(read());
    const attr = new MutationObserver(sync);
    attr.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    mq?.addEventListener("change", sync);
    return () => {
      attr.disconnect();
      mq?.removeEventListener("change", sync);
    };
  }, []);
  return theme;
}
