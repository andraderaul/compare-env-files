const main = require("./main");

describe("testing env compare", () => {
  it("should return true when the env keys are equals", async () => {
    const result = await main(".env.local", ".env.production");

    expect(result).toBe(true);
  });

  it("should return false when the env keys aren't equals", async () => {
    const result = await main(".env.local", ".env.staging");

    expect(result).toBe(false);
  });

  it("should return an error when not found an env file", async () => {
    const result1 = await main(".env.local", ".env.not-found");
    expect(result1.path).toBe(".env.not-found");

    const result2 = await main(".env.not-found", ".env.local");
    expect(result2.path).toBe(".env.not-found");
  });
});
