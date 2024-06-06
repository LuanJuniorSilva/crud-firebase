/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../interfaces/INavigate';
import auth from '@react-native-firebase/auth';

const Preload = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const user = auth().currentUser;
    StackActions.popToTop();

    if (!user?.email) {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } else {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    }
  }, []);

  return null;
};

export default Preload;
