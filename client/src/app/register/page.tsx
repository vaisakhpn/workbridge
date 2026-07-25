'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Mail, Lock, ShieldAlert, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

export default function RegisterPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.login);

  const [activeTab, setActiveTab] = useState<'worker' | 'event_team'>('worker');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});

  // Worker Form State
  const [workerData, setWorkerData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Event Team Form State
  const [eventTeamData, setEventTeamData] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleWorkerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFormErrors({});

    try {
      const response = await api.post<{
        user: { id: string; email: string; role: 'worker'; isProfileSetup: boolean; name: string };
        accessToken: string;
        refreshToken: string;
      }>('/auth/register/worker', workerData);

      loginUser(response.user, response.accessToken);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      if (err.info?.errors) {
        setFormErrors(err.info.errors);
      } else {
        setError(err.info?.message || 'Registration failed. Please check your network.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setFormErrors({});

    try {
      const response = await api.post<{
        user: { id: string; email: string; role: 'event_team'; isProfileSetup: boolean; companyName: string };
        accessToken: string;
        refreshToken: string;
      }>('/auth/register/event-team', eventTeamData);

      const parsedUser = {
        id: response.user.id,
        email: response.user.email,
        role: response.user.role,
        isProfileSetup: response.user.isProfileSetup,
        name: response.user.companyName,
      };

      loginUser(parsedUser, response.accessToken);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      if (err.info?.errors) {
        setFormErrors(err.info.errors);
      } else {
        setError(err.info?.message || 'Registration failed. Please check your network.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWorkerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkerData({ ...workerData, [e.target.name]: e.target.value });
  };

  const handleEventTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventTeamData({ ...eventTeamData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-subtle flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans">
      {/* Background glow spots */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-extrabold text-sm">
            W
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Work<span className="text-brand">Bridge</span>
          </span>
        </Link>
        <h2 className="mt-4 text-3xl font-extrabold text-foreground tracking-tight">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-normal">
          Join Kerala's leading event workforce marketplace.
        </p>
      </div>

      {/* Role Toggle Selector */}
      <div className="inline-flex p-1.5 bg-white border border-gray-border rounded-2xl shadow-sm mb-6 z-10">
        <button
          onClick={() => {
            setActiveTab('worker');
            setError('');
            setFormErrors({});
          }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'worker'
              ? 'bg-brand text-white shadow-md glow-orange'
              : 'text-gray-500 hover:text-foreground'
          }`}
        >
          <User className="w-4 h-4" />
          <span>I want to Work</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('event_team');
            setError('');
            setFormErrors({});
          }}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            activeTab === 'event_team'
              ? 'bg-brand text-white shadow-md glow-orange'
              : 'text-gray-500 hover:text-foreground'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>I want to Hire</span>
        </button>
      </div>

      <Card className="w-full max-w-md bg-white border border-gray-border shadow-md z-10 overflow-hidden">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'worker' ? (
              <motion.div
                key="worker"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleWorkerSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 flex items-start space-x-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="e.g. Rahul Kumar"
                    value={workerData.name}
                    onChange={handleWorkerChange}
                    error={formErrors.name?.[0]}
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={workerData.email}
                    onChange={handleWorkerChange}
                    error={formErrors.email?.[0]}
                    required
                  />

                  <Input
                    label="WhatsApp / Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={workerData.phone}
                    onChange={handleWorkerChange}
                    error={formErrors.phone?.[0]}
                    required
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Choose a strong password"
                    value={workerData.password}
                    onChange={handleWorkerChange}
                    error={formErrors.password?.[0]}
                    required
                  />

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    variant="primary"
                    className="w-full justify-between mt-6"
                  >
                    <span>Register as Worker</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="event-team"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleEventTeamSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 flex items-start space-x-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Input
                    label="Company Name"
                    name="companyName"
                    placeholder="e.g. Kerala Caterers Association"
                    value={eventTeamData.companyName}
                    onChange={handleEventTeamChange}
                    error={formErrors.companyName?.[0]}
                    required
                  />

                  <Input
                    label="Owner / Representative Name"
                    name="ownerName"
                    placeholder="e.g. Antony Joseph"
                    value={eventTeamData.ownerName}
                    onChange={handleEventTeamChange}
                    error={formErrors.ownerName?.[0]}
                    required
                  />

                  <Input
                    label="Company Email"
                    name="email"
                    type="email"
                    placeholder="info@company.com"
                    value={eventTeamData.email}
                    onChange={handleEventTeamChange}
                    error={formErrors.email?.[0]}
                    required
                  />

                  <Input
                    label="Company Contact Number"
                    name="phone"
                    type="tel"
                    placeholder="10-digit office number"
                    maxLength={10}
                    value={eventTeamData.phone}
                    onChange={handleEventTeamChange}
                    error={formErrors.phone?.[0]}
                    required
                  />

                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Choose a strong password"
                    value={eventTeamData.password}
                    onChange={handleEventTeamChange}
                    error={formErrors.password?.[0]}
                    required
                  />

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    variant="primary"
                    className="w-full justify-between mt-6"
                  >
                    <span>Register Company</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 pt-6 border-t border-gray-subtle text-center text-xs">
            <span className="text-gray-500">Already have an account?</span>{' '}
            <Link href="/login" className="font-bold text-brand hover:text-brand-hover transition-colors">
              Log in instead
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
