import { NavigationContainer } from '@react-navigation/native'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import BlogReducer from './src/redux/store/crudSlice'
import ThemeReducer from './src/redux/store/ThemeSlice'
import SaveReducer, { saveSlice } from './src/redux/store/SaveSlice'
import TabMain from './src/navigation/TabMain'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const store = configureStore({
  reducer: {
    BlogReducer,
    theme: ThemeReducer,
    // SaveReducer,
    save: saveSlice.reducer,
  }
})

// AsyncStorage.clear()

const App = () => {
  return (
    <Provider store={store}  >
      <NavigationContainer>
        <TabMain />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})