// context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '@/app/lib/Supabase';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const fetchCart = async () => {
    try {
      const { data: globalUser, error: globalUserError } =
        await supabase.auth.getUser();
      if (globalUserError) {
        console.error('Error fetching user:', globalUserError);
        return;
      }

      if (!globalUser || !globalUser.user) {
        console.error('No user is logged in.');
        return;
      }

      const userEmail = globalUser.user.email;
      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (publicUserError || !publicUser) {
        console.error(
          'Error fetching user data:',
          publicUserError || 'No user found'
        );
        return;
      }

      const userId = publicUser.id;

      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError || !cartData) {
        console.error('No cart found');
        return;
      }

      const { data: cartItems, error: cartItemsError } = await supabase
        .from('cart_items')
        .select(`id, quantity, products (id, name, price, image_url)`)
        .eq('cart_id', cartData.id);

      if (cartItemsError) {
        console.error('Error fetching cart items:', cartItemsError);
        return;
      }

      setCart(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data: globalUser, error: globalUserError } =
        await supabase.auth.getUser();
      if (globalUserError) {
        console.error('Error fetching user:', globalUserError);
        return;
      }

      if (!globalUser || !globalUser.user) {
        console.error('No user is logged in.');
        return;
      }

      const userEmail = globalUser.user.email;
      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (publicUserError || !publicUser) {
        console.error(
          'Error fetching user data:',
          publicUserError || 'No user found'
        );
        return;
      }

      const userId = publicUser.id;
      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError || !cartData) {
        console.error('No cart found');
        return;
      }

      const cartId = cartData.id;

      const { data: deletedItem, error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId);

      if (deleteError) {
        console.error('Error deleting item from cart_items:', deleteError);
        return;
      }

      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, setCart, isOpenCart, setIsOpenCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
