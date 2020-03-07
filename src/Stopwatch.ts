import { Autobind } from './Autobind';

export type TickSubscription = (
  TickSubscriptionCallback: {
    numberOfTicks: number,
    stopwatch: Stopwatch
  }
) => void;

export class Stopwatch {
  private _intervalId: number | undefined;

  private _numberOfTicks = 0;
  private _subscriptions = new Array<TickSubscription>(0);

  /**
   * Gets a boolean value that indicates if the timer is running.
   */
  public get running() {
    return typeof this._intervalId !== 'undefined';
  }

  public constructor(public readonly timeout: number) {}

  /**
   * Starts the timer.
   */
  public start() {
    // @ts-ignore: typescript thinks that I want to use NodeJS.setInterval.
    this._intervalId = setInterval(this.tick, this.timeout);
  }

  /**
   * Stops the timer.
   */
  public stop() {
    clearInterval(this._intervalId);
  }

  /**
   * Adds a subscription to each tick.
   * @param subscription The subscription.
   */
  public subscribe(subscription: TickSubscription) {
    this._subscriptions.push(subscription);
  }

  @Autobind
  private tick() {
    this._subscriptions.forEach(
      subscription => subscription({
        numberOfTicks: 0,
        stopwatch: this
      })
    );
  }
}
