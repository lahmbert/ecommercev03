import supabase from '@/app/lib/Supabase';

export const fetchCartItems = async () => {
  const { data, error } = await supabase.from('cart_items').select('*');

  if (error) {
    console.error('Error fetching Categories:', error);
    return [];
  }

  return data;
};
