import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import styles from "./SearchInput.module.css";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Routes } from "../../routes";
import type { AppDispatch } from "../../store/store";
import {
  applyFilters,
  selectAppliedFilters,
  selectDraftFilters,
  updateDraftFilter,
} from "../../store/slices/catalogSlice";
import { SEARCH_DEBOUNCE_MS } from "../../utils/productsConstants";

const SearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const draftFilters = useSelector(selectDraftFilters);
  const appliedFilters = useSelector(selectAppliedFilters);
  const draftTitle = draftFilters.title ?? "";

  const [localValue, setLocalValue] = useState(draftTitle);
  const debouncedValue = useDebouncedValue(localValue, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    setLocalValue(draftTitle);
  }, [draftTitle]);

  useEffect(() => {
    const title = debouncedValue.trim() || undefined;
    const appliedTitle = appliedFilters.title;

    if (title === (appliedTitle ?? "")) {
      return;
    }

    dispatch(updateDraftFilter({ title }));
    dispatch(applyFilters());
    navigate(Routes.MAIN);
  }, [debouncedValue, appliedFilters.title, dispatch, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = localValue.trim() || undefined;

    dispatch(updateDraftFilter({ title }));
    dispatch(applyFilters());

    if (location.pathname !== Routes.MAIN) {
      navigate(Routes.MAIN);
    }
  };

  return (
    <form className={styles.searchWrapper} onSubmit={handleSubmit}>
      <button type="submit" className={styles.iconButton} aria-label="Найти">
        <SearchIcon />
      </button>
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        className={styles.input}
        placeholder="Найти товары..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
