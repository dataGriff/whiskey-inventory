// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const items = [
    {
      name: 'Glen Example 12',
      distillery: 'Glen Example Distillery',
      region: 'Speyside',
      age: 12,
      abv: 43,
      size_ml: 700,
      quantity: 3,
      purchaseDate: new Date('2024-08-01'),
      priceCents: 4999,
      notes: 'Light, fruity, honeyed',
      imageUrl: 'https://example.com/images/glen-example-12.jpg',
      tags: ['speyside', 'single-malt'],
      rating: 4.2,
    },
    {
      name: 'Lag 16',
      distillery: 'Lag Example',
      region: 'Islay',
      age: 16,
      abv: 46,
      size_ml: 700,
      quantity: 2,
      purchaseDate: new Date('2023-12-15'),
      priceCents: 8999,
      notes: 'Peaty and smoky',
      tags: ['islay', 'peat'],
      rating: 4.5,
    },
    // add a few more realistic items
  ];

  for (const item of items) {
    await prisma.whiskey.create({ data: item });
  }

  console.log(`Seeded ${items.length} whiskey items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
