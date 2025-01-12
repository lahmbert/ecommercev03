// /api/fetchOrder.js
import supabase from '@/app/lib/Supabase';

// Fetch orders and order items for a specific user
export const fetchOrder = async (setOrders) => {
  try {
    // Fetch the user
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

    const { data: orders, error: orderError } = await supabase
      .from('orders')
      .select(
        `
        id,
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
        )
      `
      )
      .eq('user_id', userId);

    if (orderError) {
      console.error('Error fetching orders:', orderError);
      return;
    }

    // Set orders in state
    setOrders(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
};

// Delete order item from an order
export const deleteOrderItem = async (orderId, itemId) => {
  try {
    // Deleting the order item from the 'order_items' table
    const { error: deleteItemError } = await supabase
      .from('order_items')
      .delete()
      .eq('id', itemId)
      .eq('order_id', orderId);

    if (deleteItemError) {
      console.error('Error deleting order item:', deleteItemError);
      throw deleteItemError;
    }

    return { message: 'Item deleted successfully' };
  } catch (err) {
    console.error('Error deleting order item:', err);
    throw err;
  }
};

// Delete the order entirely
export const deleteOrder = async (orderId) => {
  try {
    // Delete all order items first
    const { error: deleteItemsError } = await supabase
      .from('order_items')
      .delete()
      .eq('order_id', orderId);

    if (deleteItemsError) {
      console.error('Error deleting order items:', deleteItemsError);
      throw deleteItemsError;
    }

    // Delete the order itself
    const { error: deleteOrderError } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (deleteOrderError) {
      console.error('Error deleting order:', deleteOrderError);
      throw deleteOrderError;
    }

    return { message: 'Order and its items deleted successfully' };
  } catch (err) {
    console.error('Error deleting order:', err);
    throw err;
  }
};
