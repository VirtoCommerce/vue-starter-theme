import { Ref, ref } from "@vue/composition-api";
import { getMyCart, addItemToCart } from "@core/api/graphql/cart";
import { CartType } from "@core/api/graphql/types";
import { Logger } from "@core/utilities";

export default () => {
  const cart: Ref<CartType | null> = ref(null);
  const loading: Ref<boolean> = ref(true);

  async function loadMyCart() {
    loading.value = true;
    try {
      cart.value = await getMyCart();
    } catch (e) {
      Logger.error("useCart.loadMyCart", e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  async function addToCart(productId: string, qty: number) {
    loading.value = true;
    console.log(`addItemToCart ${productId} ${qty}`);
    try {
      await addItemToCart(productId, qty);
    } catch (e) {
      Logger.error("useCart.addItemToCart", e);
      throw e;
    } finally {
      loading.value = false;
    }
    await loadMyCart();
  }

  return { cart, loadMyCart, addToCart, loading };
};
