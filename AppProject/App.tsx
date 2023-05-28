import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './src/redux/store/crudSlice'
import BlogStack from './src/navigation/stacks/BlogStack'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const store = configureStore({
  reducer: {
    BlogReducer
  }
})

const App = () => {
  return (
    <Provider store={store}  >
      <NavigationContainer>
        <BlogStack />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})