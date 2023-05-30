import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogStack from './stacks/BlogStack';
import Saved from './screens/Saved';
const Tab = createBottomTabNavigator();
const TabMain = () => {
      return (
            <>
                  <Tab.Navigator>
                        <Tab.Screen name='Home' component={BlogStack} />
                        <Tab.Screen name='Saved' component={Saved} />
                  </Tab.Navigator>
            </>
      )
}

export default TabMain

const styles = StyleSheet.create({})