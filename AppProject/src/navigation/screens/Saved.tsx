import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../App'

const Saved = () => {
  let dispatch = useDispatch<AppDispatch>()
  const savedData = useSelector((state: RootState) => state.SaveReducer.data);
  console.log(savedData);
  return (
    <View>
      {savedData ? (
        <View>
          <Text>Saved Data:</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Name: {savedData.id}</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Title: {savedData.title}</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Description: {savedData.description}</Text>
        </View>
      ) : (
        <Text>No data saved yet</Text>
      )}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})