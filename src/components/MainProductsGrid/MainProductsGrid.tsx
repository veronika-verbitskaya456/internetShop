import { useRef, useState } from 'react';
import styles from './MainProductsGrid.module.css';
import { useGetAllProductsWithPaginationQuery } from '../../services/productsApi';
import { BACKEND_LIMIT, PAGINATION_LIMIT } from '../../utils/productsConstants';
import CardProduct from '../CardProduct/CardProduct';

const MainProductGrid = () => {
  const [page, setPage] = useState(0);
  const [backendOffset, setBackendOffset] = useState(0);
  const { data: products = [], isFetching, error } = useGetAllProductsWithPaginationQuery(backendOffset);

  const startIndex = page * PAGINATION_LIMIT;
  const endIndex = startIndex + PAGINATION_LIMIT;
  const visibleProducts = products.slice(startIndex, endIndex);
  const catalogScrollRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const nextPageNumber = page + 1;
    const requiredItemsCount = (nextPageNumber + 1) * PAGINATION_LIMIT;
    if (products.length < requiredItemsCount && !isFetching) {
      setBackendOffset((prev) => prev + BACKEND_LIMIT);
    }

    setPage(nextPageNumber);
    catalogScrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  const handlePrev = () => {
    setPage((prev) => Math.max(0, prev - 1));
    catalogScrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  if (products.length === 0 && isFetching) {
    return <p>Загрузка товаров...</p>;
  }

  if (error && products.length === 0) {
    return <p>Ошибка загрузки</p>;
  }

  return (
    <>
      <div ref={catalogScrollRef} className={styles.gridContainer}>
        {visibleProducts?.map((product) => (
          <CardProduct product={product} />
        ))}
      </div>
      <div>
        <button className={styles.button} onClick={handlePrev}>prev</button>
        <button className={styles.button} onClick={handleNext}>next</button>
      </div>
    </>

  )
}

export default MainProductGrid;