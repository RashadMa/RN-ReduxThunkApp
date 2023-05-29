import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
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

      let { BlogReducer } = useSelector<RootState, any>(state => state);

      useEffect(() => {
            dispatch(getAllBlogs())
      }, [])

      const handleDeleteBlog = (blog: any) => {
            dispatch(deleteBlog(blog.id));
      };

      const renderItem = ({ item }: any) => {
            return <>
                  <View style={styles.blogWrapper}>
                        <Text style={[styles.blogs, styles.text]}>{item.title}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteBlog(item)}><Text style={[styles.buttonText, styles.text]}>Delete</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('editblog', item)}><Text style={[styles.buttonText, styles.text]}>Edit</Text></TouchableOpacity>
                  </View>
            </>
      }

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
      });

      return (
            <SafeAreaView style={styles.container}>
                  <TouchableOpacity style={styles.addBlogButton} onPress={toggleTheme}>
                        <Text style={styles.text}>Toggle Theme</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBlogButton} onPress={() => navigation.navigate('addblog')}>
                        <Text style={[styles.addBlogText, styles.text]}>Add Blog</Text>
                  </TouchableOpacity>
                  {
                        BlogReducer.loading ? <Text style={{ fontSize: 30 }}>Loading...</Text> : <FlatList
                              showsVerticalScrollIndicator={false}
                              data={BlogReducer.blogs}
                              renderItem={renderItem}
                        />
                  }
            </SafeAreaView>
      )
}

export default BlogList