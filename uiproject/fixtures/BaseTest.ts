import { test as pom } from "./pom";
import { test as auth } from "./auth";
import { mergeTests } from "playwright/test";

export const test = mergeTests(pom, auth);
export const expect = test.expect;