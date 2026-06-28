import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductFilters } from "../../services/types";
import type { RootState } from "../store";

interface CatalogState {
  draftFilters: ProductFilters;
  appliedFilters: ProductFilters;
}

const initialState: CatalogState = {
  draftFilters: {},
  appliedFilters: {},
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setDraftFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.draftFilters = action.payload;
    },
    updateDraftFilter: (
      state,
      action: PayloadAction<Partial<ProductFilters>>,
    ) => {
      state.draftFilters = { ...state.draftFilters, ...action.payload };
    },
    applyFilters: (state) => {
      state.appliedFilters = { ...state.draftFilters };
    },
    resetFilters: (state) => {
      state.draftFilters = {};
      state.appliedFilters = {};
    },
  },
});

export const {
  setDraftFilters,
  updateDraftFilter,
  applyFilters,
  resetFilters,
} = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
export const selectDraftFilters = (state: RootState) => state.catalog.draftFilters;
export const selectAppliedFilters = (state: RootState) =>
  state.catalog.appliedFilters;
