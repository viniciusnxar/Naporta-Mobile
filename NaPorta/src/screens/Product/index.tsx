import React, { useState, useEffect, useCallback } from 'react';

import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  doc,
  getFirestore,
  setDoc,
  addDoc,
  collection,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

// Carregar as variáveis de ambiente usando o Expo Constants
const firebaseConfig = {
  apiKey: 'AIzaSyD5qKn3JhjYSzglvBjHDM8qylTwV9Gmnhs',

  authDomain: 'naportamobile-5ab92.firebaseapp.com',

  projectId: 'naportamobile-5ab92',

  storageBucket: 'naportamobile-5ab92.appspot.com',

  messagingSenderId: '55889757096',

  appId: '1:55889757096:web:27b4e22c9be5e82334539d',

  measurementId: 'G-SJQWMZNQ55',
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

import { ProductNavigationProps } from '@src/@types/navigation';

import { ButtonBack } from '@components/ButtonBack';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';
import { InputPrice } from '@src/components//InputPrice';

import { ProductProps } from '@src/components/ProductCard';

import {
  Container,
  Header,
  Title,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
} from './styles';

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoPath, setPhotoPath] = useState('');

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  async function handlePickerImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('É necessário permitir o acesso à biblioteca de mídia.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza.');
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza.');
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        'Cadastro',
        'Informe o preço de todos os tamanhos da pizza.'
      );
    }
    setIsLoading(true);

    // Carregar imagem no storage
    const fileName = new Date().getTime();
    const storageRef = ref(storage, `/pizzas/${fileName}.png`);

    const imgBlob = await fetch(image).then((res) => res.blob());
    await uploadBytes(storageRef, imgBlob);
    const photo_url = await getDownloadURL(storageRef);

    // Adicionar pizza no Firestore
    await addDoc(collection(firestore, 'pizzas'), {
      name,
      name_insensitive: name.toLowerCase().trim(),
      description,
      prices_sizes: {
        p: priceSizeP,
        m: priceSizeM,
        g: priceSizeG,
      },
      photo_url,
      photo_path: storageRef.fullPath,
    })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
      });
  }

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleDelete() {
    await deleteDoc(doc(firestore, 'pizzas', id || '')).then(() => {
      const storageRef = ref(storage, photoPath);
      deleteObject(storageRef) // Usando deleteObject para deletar o arquivo
        .then(() => navigation.navigate('home'))
        .catch((error) => console.error('Erro ao deletar a imagem:', error));
    });
  }

  useFocusEffect(
    useCallback(() => {
      if (id) {
        const docRef = doc(firestore, 'pizzas', id);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const product = docSnap.data() as PizzaResponse;

            setName(product.name);
            setImage(product.photo_url);
            setDescription(product.description);
            setPriceSizeP(product.prices_sizes.p);
            setPriceSizeM(product.prices_sizes.m);
            setPriceSizeG(product.prices_sizes.g);
            setPhotoPath(product.photo_path);
          }
        });
      }
    }, [id]) // Dependência correta
  );

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={handleGoBack} />
          <Title> Cadastrar </Title>
          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <DeleteLabel>Deletar</DeleteLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />
          {!id && (
            <PickImageButton
              title='Carregar'
              type='secondary'
              onPress={handlePickerImage}
            />
          )}
        </Upload>

        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>
          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size='P'
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size='M'
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size='G'
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          {!id && (
            <Button
              title='Cadastrar pizza'
              isLoading={isLoading}
              onPress={handleAdd}
            />
          )}
        </Form>
      </ScrollView>
    </Container>
  );
}
