import React, { useState, useEffect } from 'React';
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from 'firebase/firestore';
import storage from 'firebase/storage';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ProductNavigationProps } from '@src/@types/navigation';

import { ButtonBack } from '@components/ButtonBack';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';
import { InputPrice } from '@src/components/inputPrice';

// import { ProductProps } from '@src/components/ProductCard';

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

export function Product() {
  const [image, setImage] = useState('');
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.canceled) {
        setImage(result.uri);
      }
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

    //conectar ao banco e puxar imagens de lá

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
      });
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack />
          <Title> Cadastrar </Title>
          <TouchableOpacity>
            <DeleteLabel> Deletar </DeleteLabel>
          </TouchableOpacity>
        </Header>
        <Upload>
          <Photo uri='' />
          <PickImageButton
            title='Carregar'
            type='secondary'
            onPress={handlePickerImage}
          />
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

          <Button title='Cadastrar Pizza' isLoading={isLoading} />
        </Form>
      </ScrollView>
    </Container>
  );
}
