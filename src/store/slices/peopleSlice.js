import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPeople } from "../../api/swapi";

const ITEMS_PER_PAGE = 20;

export const fetchAllPeople = createAsyncThunk(
  "people/fetchAllPeople",
  async () => {
    const data = await getAllPeople();
    return data;
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState: {
    allData: [],
    filteredData: [],
    displayData: [],
    nameFilter: "",
    sortDirection: "asc",
    currentPage: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.nameFilter = action.payload;
      state.currentPage = 1;

      state.filteredData = state.allData.filter((person) =>
        person.name.toLowerCase().includes(action.payload.toLowerCase())
      );

      state.displayData = state.filteredData.slice(0, ITEMS_PER_PAGE);
    },

    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";

      state.filteredData = [...state.filteredData].sort((a, b) => {
        if (state.sortDirection === "asc") {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });

      // Aggiorna i dati visualizzati mantenendo la pagina corrente
      const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
      state.displayData = state.filteredData.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
    },

    setPage: (state, action) => {
      state.currentPage = action.payload;
      const startIndex = (action.payload - 1) * ITEMS_PER_PAGE;
      state.displayData = state.filteredData.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPeople.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPeople.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allData = action.payload;
        state.filteredData = action.payload;
        state.displayData = action.payload.slice(0, ITEMS_PER_PAGE);
      })
      .addCase(fetchAllPeople.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setNameFilter, toggleSortDirection, setPage } =
  peopleSlice.actions;
export default peopleSlice.reducer;
