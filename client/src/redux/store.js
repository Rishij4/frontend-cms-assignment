import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import pageReducer from "./pageSlice";
import sectionReducer from "./sectionSlice";
import dashboardReducer from "./dashboardSlice";
export const store = configureStore({
  reducer: {
  auth: authReducer,
  dashboard: dashboardReducer,
  pages: pageReducer,
  sections: sectionReducer,
},
});