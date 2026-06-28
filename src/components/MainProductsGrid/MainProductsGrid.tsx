import { useDispatch, useSelector } from "react-redux";
import ProductsCatalog from "../ProductsCatalog/ProductsCatalog";
import type { AppDispatch } from "../../store/store";
import {
  applyFilters,
  resetFilters,
  selectAppliedFilters,
  selectDraftFilters,
  setDraftFilters,
} from "../../store/slices/catalogSlice";

const MainProductGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const draftFilters = useSelector(selectDraftFilters);
  const appliedFilters = useSelector(selectAppliedFilters);

  return (
    <ProductsCatalog
      appliedFilters={appliedFilters}
      draftFilters={draftFilters}
      onDraftFiltersChange={(filters) => dispatch(setDraftFilters(filters))}
      onApply={() => dispatch(applyFilters())}
      onReset={() => dispatch(resetFilters())}
    />
  );
};

export default MainProductGrid;
