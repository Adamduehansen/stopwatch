/* global jest describe beforeEach test expect */
// eslint-disable-next-line no-unused-vars
import { Stopwatch, TickSubscription } from './Stopwatch';

describe('Stopwatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('should create new instance', () => {
    // Arrange
    const stopwatch = new Stopwatch(1_000);

    // Assert
    expect(stopwatch).not.toBeNull();
  });

  test('should start timer', () => {
    // Arrange
    const stopwatch = new Stopwatch(1_000);

    // Act
    stopwatch.start();

    // Assert
    expect(stopwatch.running).toBeTruthy();
  });

  test('should tick', () => {
    // Arrange
    const stopwatch = new Stopwatch(1_000);

    // Act
    stopwatch.start();
    jest.runOnlyPendingTimers();

    // Assert
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('should call subscription on tick', () => {
    // Arrange
    const stopwatch = new Stopwatch(1_000);

    // Act
    const stopwatchSubscriptionMock: TickSubscription = jest.fn(options => {
      if (options.numberOfTicks === 2) {
        options.stopwatch.stop();
      }
    });
    stopwatch.subscribe(stopwatchSubscriptionMock);
    stopwatch.start();

    jest.runOnlyPendingTimers();

    // Assert
    expect(stopwatchSubscriptionMock).toHaveBeenCalledTimes(1);
  });

  test.each([
    [4_000, false],
    [2_000, true]
  ])('should stop after max ticks', (
    advanceTimersTime: number,
    isRunning: boolean
  ) => {
    // // Arrange
    const stopwatch = new Stopwatch(1_000, 3);

    // // Act
    stopwatch.start();
    jest.advanceTimersByTime(advanceTimersTime);

    // // Assert
    expect(stopwatch.running).toBe(isRunning);
  });
});
