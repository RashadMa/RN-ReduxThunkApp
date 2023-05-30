import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../App'
import { removeSave } from '../../redux/store/SaveSlice'

const Saved = () => {
  let dispatch = useDispatch<AppDispatch>()
  // const savedData = useSelector((state: RootState) => state.SaveReducer.data);
  const save = useSelector((state: RootState) => state.save.save);
 

  useEffect(() => {
    save.map((item: any) => {
      item.map((saved: any) => {
        console.log(saved.title);
      })
    })
  }, [])

  const handleDelete = (item: any) => {
    dispatch(removeSave(item));
  };




  const renderItem = ({ item }: any) => {
    return (
      <>
        <View>
          <Text>{item.save}</Text>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </>


    );
  };

  return (
    <View>

      {
        // <FlatList
        //   data={save.map((item: any) => {

        //   })}
        //   renderItem={renderItem}
        // />

        save.map((item: any) => (
          item.map((saved: any) => (
            <View>
              <Text>{saved.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(saved)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        ))
      }

      {/* {save ? (
        <View>
          <Text>Saved Data:</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Name: {save.id}</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Title: {save.title}</Text>
          <Text style={{ borderWidth: 1, padding: 5, borderRadius: 5, borderColor: "lightgrey", marginBottom: 10 }}>Description: {save.description}</Text>
        </View>
      ) : (
        <Text>No data saved yet</Text>
      )} */}
    </View>
  )
}

export default Saved

const styles = StyleSheet.create({})