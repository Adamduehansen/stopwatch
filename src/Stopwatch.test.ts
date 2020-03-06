import { Stopwatch } from "./Stopwatch";

describe("Stopwatch", () => {
  test("should create new instance", () => {
    // Arrange
    const stopwatch = new Stopwatch();

    // Assert
    expect(stopwatch).not.toBeNull();
  });
});
