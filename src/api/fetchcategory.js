import supabase from '@/app/lib/Supabase';

export const fetchCategoeries = async () => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    console.error('Error fetching Categories:', error);
    return [];
  }

  return data;
};
