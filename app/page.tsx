'use client';

import { useState } from 'react';
import { getPayrollProfile, getPayrollProfiles } from './actions';

type PayrollProfile = Awaited<ReturnType<typeof getPayrollProfiles>>[number];

export default function Home() {
  const [payrollProfiles, setPayrollProfiles] = useState<PayrollProfile[]>([]);

  return (
    <div>
      <button onClick={async () => {
        const newPayrollProfile = await getPayrollProfile(123);
        if (!newPayrollProfile) return;
        setPayrollProfiles(prev => {
          const mergedPayrollProfiles = [...prev, newPayrollProfile];
          return mergedPayrollProfiles;
        });
      }}>
        Add new payroll profile
      </button>
    </div>
  );
}