"use client"
// pages/reset-password/[token]/index.tsx
import { useResetPasswordMutation } from '@/src/redux/features/user';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query; // Extract the token from the URL
  const [password, setPassword] = useState('');
  const [resetPassword] = useResetPasswordMutation();

  // Specify the type of the event as React.FormEvent<HTMLFormElement>
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await resetPassword({ data: { password }, token }).unwrap();
      toast.success('Reset your password.');
      router.push('/login');
    } catch (error) {
      console.error('Failed to reset password:', error);
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
