'use server';

import { prisma } from '@/lib/prisma';

export async function getPayrollProfiles() {
  const payrollProfiles = await prisma.payrollProfile.findMany({
    select: {
      iban: true,
      employee: {
        select: {
          team: {
            select: {
              department: {
                select: {
                  company: {
                    select: {
                      name: true,
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return payrollProfiles;
}

export async function getPayrollProfile(id: number) {
  const payrollProfile = await prisma.payrollProfile.findUnique({
    where: {
      id
    },
    select: {
      iban: true,
      // Commenting out above (iban: true) at LEVEL 0 will show an error when we setPayrollProfiles in page.tsx.
      // Why? The inferred return type of getPayrollProfiles and getPayrollProfile no longer match.
      // This is expected.
      employee: {
        select: {
          team: {
            select: {
              department: {
                select: {
                  company: {
                    select: {
                      name: true,
                      // Commenting out above (name: true) LEVEL 4 should show an error when we setPayrollProfiles in page.tsx.
                      // Why? The inferred return type of getPayrollProfiles and getPayrollProfile no longer match.
                      // However no error is shown, this is not expected. 🪲?
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return payrollProfile;
}