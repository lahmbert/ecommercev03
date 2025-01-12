import supabase from '@/app/lib/Supabase';

export const fetchOrder = async (setOrders) => {
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
      return;
    }

    // Mendapatkan semua order yang ada untuk user
    const { data: orderItems, error: orderItemsError } = await supabase
      .from('orders')
      .select(
        `id,
            user_id,
            total_price,
            status,
            order_items (
              id,
              quantity,
              price,
              product_id,
              products (
                id,
                name,
                image_url
              )
            )`
      )
      .eq('user_id', userId); // Menghilangkan `.single()` untuk mendapatkan banyak data

    if (orderItemsError || !orderItems) {
      console.error('Data tidak ada:', orderItemsError);
      return;
    }

    // Memperbarui state orders dengan array dari orderItems
    setOrders(orderItems);
  } catch (err) {
    console.error('Error fetching cart:', err);
  }
};
