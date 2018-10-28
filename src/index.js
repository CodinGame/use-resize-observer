import { useEffect, useState } from "react";
import { install } from "resize-observer";

if (!window.ResizeObserver) install();

export default function(ref) {
  const [width, changeWidth] = useState(1);
  const [height, changeHeight] = useState(1);

  useEffect(() => {
    const element = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length) {
        return;
      }

      const entry = entries[0];

      changeWidth(entry.contentRect.width);
      changeHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  });

  return { width, height };
}
