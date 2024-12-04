import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD5qKn3JhjYSzglvBjHDM8qylTwV9Gmnhs',
  authDomain: 'naportamobile-5ab92.firebaseapp.com',
  projectId: 'naportamobile-5ab92',
  storageBucket: 'naportamobile-5ab92.appspot.com',
  messagingSenderId: '55889757096',
  appId: '1:55889757096:web:27b4e22c9be5e82334539d',
  measurementId: 'G-SJQWMZNQ55',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ProductList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const querySnapshot = await getDocs(collection(db, 'pizzas'));
        const pizzaData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPizzas(pizzaData);
      } catch (error) {
        console.error('Erro ao buscar pizzas:', error);
      }
    }

    fetchPizzas();
  }, []);

  return (
    <div className='font-[sans-serif] bg-gray-100'>
      <div className='p-4 mx-auto lg:max-w-7xl sm:max-w-full'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-12'>Pizzas</h2>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6'>
          {pizzas.map((pizza) => (
            <div
              key={pizza.id}
              className='bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative'
            >
              <div className='w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4'>
                <img
                  src={pizza.photo_url}
                  alt={pizza.name}
                  className='h-full w-full object-contain'
                />
              </div>

              <div>
                <h3 className='text-lg font-extrabold text-gray-800'>
                  {pizza.name}
                </h3>
                <p className='text-gray-600 text-sm mt-2'>
                  {pizza.description}
                </p>
                <h4 className='text-lg text-gray-800 font-bold mt-4'>
                  R$ {pizza.prices_sizes.m}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
