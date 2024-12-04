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

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setError(false);
    setUserCreated(false);

    // Validação da senha
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCreatingUser(true);

    try {
      // Criar usuário com Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = userCredential.user;

      // Adicionar ao Firestore com campos padrão
      await setDoc(doc(db, 'users', uid), {
        isAdmin: false,
        name: 'Cliente',
      });

      toast.success('Usuário criado com sucesso!');
      setUserCreated(true);

      // Redirecionar para login após o registro
      //   setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast.error('Erro ao criar o usuário.');
      setError(true);
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <section className='mt-8 max-w-md mx-auto p-4 bg-white shadow rounded-lg'>
      <ToastContainer position='top-center' autoClose={3000} />{' '}
      {/* Configuração do Toastify */}
      <h1 className='text-center text-primary text-4xl mb-4'>Registrar</h1>
      {userCreated && (
        <div className='my-4 text-center text-green-500'>
          Usuário criado com sucesso!
        </div>
      )}
      {error && (
        <div className='my-4 text-center text-red-500'>
          Ocorreu um erro. Tente novamente mais tarde.
        </div>
      )}
      <form className='space-y-4' onSubmit={handleFormSubmit}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            placeholder='email'
            value={email}
            disabled={creatingUser}
            onChange={(ev) => setEmail(ev.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Senha
          </label>
          <input
            type='password'
            placeholder='senha'
            value={password}
            disabled={creatingUser}
            onChange={(ev) => setPassword(ev.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <button
          type='submit'
          disabled={creatingUser}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          {creatingUser ? (
            <svg
              className='animate-spin h-5 w-5 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v8H4z'
              ></path>
            </svg>
          ) : (
            'Registrar'
          )}
        </button>
      </form>
    </section>
  );
}
