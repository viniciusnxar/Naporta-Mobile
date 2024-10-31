Aqui está um exemplo de como pode ser o seu arquivo `README.md`, explicando a integração do Firebase com o projeto e as mudanças nos arquivos principais (`firebaseConfig.ts`, `auth`, `home`, `product`).

---

# NaPorta - Integração Firebase

Este projeto integra o Firebase com React Native usando Expo. A integração inclui funcionalidades de autenticação, Firestore para banco de dados e Firebase Storage para gerenciar o upload e a remoção de arquivos (imagens de produtos). A configuração do Firebase está centralizada em um arquivo `firebaseConfig.ts`, e os principais componentes afetados pela integração são `auth.tsx`, `Home.tsx` e `Product.tsx`.

## Pré-requisitos

- Node.js
- Expo CLI
- Firebase Console configurado com um projeto
- Firebase SDK configurado para **Authentication**, **Firestore** e **Storage**
- Pacotes adicionais:
  - `@react-native-async-storage/async-storage`
  - `firebase`
  - `expo-image-picker`

## Configuração do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto (caso ainda não tenha).
2. Ative o **Authentication** (Email/Password) e configure o **Firestore** e **Firebase Storage**.
3. Obtenha as credenciais de configuração do Firebase (API Key, Auth Domain, etc.).
4. Configure as variáveis de ambiente no seu projeto Expo.

## Variáveis de Ambiente

As credenciais do Firebase devem ser armazenadas em variáveis de ambiente, definidas no arquivo `.env` ou diretamente no `app.json` se estiver usando Expo:

### Exemplo de `.env`:

```env
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_auth_domain_here
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
FIREBASE_APP_ID=your_app_id_here
FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

## Configuração do Firebase no Projeto

### Arquivo `firebaseConfig.ts`

O arquivo `firebaseConfig.ts` é responsável por inicializar os serviços do Firebase (Authentication, Firestore, Storage) e garantir a persistência da autenticação usando o pacote `@react-native-async-storage/async-storage`.

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'process.env.FIREBASE_API_KEY',
  authDomain: 'process.env.FIREBASE_AUTH_DOMAIN',
  projectId: 'process.env.FIREBASE_PROJECT_ID',
  storageBucket: 'process.env.FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'process.env.FIREBASE_MESSAGING_SENDER_ID',
  appId: 'process.env.FIREBASE_APP_ID',
  measurementId: 'process.env.FIREBASE_MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { firestore, storage, auth };
```

### Mudanças em `auth.tsx`

O arquivo `auth.tsx` lida com a autenticação de usuários, usando as credenciais de login e senha, além de persistir o estado do usuário usando o `AsyncStorage`.

Principais mudanças:
- Uso de `initializeAuth` para garantir a persistência com `AsyncStorage`.
- Carregamento do estado do usuário armazenado.
- Implementação de login, logout e recuperação de senha via Firebase Authentication.

```typescript
import { auth } from '@src/firebaseConfig'; // Importando a instância de auth configurada com persistência

async function signIn(email: string, password: string) {
  // Implementação do login usando Firebase Auth
}

async function signOutUser() {
  await signOut(auth);
  await AsyncStorage.removeItem(USER_COLLECTION);
  setUser(null);
}
```

### Mudanças em `Home.tsx`

O arquivo `Home.tsx` exibe os produtos cadastrados no Firebase Firestore e permite buscar pizzas pelo nome. A busca é realizada em tempo real, utilizando a coleção de `pizzas` no Firestore.

Principais mudanças:
- Conexão com Firestore para buscar as pizzas.
- Uso de `getDocs`, `query`, `orderBy`, `startAt`, `endAt` para consultas.
- Implementação de autenticação para logout e controle de acesso ao cadastro de pizzas.

```typescript
import { firestore } from '@src/firebaseConfig';
import { getDocs, query, collection, orderBy, startAt, endAt } from 'firebase/firestore';

function fetchPizzas(value: string) {
  const pizzasCollection = collection(firestore, 'pizzas');
  const pizzasQuery = query(
    pizzasCollection,
    orderBy('name_insensitive'),
    startAt(value),
    endAt(`${value}\uf8ff`)
  );

  getDocs(pizzasQuery).then((response) => {
    const data = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPizzas(data);
  });
}
```

### Mudanças em `Product.tsx`

O arquivo `Product.tsx` permite adicionar ou excluir pizzas no Firestore. O upload das imagens é feito no Firebase Storage.

Principais mudanças:
- Upload de imagens para o Firebase Storage.
- Salvamento dos detalhes da pizza no Firestore.
- Deleção de documentos e imagens do Storage.

```typescript
import { firestore, storage } from '@src/firebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { addDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';

async function handleAdd() {
  const storageRef = ref(storage, `/pizzas/${new Date().getTime()}.png`);
  const imgBlob = await fetch(image).then((res) => res.blob());
  
  await uploadBytes(storageRef, imgBlob);
  const photo_url = await getDownloadURL(storageRef);

  await addDoc(collection(firestore, 'pizzas'), {
    name,
    description,
    prices_sizes: { p: priceSizeP, m: priceSizeM, g: priceSizeG },
    photo_url,
    photo_path: storageRef.fullPath,
  });
}
```

## Conclusão

Esse projeto integra Firebase Authentication, Firestore e Storage em um aplicativo React Native usando Expo. O estado de autenticação é persistido com `AsyncStorage`, e o Firestore e Storage são usados para manipular dados de pizzas e imagens. Siga os passos descritos neste `README` para garantir que todas as funcionalidades estejam corretamente configuradas.

--- 

Esse `README.md` fornece uma visão geral da integração do Firebase com o projeto, destacando as mudanças feitas e como as principais funcionalidades estão organizadas.