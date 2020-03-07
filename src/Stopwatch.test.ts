/* global jest describe beforeEach test expect */
import { Stopwatch } from './Stopwatch';

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

  test('should call subscription on tick', () => {
    // Arrange
    const stopwatch = new Stopwatch(1_000);

    // Act
    const stopwatchSubscriptionMock = jest.fn(options => options.stopwatch.stop());
    stopwatch.subscribe(stopwatchSubscriptionMock);
    stopwatch.start();
    jest.runOnlyPendingTimers();

    // Assert
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1_000);
    expect(stopwatchSubscriptionMock).toHaveBeenCalledTimes(1);
  });

  test('should stop after timeoutlimit', () => {

  });
});
