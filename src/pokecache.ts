type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  private cache = new Map<string, CacheEntry<any>>();
  private reapIntervalId: NodeJS.Timeout | undefined = undefined;
  private interval: number;

  constructor(interval: number) {
    this.interval = interval;
    this.startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.cache.set(key, { createdAt: Date.now(), val });
  }

  get<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    return entry.val as T;
  }

  private reap(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.createdAt >= this.interval) {
        this.cache.delete(key);
      }
    }
  }

  private startReapLoop(): void {
    this.reapIntervalId = setInterval(() => this.reap(), this.interval);
  }

  stopReapLoop(): void {
    clearInterval(this.reapIntervalId);
    this.reapIntervalId = undefined;
  }
}