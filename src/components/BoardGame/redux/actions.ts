import { createAction } from "@reduxjs/toolkit";

export const onAction = createAction(
  "boardGame/onAction",
  function prepare(value: boolean) {
    return {
      payload: value,
    };
  }
);
export const onFill = createAction(
  "boardGame/onFill",
  function prepare(value: boolean) {
    return {
      payload: value,
    };
  }
);
export const onCross = createAction(
  "boardGame/onCross",
  function prepare(value: boolean) {
    return {
      payload: value,
    };
  }
);
export const onEmpty = createAction(
  "boardGame/onEmpty",
  function prepare(value: boolean) {
    return {
      payload: value,
    };
  }
);