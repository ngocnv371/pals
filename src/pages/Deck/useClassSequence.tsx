import { useEffect } from "react";

interface Segment {
  className: string;
  duration: number;
}

export function useClassSequence<T extends HTMLElement>(
  ref: React.MutableRefObject<T | undefined>,
  segments: Segment[]
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    // remove all class names
    ref.current.classList.remove(...segments.map((s) => s.className));
    let timeout = 50;
    const handles: number[] = [];
    for (let i = 0; i < segments.length; i++) {
      const handle = setTimeout(() => {
        ref.current!.classList.remove(...segments.map((s) => s.className));
        ref.current!.classList.add(segments[i].className);
      }, timeout);
      timeout += segments[i].duration;
      handles.push(+handle);
    }

    return () => {
      handles.forEach((h) => clearTimeout(h));
    };
  }, [ref.current]);
}
