import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./slices/peopleSlice";
import planetsReducer from "./slices/planetsSlice";

export const store = configureStore({
  reducer: {
    people: peopleReducer,
    planets: planetsReducer,
  },
});
