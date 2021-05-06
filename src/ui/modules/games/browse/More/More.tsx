import React, { useEffect, useRef } from 'react';
import Loader from 'ui/modules/Loader';

export default function More({
  nextPage,
  setPage,
}: {
  nextPage: number;
  setPage(page: number): void;
}) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entities) => {
      const [target] = entities;
      if (target.isIntersecting) {
        setPage(nextPage);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [nextPage, setPage]);

  return (
    <div className="text-center my-8" ref={ref}>
      <Loader />
    </div>
  );
}
