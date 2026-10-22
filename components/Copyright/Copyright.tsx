'use client';

import { useSyncExternalStore } from 'react';
import css from './Copyright.module.css';

interface CopyrightProps {
  serverYear: number;
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Date().getFullYear();
}

export default function Copyright({ serverYear }: CopyrightProps) {
  const year = useSyncExternalStore(subscribe, getSnapshot, () => serverYear);

  return (
    <p className={css.copyright}>
      © {year} Природні Мандри. Усі права захищені.
    </p>
  );
}
