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
      employee: {
        select: {
          team: {
            select: {
              department: {
                select: {
                  company: {
                    select: {
                      name: true,
                      // Commenting out above should generate a TS error in page.tsx when we setPayrollProfiles.
                      // Why? The inferred return type of getPayrollProfiles and getPayrollProfile no longer match.
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