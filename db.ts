import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, preorders, InsertPreorder, inventory, emailLogs, InsertEmailLog } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createPreorder(preorder: InsertPreorder): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create preorder: database not available");
    return;
  }

  try {
    await db.insert(preorders).values(preorder);
  } catch (error) {
    console.error("[Database] Failed to create preorder:", error);
    throw error;
  }
}

export async function getAllPreorders() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get preorders: database not available");
    return [];
  }

  try {
    return await db.select().from(preorders);
  } catch (error) {
    console.error("[Database] Failed to get preorders:", error);
    return [];
  }
}

export async function getInventory() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get inventory: database not available");
    return [];
  }

  try {
    return await db.select().from(inventory);
  } catch (error) {
    console.error("[Database] Failed to get inventory:", error);
    return [];
  }
}

export async function getInventoryByBox(box: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get inventory: database not available");
    return null;
  }

  try {
    const result = await db.select().from(inventory).where(eq(inventory.box, box)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get inventory:", error);
    return null;
  }
}

export async function updateInventoryReservedSpots(box: string, quantity: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update inventory: database not available");
    return false;
  }

  try {
    const current = await getInventoryByBox(box);
    if (!current) return false;
    
    await db
      .update(inventory)
      .set({ reservedSpots: current.reservedSpots + quantity })
      .where(eq(inventory.box, box));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update inventory:", error);
    return false;
  }
}

export async function getPreordersByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get preorders: database not available");
    return [];
  }

  try {
    return await db.select().from(preorders).where(eq(preorders.email, email));
  } catch (error) {
    console.error("[Database] Failed to get preorders by email:", error);
    return [];
  }
}

export async function updatePreorderStatus(preorderId: number, status: string, trackingNumber?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update preorder: database not available");
    return false;
  }

  try {
    const updateData: Record<string, any> = { status };
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    if (status === "shipped") {
      updateData.shippedDate = new Date();
    } else if (status === "delivered") {
      updateData.deliveredDate = new Date();
    }

    await db
      .update(preorders)
      .set(updateData)
      .where(eq(preorders.id, preorderId));
    return true;
  } catch (error) {
    console.error("[Database] Failed to update preorder:", error);
    return false;
  }
}

export async function logEmail(emailLog: InsertEmailLog) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot log email: database not available");
    return;
  }

  try {
    await db.insert(emailLogs).values(emailLog);
  } catch (error) {
    console.error("[Database] Failed to log email:", error);
  }
}
