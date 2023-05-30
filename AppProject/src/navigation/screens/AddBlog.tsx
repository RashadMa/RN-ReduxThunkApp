import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../App';
import { addBlog } from '../../redux/store/crudSlice';

interface FormData {
      title: string;
      avatar: string;
      description: string;
}
const AddBlog = ({ navigation }: any) => {
      const [formData, setFormData] = useState<FormData>({
            title: "Example Blog",
            avatar: "https://loremflickr.com/640/480/nightlife",
            description:
                  "Consequatur beatae quaerat. Animi eius quibusdam iure reiciendis labore exercitationem assumenda ducimus. Nulla molestias sequi. Tempora alias deleniti temporibus fugit ratione officia quo.",
      });

      const theme = useSelector((state: RootState) => state.theme.theme);
      let dispatch = useDispatch<AppDispatch>()

      const handleChange = (key: keyof FormData, value: string) => {
            setFormData((prevFormData) => ({
                  ...prevFormData,
                  [key]: value,
            }));
      };

      const handleAddBlog = () => {
            dispatch(
                  addBlog({
                        title: formData.title,
                        avatar: formData.avatar,
                        description: formData.description,
                  })
            )
            navigation.navigate('bloglist')
      }

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
      });

      return (
            <SafeAreaView style={styles.container}>
                  <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('bloglist')}><Text style={{ color: 'white' }}>Go Back</Text></TouchableOpacity>
                  <View>
                        <TextInput
                              style={styles.input}
                              value={formData.title}
                              onChangeText={(value) => handleChange('title', value)}
                              placeholder="title"
                        />
                        <TextInput
                              style={styles.input}
                              value={formData.avatar}
                              onChangeText={(value) => handleChange('avatar', value)}
                              placeholder="avatar"
                        />
                        <TextInput
                              style={styles.input}
                              value={formData.description}
                              onChangeText={(value) => handleChange('description', value)}
                              placeholder="description"
                              placeholderTextColor={theme === 'light' ? 'black' : 'white'}
                        />
                        <TouchableOpacity style={styles.goBackButton} onPress={handleAddBlog}><Text style={{ color: 'white' }}>Add Blog</Text></TouchableOpacity>
                  </View>
            </SafeAreaView>
      );
};

export default AddBlog;
