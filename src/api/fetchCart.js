import supabase from '@/app/lib/Supabase';

export const fetchCart = async (setCart) => {
  try {
    // Fetch cart data seperti sebelumnya
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

    // Mendapatkan item dalam cart
    const { data: cartItems, error: cartItemsError } = await supabase
      .from('cart_items')
      .select(
        `
          id,
          quantity,
          products (
            id,
            name,
            price,
            image_url
          )
        `
      )
      .eq('cart_id', cartData.id);

    if (cartItemsError) {
      console.error('Error fetching cart items:', cartItemsError);
      return;
    }

    // Memperbarui state carts
    setCart(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};
