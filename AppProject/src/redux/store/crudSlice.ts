// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import axios from 'axios';

// const url = 'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/';

// export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async () => {
//   const response = await axios.get(url);
//   return response.data;
// });

// export const addNewBlog = createAsyncThunk(
//   'blogs/addNewBlog',
//   async (newBlog: any) => {
//     const response = await axios.post(url, newBlog);
//     return response.data;
//   },
// );

// export const updateBlog = createAsyncThunk(
//   'blogs/updateBlog',
//   async (updatedBlog: any) => {
//     const response = await axios.put(url + updatedBlog.id, updatedBlog);
//     return response.data;
//   },
// );

// // export const deleteBlog = createAsyncThunk(
// //   'blogs/deleteBlog',
// //   async (item: any, {rejectWithValue}) => {
// //     try {
// //       await axios.delete(url + item.id);
// //       return item;
// //     } catch (error) {
// //       return rejectWithValue('Error');
// //     }
// //   },
// // );

// export const deleteBlog = createAsyncThunk(
//   'blog/deleteBlog',
//   async (blogId: string) => {
//     await axios.delete(
//       `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${blogId}`,
//     );
//     return blogId;
//   },
// );

// interface BlogState {
//   blogs: any[];
//   loading: boolean;
//   error: any;
// }

// const initialState: BlogState = {
//   blogs: [],
//   loading: true,
//   error: '',
// };

// const blogSlice = createSlice({
//   name: 'blogs',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder.addCase(getAllBlogs.pending, (state, action) => {
//       state.blogs = [];
//       state.loading = true;
//     });
//     builder.addCase(getAllBlogs.fulfilled, (state, action) => {
//       state.blogs = action.payload;
//       state.loading = false;
//     });
//     builder.addCase(getAllBlogs.rejected, (state, action) => {
//       state.blogs = [];
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(addNewBlog.pending, (state, action) => {
//       state.loading = true;
//     });
//     builder.addCase(addNewBlog.fulfilled, (state, action) => {
//       state.blogs.push(action.payload);
//       state.loading = false;
//     });
//     builder.addCase(addNewBlog.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     builder.addCase(updateBlog.pending, (state, action) => {
//       state.loading = true;
//     });
//     builder.addCase(updateBlog.fulfilled, (state, action) => {
//       const index = state.blogs.findIndex(
//         blog => blog.id === action.payload.id,
//       );
//       if (index !== -1) {
//         state.blogs[index] = action.payload;
//         state.loading = false;
//       }
//     });
//     builder.addCase(updateBlog.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
//     // builder.addCase(deleteBlog.pending, (state, action) => {
//     //   state.blogs = [];
//     //   state.loading = true;
//     // })
//     builder.addCase(deleteBlog.fulfilled, (state, action) => {
//       const blogId = action.payload;
//       state.blogs = state.blogs.filter((blog) => blog.id !== blogId);
//     });
//     // builder.addCase(deleteBlog.rejected, (state, action) => {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // });
//   },
// });

// export default blogSlice.reducer;

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/';

// interface Blog {
//   id: string;
//   title: string;
//   content: string;
// }

interface BlogState {
  blogs: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  status: 'idle',
  error: null,
};

export const getAllBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addBlog = createAsyncThunk('blog/addBlog', async (blog: any) => {
  const response = await axios.post(url, blog);
  return response.data;
});

export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async (blog: any) => {
    const response = await axios.put(url + blog.id, blog);
    return response.data;
  },
);

export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (blogId: string) => {
    await axios.delete(url + blogId);
    return blogId;
  },
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllBlogs.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.blogs = action.payload;
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Failed to fetch blogs';
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      const updatedBlog = action.payload;
      const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
      if (index !== -1) {
        state.blogs[index] = updatedBlog;
      }
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      const blogId = action.payload;
      state.blogs = state.blogs.filter(blog => blog.id !== blogId);
    });
  },
});

export default blogSlice.reducer;
