/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Dialog, Overlay} from '@rneui/themed';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {NavigationProps} from '../../interfaces/INavigate';
import {styles} from './styles';

export default () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProps>();
  const userId = auth().currentUser?.uid;

  const deleteFirestoreData = async () => {
    try {
      await firestore().collection('users').doc(userId).delete();
      console.log('Documento do Firestore excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir documento do Firestore: ', error);
    }
  };

  const deleteRealtimeDatabaseData = async () => {
    try {
      await database().ref(`/users/${userId}`).remove();
      console.log('Dados do Realtime Database excluídos com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir dados do Realtime Database: ', error);
    }
  };

  const deleteUser = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await user.delete();
        console.log('Usuário excluído com sucesso.');
      } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setVisible1(true);
      await auth().signOut();
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error: any) {
      console.log(error.code);
      Alert.alert('Falha ao fazer Logout');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      setVisible2(false);
      // Excluir dados do Firestore
      await deleteFirestoreData();

      // Excluir dados do Realtime Database
      await deleteRealtimeDatabaseData();

      // Excluir usuário autenticado
      await deleteUser();

      console.log('Conta e todos os dados excluídos com sucesso.');
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {
      console.error('Erro ao excluir conta e dados: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Overlay isVisible={loading} overlayStyle={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Overlay>
      <Text style={styles.title}>Configuração da Conta</Text>

      <TouchableHighlight
        onPress={() => setVisible1(true)}
        underlayColor="transparent">
        <Text style={styles.button}>Deseja sair da conta?</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => setVisible2(true)}
        underlayColor="transparent">
        <Text style={styles.button}>Deseja deletar a conta?</Text>
      </TouchableHighlight>
      <Dialog isVisible={visible1}>
        <Dialog.Title title="Escolha uma opção" titleStyle={{color: '#000'}} />
        <Text style={styles.titleModal}>Deseja mesmo sair da conta?</Text>
        <TouchableHighlight onPress={handleLogout} underlayColor="transparent">
          <Text style={styles.button}>SIM</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setVisible1(false)}
          underlayColor="transparent">
          <Text style={styles.buttonModal2}>NÃO</Text>
        </TouchableHighlight>
      </Dialog>
      <Dialog isVisible={visible2}>
        <Dialog.Title title="Escolha uma opção" titleStyle={{color: '#000'}} />
        <Text style={styles.titleModal}>Deseja mesmo deletar a conta?</Text>
        <TouchableHighlight
          onPress={handleDeleteAccount}
          underlayColor="transparent">
          <Text style={styles.button}>SIM</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setVisible2(false)}
          underlayColor="transparent">
          <Text style={styles.buttonModal2}>NÃO</Text>
        </TouchableHighlight>
      </Dialog>
    </View>
  );
};
