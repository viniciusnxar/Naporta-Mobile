@echo off
echo Instalando dependencias npm...
npm i expo 
npm i react-native
npx expo install @expo-google-fonts/roboto --force
npx expo install expo-image-picker
npx expo install expo-app-loading --force
npx expo install expo-linear-gradient --force
npx expo install react-native-gesture-handler --force
npx expo install @react-native-firebase/app --force
npx expo install @react-native-firebase/firestore --force
npx expo install @react-native-firebase/auth --force
npx expo install @react-native-firebase/storage
npx expo install @react-navigation/native
npx expo install expo-image-picker
npx expo install expo-status-bar

echo Instalação concluida!
pause

