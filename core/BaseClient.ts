import { APIRequestContext } from "@playwright/test";

export class BaseClient {
  protected requestContext!: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  public mergePayload(
    defaultPayload: Record<string, any>,
    overrides?: Record<string, any>,
  ) {
    if (!overrides) return defaultPayload;
    const merged: Record<string, any> = { ...defaultPayload };
    for (const key of Object.keys(overrides)) {
      const matchKey = Object.keys(defaultPayload).find(
        (k) => k.toLowerCase() === key.toLowerCase(),
      );
      if (matchKey) merged[matchKey] = overrides[key];
      else merged[key] = overrides[key];
    }
    return merged;
  }
}
