import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BlogList from '../screens/BlogList';
import AddBlog from '../screens/AddBlog';
const Home = createNativeStackNavigator();

const BlogStack = () => {
      return (
            <Home.Navigator screenOptions={{ headerShown: false }}>
                  <Home.Screen name="bloglist" component={BlogList} />
                  <Home.Screen name="addblog" component={AddBlog} />
                  {/* <Home.Screen name="editblog" component={EditBlog} /> */}
            </Home.Navigator>

      )
}

export default BlogStack

const styles = StyleSheet.create({})