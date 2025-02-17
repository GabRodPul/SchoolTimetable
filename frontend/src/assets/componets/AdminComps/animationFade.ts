import { useEffect, useRef } from "react";

export function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        element.classList.add("visible");
                        observer.unobserve(element);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return ref;
}
