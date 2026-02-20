'use client';

import { useState } from 'react';
import { getCompanies, getCompany } from './actions';

type Company = Awaited<ReturnType<typeof getCompanies>>[number];

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);

  return (
    <div>
      <button onClick={async () => {
        const newCompany = await getCompany(123);
        if (!newCompany) return;
        setCompanies(prev => {
          const mergedCompanies = [...prev, newCompany];
          return mergedCompanies;
        });
      }}>
        Add new company
      </button>
    </div>
  );
}
