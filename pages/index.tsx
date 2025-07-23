// In pages/index.tsx
import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { LoginPage } from '../components/LoginPage';
import { BookingFlow } from '../components/BookingFlow';
import Head from 'next/head';
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface Booking {
  id: number;
  doctor: Doctor;
  date: Date;
  time: string;
}

export interface User {
  email: string;
  name: string;
}

interface HomePageProps {
  doctors: Doctor[];
}

// --- MAIN PAGE COMPONENT ---
const HomePage: NextPage<HomePageProps> = ({ doctors }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <Head>
        <title>Shedula - Appointment Booking</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main style={{ fontFamily: "'Inter', sans-serif" }}>
        {!user ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <BookingFlow user={user} doctors={doctors} onLogout={handleLogout} />
        )}
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch('http://localhost:4000/doctors');
  const doctors = await res.json();
  return {
    props: {
      doctors,
    },
  };
};