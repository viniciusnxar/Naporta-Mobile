# NaPorta - Aplicativo de Delivery de Comida

**NaPorta** é um aplicativo de delivery de comida online desenvolvido como parte do projeto aplicado em Front-end. Ele oferece uma plataforma simples e eficiente para conectar restaurantes e clientes, permitindo a visualização de cardápios, o gerenciamento de pedidos e o acompanhamento de entregas em tempo real.

## Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Conjunto de ferramentas para facilitar o desenvolvimento com React Native.
- **Firebase**: Utilizado para autenticação, banco de dados (Firestore) e armazenamento (Storage).
- **Stripe**: Integração de pagamentos segura e simplificada.

## Funcionalidades

- **Autenticação de Usuário**: Login e cadastro de usuários utilizando autenticação segura via Firebase.
- **Carrinho de Compras**: Funcionalidade que permite adicionar, remover e visualizar itens no carrinho de compras.
- **Gestão de Pedidos**: Criação, atualização e acompanhamento de pedidos em tempo real.
- **Processamento de Pagamentos**: Integração com a API do Stripe para processar pagamentos.

## Instalação

Siga os passos abaixo para executar o projeto localmente:

1. Clone o repositório:

   
> git clone [[https://github.com/viniciusnxar/naporta](https://github.com/viniciusnxar/NaPorta-Mobile](https://github.com/viniciusnxar/NaPorta-mobile))

2. Instale as principais dependências:\
`
cd na-porta
npm install
yarn install
yarn add expo
` /

`
npx expo prebuild
npm install @expo-google-fonts/roboto
npx expo install react-native-status-bar-height
`
4. Instale as demais dependecias:

### Dependências Principais
`
npx expo install @expo-google-fonts/dm-sans @expo-google-fonts/roboto @expo-google-fonts/dm-serif-display @react-native-async-storage/async-storage @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage @react-navigation/bottom-tabs @react-navigation/native @react-navigation/native-stack expo expo-app-loading expo-image-picker expo-linear-gradient expo-splash-screen expo-status-bar expo-updates react react-dom react-native react-native-gesture-handler react-native-iphone-x-helper react-native-reanimated react-native-safe-area-context react-native-screens react-native-web styled-components react-native-status-bar-height
`
### Dependências de Desenvolvimento (devDependencies)
`npm install --save-dev @babel/core @types/react @types/react-native @types/styled-components-react-native babel-plugin-module-resolver typescript
`

4. Execute o servidor de desenvolvimento:
npx expo run
npx expo build:android

5. Abra o navegador e acesse http://localhost:3000.



## Estrutura do Projeto

    /@types: Contém arquivos TypeScript que definem tipos personalizados e interfaces utilizadas em todo o aplicativo, garantindo a segurança do tipo e facilitando a manutenção.
    /assets: Armazena recursos estáticos, como imagens, ícones e fontes utilizadas no aplicativo, centralizando os arquivos de ativos para melhor organização.
    /components: Componente reutilizáveis da interface do usuário, como botões e cartões de produtos, permitindo uma melhor organização do código e facilitando a reutilização.
    /hooks: Contém hooks personalizados que encapsulam a lógica de estado e efeitos colaterais, permitindo reutilização da lógica em diferentes componentes.
    /screens: Localiza as telas do aplicativo, com cada arquivo representando uma parte específica da interface do usuário, facilitando a navegação e manutenção do aplicativo.
    /theme: Contém definições de estilo, como cores e fontes, garantindo consistência visual e facilitando a implementação de alterações de estilo.

## Contribuição

Contribuições são bem-vindas! Se você quiser sugerir melhorias ou encontrar bugs, sinta-se à vontade para abrir um issue ou enviar um pull request.
