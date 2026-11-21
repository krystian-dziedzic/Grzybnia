import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Find {
  id: string;
  mushroomId: string;
  latitude: number;
  longitude: number;
  note: string;
  createdAt: string;
  photoUri?: string;
}

const STORAGE_KEY = 'grzybnia:finds';

export function useFinds() {
  const [finds, setFinds] = useState<Find[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setFinds(JSON.parse(raw));
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((updater: (prev: Find[]) => Find[]) => {
    setFinds((prev) => {
      const next = updater(prev);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addFind = useCallback(
    (find: Omit<Find, 'id' | 'createdAt'>) => {
      const newFind: Find = {
        ...find,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      persist((prev) => [newFind, ...prev]);
    },
    [persist]
  );

  const removeFind = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((f) => f.id !== id));
    },
    [persist]
  );

  return { finds, loaded, addFind, removeFind };
}
