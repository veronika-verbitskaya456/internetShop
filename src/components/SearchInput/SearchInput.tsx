import { useState } from 'react';
import styles from './SearchInput.module.css'
import SearchIcon from '../../assets/icons/SearchIcon';

const SearchInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const showIcon = !isFocused && !value;

  return (
    <div className={styles.searchWrapper}>
      {showIcon && (
        <div className={styles.iconWrapper}>
          <SearchIcon />
        </div>
      )}
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        className={styles.input}
        placeholder='Найти товары...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}

export default SearchInput;