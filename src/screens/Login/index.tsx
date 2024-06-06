import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {NavigationProps} from '../../interfaces/INavigate';
import {Overlay} from '@rneui/themed';

export default () => {
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const handleForgetButton = () => {};

  const handleLoginButton = async () => {
    try {
      if (!emailField) {
        return Alert.alert('O e-mail é obrigatório');
      }
      if (!passwordField) {
        return Alert.alert('A senha é obrigatória');
      }

      setLoading(true);
      await auth().signInWithEmailAndPassword(emailField, passwordField);
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } catch (error: any) {
      console.log('falha no login', error.code);
      Alert.alert('Por favor digite os dados corretamente!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Overlay isVisible={loading} overlayStyle={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Overlay>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}>Sistem de Login</Text>
        <Text style={styles.h2}>Bem vindo(a)! Digite seus dados abaixo.</Text>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu email"
            placeholderTextColor="#999"
            onChangeText={t => setEmailField(t)}
            value={emailField}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Senha</Text>
          <TextInput
            style={styles.inputField}
            placeholder="********"
            secureTextEntry
            value={passwordField}
            onChangeText={t => setPasswordField(t)}
          />
        </View>
        <View style={styles.aditionals}>
          <TouchableOpacity
            style={styles.forgotBtnArea}
            onPress={handleForgetButton}>
            <Text style={styles.forgotBtntext}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLoginButton}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.signUpArea}>
          <Text style={styles.signUpText}>Não tem uma conta?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Text style={styles.signUpBtnText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Luan</Text>
        </View>
      </View>
    </ScrollView>
  );
};
