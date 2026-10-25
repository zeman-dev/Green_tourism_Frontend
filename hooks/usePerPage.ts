'use client';

import { useEffect, useState } from 'react';

export default function usePerPage() {
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 1440) {
        setPerPage(8);
      } else {
        setPerPage(9);
      }
    };

    updatePerPage();

    window.addEventListener('resize', updatePerPage);

    return () => {
      window.removeEventListener('resize', updatePerPage);
    };
  }, []);

  return perPage;
}
