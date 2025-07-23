import { useState } from 'react';
import { LoginPage } from '../components/LoginPage';
import { BookingFlow } from '../components/BookingFlow';
import Head from 'next/head';

// --- TYPE DEFINITIONS ---
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string; // Kept for type consistency, but not used by new components
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

// --- MOCK DATA ---
const mockDoctors: Doctor[] = [
    {
        id: 1,
        name: 'Dr. Aisha Patel',
        specialty: 'Cardiologist',
        image: '',
        bio: 'Dr. Patel is a board-certified cardiologist with over 15 years of experience in treating heart conditions.'
    },
    {
        id: 2,
        name: 'Dr. Ben Carter',
        specialty: 'Dermatologist',
        image: '',
        bio: 'Dr. Carter specializes in both medical and cosmetic dermatology. He is known for his patient-centric approach.'
    },
    {
        id: 3,
        name: 'Dr. Chloe Davis',
        specialty: 'Pediatrician',
        image: '',
        bio: 'With a passion for children\'s health, Dr. Davis provides comprehensive care for infants, children, and adolescents.'
    },
    {
        id: 4,
        name: 'Dr. David Rodriguez',
        specialty: 'Orthopedic Surgeon',
        image: '',
        bio: 'Dr. Rodriguez is a leading expert in sports medicine and joint replacement surgery.'
    },
    {
        id: 5,
        name: 'Dr. Evelyn Reed',
        specialty: 'Neurologist',
        image: '',
        bio: 'Specializing in disorders of the nervous system, including stroke and epilepsy.'
    },
    {
        id: 6,
        name: 'Dr. Frank Miller',
        specialty: 'Psychiatrist',
        image: '',
        bio: 'Provides mental health care for adults, focusing on therapy and medication management.'
    }
];


// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
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
          <BookingFlow user={user} doctors={mockDoctors} onLogout={handleLogout} />
        )}
      </main>
    </>
  );
}
