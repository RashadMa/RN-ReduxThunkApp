import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../App';
import { deleteBlog, getAllBlogs, } from '../../redux/store/crudSlice';
import { Theme, setTheme } from '../../redux/store/ThemeSlice';

const BlogList = ({ navigation }: any) => {
      let dispatch = useDispatch<AppDispatch>()
      const theme = useSelector((state: RootState) => state.theme.theme);
      const toggleTheme = () => {
            const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
            dispatch(setTheme(newTheme));
      };
      const [searchItems, setSearchItems] = useState('');

      let { BlogReducer } = useSelector<RootState, any>(state => state);

      useEffect(() => {
            dispatch(getAllBlogs());
      }, [])

      const handleDeleteBlog = (blog: any) => {
            dispatch(deleteBlog(blog.id));
      };

      const renderItem = ({ item }: any) => {
            return <>
                  <View style={styles.blogWrapper}>
                        <Text style={[styles.blogs, styles.text]}>{item.title}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBlog(item)}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editblog', item)}><Text style={styles.buttonText}>Edit</Text></TouchableOpacity>
                  </View>
            </>
      }

      const filteredData = BlogReducer.blogs.filter((item: { title: string; }) =>
            item.title.toLowerCase().includes(searchItems.toLowerCase()),
      );

      const styles = StyleSheet.create({
            container: {
                  flex: 1,
                  backgroundColor: theme === 'light' ? 'white' : 'black',
            },
            text: {
                  color: theme === 'light' ? 'black' : 'white',
            },
            blogs: {
                  fontSize: 14,
                  width: "60%",
            },
            blogWrapper: {
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
            },
            deleteButton: {
                  backgroundColor: "#ff3a31",
                  borderRadius: 5,
            },
            buttonText: {
                  color: 'white',
                  padding: 8,
            },
            editButton: {
                  backgroundColor: "#ed9e32",
                  borderRadius: 5,
            },
            addBlogButton: {
                  backgroundColor: "#42b5d7",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 10,
                  alignItems: 'center'
            },
            addBlogText: {
                  color: 'white',
                  fontSize: 17,
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
      });

      return (
            <SafeAreaView style={styles.container}>
                  <TouchableOpacity style={styles.addBlogButton} onPress={toggleTheme}>
                        <Text style={{ color: 'white' }}>Toggle Theme</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBlogButton} onPress={() => navigation.navigate('addblog')}>
                        <Text style={styles.addBlogText}>Add Blog</Text>
                  </TouchableOpacity>
                  <TextInput
                        placeholder="Search"
                        placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
                        style={styles.input}
                        value={searchItems}
                        onChangeText={setSearchItems}
                  />
                  {
                        filteredData.length === 0 ? (
                              <Text>There is no any blog</Text>
                        ) : (
                              <FlatList
                                    refreshing={false}
                                    data={filteredData}
                                    renderItem={renderItem}
                                    keyExtractor={(item: any) => item.id}
                                    showsVerticalScrollIndicator={false}
                              />
                        )
                  }
            </SafeAreaView>
      )
}

export default BlogList