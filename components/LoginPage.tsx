// In components/LoginPage.tsx
import { useForm } from 'react-hook-form';
import { Stethoscope, ArrowRight } from 'lucide-react';

type LoginFormInputs = {
  email: string;
  password: string;
};

type LoginPageProps = {
  onLogin: (user: { email: string; name: string }) => void;
};

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    const namePart = data.email.split('@')[0];
    const name = namePart.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() + namePart.slice(1);
    onLogin({ email: data.email, name });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Welcome to Shedula</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to book your appointment.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-slate-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-slate-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};  