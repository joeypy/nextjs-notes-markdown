import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue == null) {
        if (typeof initialValue === 'function') {
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(jsonValue);
      }
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};
