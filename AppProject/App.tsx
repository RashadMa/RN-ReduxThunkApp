import { NavigationContainer } from '@react-navigation/native'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import BlogStack from './src/navigation/stacks/BlogStack'
import BlogReducer from './src/redux/store/crudSlice'
import ThemeReducer from './src/redux/store/ThemeSlice'
import MyComponent from './src/navigation/screens/Dark'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const store = configureStore({
  reducer: {
    BlogReducer,
    theme :ThemeReducer
  }
})

const App = () => {
  return (
    <Provider store={store}  >
      <NavigationContainer>
        <BlogStack />
        {/* <MyComponent /> */}
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})