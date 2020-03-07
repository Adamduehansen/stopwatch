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

  public constructor(
    public readonly timeout: number,
    private _maxTicks: number | undefined = undefined
  ) {}

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
    this._intervalId = undefined;
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
    this._numberOfTicks += 1;

    this._subscriptions.forEach(
      subscription => subscription({
        numberOfTicks: this._numberOfTicks,
        stopwatch: this
      })
    );

    if (
      typeof this._maxTicks !== 'undefined' &&
      this._numberOfTicks >= this._maxTicks
    ) {
      this.stop();
    }
  }
}
