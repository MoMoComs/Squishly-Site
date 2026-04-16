import { drizzle } from "drizzle-orm/mysql2";
import { inventory } from "./drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const inventoryData = [
  { box: "mini", totalSpots: 100, reservedSpots: 0 },
  { box: "medium", totalSpots: 150, reservedSpots: 0 },
  { box: "mega", totalSpots: 75, reservedSpots: 0 },
];

async function seed() {
  try {
    console.log("Seeding inventory...");
    
    for (const item of inventoryData) {
      await db.insert(inventory).values(item).onDuplicateKeyUpdate({
        set: { totalSpots: item.totalSpots, reservedSpots: item.reservedSpots },
      });
      console.log(`✓ Seeded ${item.box} box: ${item.totalSpots} total spots`);
    }
    
    console.log("✓ Inventory seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding inventory:", error);
    process.exit(1);
  }
}

seed();
