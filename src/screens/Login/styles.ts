import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  h1: {
    color: '#000',
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  h2: {
    color: '#999',
    fontSize: 15,
  },
  inputArea: {
    width: '100%',
    paddingTop: 20,
  },
  inputlabel: {
    color: '#777',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#DDD',
    fontSize: 15,
    padding: 10,
    color: '#000',
  },
  aditionals: {
    width: '100%',
  },
  forgotBtnArea: {
    paddingVertical: 20,
    alignSelf: 'flex-end',
  },
  forgotBtntext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4162b7',
  },
  button: {
    backgroundColor: '#4162b7',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  signUpArea: {
    flexDirection: 'row',
    marginTop: 30,
  },
  signUpText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#999',
  },
  signUpBtnText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#4162b7',
    marginLeft: 5,
  },
  footerArea: {
    marginVertical: 30,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
