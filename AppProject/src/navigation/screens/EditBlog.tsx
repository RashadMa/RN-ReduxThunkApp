import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../App'
import { updateBlog } from '../../redux/store/crudSlice'

const EditBlog = ({ navigation, route }: any) => {
      let item = route.params
      const [title, setTitle] = useState<any>(item.title);
      const [description, setDescription] = useState<any>(item.description);
      let dispatch = useDispatch<AppDispatch>()
      const theme = useSelector((state: RootState) => state.theme.theme);
      const handleUpdateBlog = () => {
            const data = {
                  id: item.id,
                  title: title,
                  description: description,
            };
            dispatch(updateBlog(data));
            navigation.goBack();
      }
      console.log("salam");
      

      const styles = StyleSheet.create({
            container: {
                  flex: 1,
                  backgroundColor: theme === 'light' ? 'white' : 'black',
            },
            text: {
                  color: theme === 'light' ? 'black' : 'white',
            },
            input: {
                  height: 40,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                  marginBottom: 12,
                  paddingHorizontal: 8,
                  borderRadius: 10,
                  color: theme === 'light' ? 'black' : 'white',
            },
            goBackButton: {
                  backgroundColor: "#42b5d7",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  alignItems: 'center',
                  width: 100,
            }
      })

      return (
            <SafeAreaView style={styles.container}>
                  <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('bloglist')}><Text style={{ color: "white" }}>Go Back</Text></TouchableOpacity>
                  <View>
                        <TextInput
                              style={styles.input}
                              value={title}
                              onChangeText={setTitle}
                              placeholder="Title"
                        />
                        <TextInput
                              style={styles.input}
                              value={description}
                              onChangeText={setDescription}
                              placeholder="Title"
                        />
                        <TouchableOpacity style={styles.goBackButton} onPress={() => handleUpdateBlog()}><Text style={{ color: "white" }}>Submit</Text></TouchableOpacity>
                  </View>
            </SafeAreaView>
      )
}

export default EditBlog