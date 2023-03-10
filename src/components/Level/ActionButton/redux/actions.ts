import { createAction } from "@reduxjs/toolkit";

export const onAction = createAction(
  "action/onAction",
  function prepare(value: boolean) {
    return {
      payload: { value },
    };
  }
);
export const onFill = createAction(
  "action/onFill",
  function prepare(value: boolean) {
    return {
      payload: { value },
    };
  }
);
export const onCross = createAction(
  "action/onCross",
  function prepare(value: boolean) {
    return {
      payload: { value },
    };
  }
);
export const onEmpty = createAction(
  "action/onEmpty",
  function prepare(value: boolean) {
    return {
      payload: { value },
    };
  }
);
