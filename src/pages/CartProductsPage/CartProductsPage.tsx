import { useSelector, useDispatch } from "react-redux";
import { selectCartProducts, clearCart, createOrder } from "../../store/slices/productSlice";
import styles from './CartProductsPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CartItem from "../../components/CartItem/CartItem";
import ConfirmModal from "../../components/Modals/ConfirmModal/ConfirmModal";
import ThanksForPurchaiseModal from "../../components/Modals/ThanksForPurchaiseModal/ThanksForPurchaiseModal";
import { Routes } from "../../routes";

const CartProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsInCart = useSelector(selectCartProducts);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [isThanksModalOpen, setIsThanksModalOpen] = useState(false);

  const handleClearCart = () => {
    setIsClearConfirmOpen(true);
  };

  const handleConfirmClearCart = () => {
    dispatch(clearCart());
    setIsClearConfirmOpen(false);
  };

  const handleCheckout = () => {
    if (productsInCart.length === 0) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      dispatch(createOrder({ products: productsInCart }));
      setIsProcessing(false);
      setIsThanksModalOpen(true);
    }, 1500);
  };

  const totalPrice = productsInCart.reduce((sum, product) => sum + product.price, 0);

  if (productsInCart.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyTitle}>Корзина пуста</h2>
        <p className={styles.emptyText}>Добавьте товары в корзину, чтобы оформить заказ</p>
        <button 
          className={styles.shoppingButton}
          onClick={() => navigate(Routes.MAIN)}
        >
          Перейти к покупкам
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.headerActions}>
          <span className={styles.count}>{productsInCart.length} товаров</span>
          <button 
            className={styles.clearButton}
            onClick={handleClearCart}
          >
            Очистить корзину
          </button>
        </div>
      </div>

      <div className={styles.cartList}>
        {productsInCart.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.totalSection}>
          <div className={styles.totalInfo}>
            <span className={styles.totalLabel}>Итого:</span>
            <span className={styles.totalPrice}>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.totalDetails}>
            <span>Товаров: {productsInCart.length}</span>
            <span>Сумма: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button 
          className={styles.checkoutButton}
          onClick={handleCheckout}
          disabled={isProcessing || productsInCart.length === 0}
        >
          {isProcessing ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </div>

      <ConfirmModal
        isOpen={isClearConfirmOpen}
        message="Вы уверены, что хотите очистить корзину?"
        onConfirm={handleConfirmClearCart}
        onCancel={() => setIsClearConfirmOpen(false)}
      />
      <ThanksForPurchaiseModal
        isOpen={isThanksModalOpen}
        onClose={() => setIsThanksModalOpen(false)}
      />
    </div>
  )
}

export default CartProductsPage;