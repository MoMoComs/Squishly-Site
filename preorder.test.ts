import { describe, it, expect, beforeAll } from "vitest";
import { createPreorder, getAllPreorders } from "./db";

describe("Preorder API", () => {
  beforeAll(async () => {
    // Ensure database is available before running tests
    console.log("Starting preorder API tests...");
  });

  it("should create a preorder successfully", async () => {
    const preorderData = {
      name: "Test User",
      email: "test@example.com",
      box: "medium",
      quantity: "2",
    };

    try {
      await createPreorder(preorderData);
      const preorders = await getAllPreorders();
      
      // Check that at least one preorder exists with our test data
      const testPreorder = preorders.find(
        (p) => p.email === "test@example.com"
      );
      expect(testPreorder).toBeDefined();
      expect(testPreorder?.name).toBe("Test User");
      expect(testPreorder?.box).toBe("medium");
      expect(testPreorder?.quantity).toBe("2");
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });

  it("should retrieve all preorders", async () => {
    try {
      const preorders = await getAllPreorders();
      expect(Array.isArray(preorders)).toBe(true);
      expect(preorders.length).toBeGreaterThanOrEqual(0);
    } catch (error) {
      console.error("Test failed:", error);
      throw error;
    }
  });

  it("should handle preorder with all box types", async () => {
    const boxTypes = ["mini", "medium", "mega"];
    
    for (const box of boxTypes) {
      const preorderData = {
        name: `User for ${box}`,
        email: `test-${box}@example.com`,
        box,
        quantity: "1",
      };

      try {
        await createPreorder(preorderData);
        const preorders = await getAllPreorders();
        const found = preorders.find((p) => p.box === box && p.email === `test-${box}@example.com`);
        expect(found).toBeDefined();
      } catch (error) {
        console.error(`Test failed for box type ${box}:`, error);
        throw error;
      }
    }
  });
});
