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
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {Overlay} from '@rneui/themed';

import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {NavigationProps} from '../../interfaces/INavigate';
import {RadioButton, Text as TextRadio} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {calculateAge, dateFormatter} from '../../utils/calculateAge';

export default () => {
  const [nameField, setNameField] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [sexo, setSexo] = useState('Masculino');
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const handleCreate = async () => {
    const {age} = calculateAge(date);
    if (!nameField) {
      return Alert.alert('O Nome é obrigatório');
    }
    if (!emailField) {
      return Alert.alert('O E-mail é obrigatório');
    }
    if (!passwordField) {
      return Alert.alert('A Senha é obrigatório');
    }
    if (age < 18) {
      return Alert.alert('Você precisa ter pelo menos 18 anos');
    }

    try {
      setLoading(true);

      const {user} = await auth().createUserWithEmailAndPassword(
        emailField,
        passwordField,
      );
      const data = {
        name: nameField,
        email: user.email,
        age,
        dataNascFull: date,
        dataNasc: dateFormatter(date),
        password: passwordField,
        sexo,
      };
      await firestore().collection('users').doc(user.uid).set(data);
      await database().ref(`/users/${user.uid}`).set(data);

      navigation.navigate('Home');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Este e-mail já existe!');
      }

      if (error.code === 'auth/invalid-email') {
        Alert.alert('Este e-mail é inválido!');
      }

      console.error(error);
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
        <Text style={styles.h1}>Sistem de Cadastro</Text>
        <Text style={styles.h2}>Bem vindo(a)! Digite seus dados abaixo.</Text>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Nome</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
            onChangeText={t => setNameField(t)}
            value={nameField}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Sexo</Text>
          <RadioButton.Group
            onValueChange={value => setSexo(value)}
            value={sexo}>
            <View style={styles.fieldRadio}>
              <RadioButton value="Masculino" />
              <TextRadio>Masculino</TextRadio>
              <RadioButton value="Feminino" />
              <TextRadio>Feminino</TextRadio>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Data de Nascimento</Text>
          <DatePicker
            mode="date"
            date={date}
            onDateChange={setDate}
            locale="pt-BR"
            theme="auto"
          />
        </View>
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
            placeholderTextColor="#999"
            secureTextEntry
            value={passwordField}
            onChangeText={t => setPasswordField(t)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Luan</Text>
        </View>
      </View>
    </ScrollView>
  );
};
