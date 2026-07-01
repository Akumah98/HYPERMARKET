import { useState, useEffect } from 'react';

export const useProductSearch = (delay = 500) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
  };
};
