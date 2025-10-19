import { configureStore } from "@reduxjs/toolkit";

import casesReducer from "./caseSlice";

export default configureStore({
  reducer: {
    cases: casesReducer,
  }
});
