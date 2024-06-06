import React, {useState, useEffect} from 'react';
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
import {Overlay} from '@rneui/themed';

import {styles} from './styles';
import {RadioButton, Text as TextRadio} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {
  calculateAge,
  convertDateUTC,
  dateFormatter,
} from '../../utils/calculateAge';

export default () => {
  const [nameField, setNameField] = useState<string>('');
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const [sexo, setSexo] = useState('Masculino');
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const user = auth().currentUser;

  useEffect(() => {
    const userRef = database().ref(`/users/${user?.uid}`);
    userRef.on('value', snapshot => {
      // once normal e on em tempo real
      // setUserData(snapshot.val());
      console.log('newData', snapshot.val());
      const newUserEdit: any = snapshot.val();
      if (snapshot.val()) {
        setNameField(newUserEdit.name);
        setEmailField(newUserEdit.email);
        setPasswordField(newUserEdit.password);
        setSexo(newUserEdit.sexo);
        setDate(convertDateUTC(newUserEdit.dataNasc));
      }
    });
  }, []);

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
      const data = {
        name: nameField,
        email: emailField,
        age, // Para deletar esse dados apenas não passar a informação ou deixar null
        dataNascFull: date,
        dataNasc: dateFormatter(date),
        password: passwordField,
        sexo,
      };
      await database().ref(`/users/${user?.uid}`).set(data);

      Alert.alert('Dados alterados com sucesso!');
    } catch (error: any) {
      Alert.alert('Não foi possivel alterar os dados');

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
        <Text style={styles.h1}>Edição no Realtime Database</Text>
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
            editable={false}
          />
        </View>
        <View style={styles.inputArea}>
          <Text style={styles.inputlabel}>Senha</Text>
          <TextInput
            style={styles.inputField}
            placeholder="********"
            placeholderTextColor="#999"
            editable={false}
            value={passwordField}
            onChangeText={t => setPasswordField(t)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Editar Dados</Text>
        </TouchableOpacity>
        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Luan</Text>
        </View>
      </View>
    </ScrollView>
  );
};
