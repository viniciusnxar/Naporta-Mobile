'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar os estilos do toastify
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ProductList from './components/layout/productlist';

const firebaseConfig = {
  apiKey: 'AIzaSyD5qKn3JhjYSzglvBjHDM8qylTwV9Gmnhs',
  authDomain: 'naportamobile-5ab92.firebaseapp.com',
  projectId: 'naportamobile-5ab92',
  storageBucket: 'naportamobile-5ab92.appspot.com',
  messagingSenderId: '55889757096',
  appId: '1:55889757096:web:27b4e22c9be5e82334539d',
  measurementId: 'G-SJQWMZNQ55',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default function Home() {
  return (
    <div>
      <ProductList /> {/* Renderiza o componente */}
    </div>
  );
}
