export * from "vitest";
export * from "@testing-library/react";

export { userEvent } from "@testing-library/user-event";

export function createKeyboardEventStub(options: Partial<React.KeyboardEvent> = {}): React.KeyboardEvent {
  const defaults: React.KeyboardEvent = {
    key: "",
    keyCode: 0,
    code: "",
    type: "keydown",
    charCode: 0,
    preventDefault: () => {},
    stopPropagation: () => {},
    target: null,
    currentTarget: null,
    nativeEvent: {} as KeyboardEvent,
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    persist: () => {},
    bubbles: true,
    cancelable: true,
    eventPhase: 0,
    isTrusted: true,
    timeStamp: Date.now(),
    ...options,
  } as React.KeyboardEvent;

  return defaults;
}
