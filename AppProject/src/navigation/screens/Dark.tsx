// AppContainer.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../App';
import { Theme, setTheme } from '../../redux/store/ThemeSlice';
// import { RootState } from './store';

const AppContainer = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? 'white' : 'black',
    },
    text: {
      color: theme === 'light' ? 'black' : 'white',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello, Dark Mode!</Text>

      <TouchableOpacity onPress={toggleTheme}>
      <View>
        <Text>Toggle Theme</Text>
      </View>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppContainer;
