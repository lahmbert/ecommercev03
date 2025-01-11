'use client';
import supabase from '@/app/lib/Supabase';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.push('/login');
    } catch (error) {
      console.error('Error saat logout:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
