import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPlanet } from "../../api/swapi";

export const fetchPlanet = createAsyncThunk(
  "planets/fetchPlanet",
  async (planetId) => {
    const data = await getPlanet(planetId);
    return data;
  }
);

const planetsSlice = createSlice({
  name: "planets",
  initialState: {
    selectedPlanet: null,
    cache: {},
    status: "idle",
    error: null,
  },
  reducers: {
    clearSelectedPlanet: (state) => {
      state.selectedPlanet = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlanet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPlanet = action.payload;
        state.cache[action.payload.url.split("/").filter(Boolean).pop()] =
          action.payload;
      })
      .addCase(fetchPlanet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedPlanet } = planetsSlice.actions;
export default planetsSlice.reducer;
