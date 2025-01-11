import supabase from '@/app/lib/Supabase';

export const fetchUsers = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching Categories:', error);
    return [];
  }

  return data;
};
