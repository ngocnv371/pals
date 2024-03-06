import { useEffect } from "react";

interface Segment {
  className: string;
  duration: number;
}

export function useClassSequence<T extends HTMLElement>(
  ref: React.MutableRefObject<T | undefined>,
  segments: Segment[],
  onCompleted?: () => void
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    console.debug("setup sequence", segments);

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

    console.debug(`complete in ${timeout}ms`);
    const completedHandle = setTimeout(() => {
      onCompleted && onCompleted();
    }, timeout);
    handles.push(+completedHandle);

    return () => {
      console.debug("cleanup sequence");
      handles.forEach((h) => clearTimeout(h));
    };
  }, [segments]);
}
