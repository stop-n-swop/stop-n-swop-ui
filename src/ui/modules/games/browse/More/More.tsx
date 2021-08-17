import React, { useEffect, useRef } from 'react';
import Loader from 'ui/modules/Loader';

export default function More({
  nextPage,
  setPage,
  loading,
}: {
  nextPage: number;
  setPage(page: number): void;
  loading: boolean;
}) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        const [target] = entities;
        if (target.isIntersecting && !loading) {
          setPage(nextPage);
        }
      },
      { rootMargin: '0px 0px 500px 0px' },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [nextPage, setPage, loading]);

  return (
    <div className="text-center my-8" ref={ref}>
      <Loader />
    </div>
  );
}
