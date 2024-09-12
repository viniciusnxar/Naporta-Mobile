@echo off
echo Instalando dependencias yarn...
yarn add babel-plugin-module-resolver -D
yarn add react-native-reanimated
yarn add styled-components
yarn add @types/styled-components-react-native -D
yarn add react-native-iphone-x-helper
yarn add @react-native-firebase/app
yarn add @react-native-firebase/firestore
yarn add @react-native-firebase/auth
yarn add @react-native-async-storage/async-storage
yarn add react-native-dotenv

echo Instalação concluida!
pause