'use server';

import { prisma } from '@/lib/prisma';


export async function getCompanies() {
  const companies = await prisma.company.findMany({
    select: {
      name: true,
      departments: {
        select: {
          teams: {
            select: {
              employees: {
                select: {
                  payrollProfiles: {
                    select: {
                      iban: true,
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

  return companies;
}

export async function getCompany(id: number) {
  const company = await prisma.company.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      departments: {
        select: {
          teams: {
            select: {
              employees: {
                select: {
                  payrollProfiles: {
                    select: {
                      // iban: true, 
                      // Commenting above out should generate a TS error in page.tsx when we setCompanies.
                      // Why? The inferred return type of getCompanies and getCompany are no longer compatible.
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

  return company;
}