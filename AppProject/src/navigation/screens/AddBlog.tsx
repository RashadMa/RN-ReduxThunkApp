import React from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { AppDispatch } from '../../../App';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../redux/store/crudSlice';

interface FormData {
      title: string;
      avatar: string;
      description: string;
}
const AddBlog = ({ navigation }: any) => {
      const [formData, setFormData] = React.useState<FormData>({
            title: "Example Blog",
            avatar: "https://loremflickr.com/640/480/nightlife",
            description:
                  "Consequatur beatae quaerat. Animi eius quibusdam iure reiciendis labore exercitationem assumenda ducimus. Nulla molestias sequi. Tempora alias deleniti temporibus fugit ratione officia quo.",
      });
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

      return (
            <SafeAreaView style={styles.container}>
                  <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('bloglist')}><Text style={{ color: "white" }}>Go Back</Text></TouchableOpacity>
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
                        />
                        <TouchableOpacity style={styles.goBackButton} onPress={handleAddBlog}><Text style={{ color: "white" }}>Add Blog</Text></TouchableOpacity>
                  </View>
            </SafeAreaView>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
            margin: 15,
      },
      input: {
            height: 40,
            borderColor: 'lightgray',
            borderWidth: 1,
            marginBottom: 12,
            paddingHorizontal: 8,
            borderRadius: 10,
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

export default AddBlog;
