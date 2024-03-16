import TranslateText, {
    TranslateLanguage,
  } from '@react-native-ml-kit/translate-text';
import { Text } from 'react-native';


   const transalateComponent = async() =>{

    const translatedText = await TranslateText.translate({
        text: 'مرحبا بالعالم',
        sourceLanguage: TranslateLanguage.JAPANESE,
        targetLanguage: TranslateLanguage.ENGLISH,
        downloadModelIfNeeded: true,
      });

      console.log(translatedText);
   }

   export default transalateComponent
  
 

