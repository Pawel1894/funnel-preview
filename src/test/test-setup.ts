import "@testing-library/jest-dom";
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Fix needed for framer-motion
if (typeof PointerEvent === "undefined") {
  class PointerEvent extends Event {
    constructor(type: string, props: PointerEventInit) {
      super(type, props);
    }
  }

  // @ts-expect-error - Mock PointerEvent implementation for tests
  global.PointerEvent = PointerEvent;
}
