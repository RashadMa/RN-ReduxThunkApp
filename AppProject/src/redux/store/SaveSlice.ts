// import {createSlice, Action} from '@reduxjs/toolkit';

// interface MyData {
//   title: string;
//   description: string;
//   id: string;
// }

// interface MyState {
//   data: MyData | null;
//   isLoading: boolean;
//   error: string | null;
// }

// interface SaveDataAction extends Action {
//   type: string;
//   payload: MyData;
// }

// const initialState: MyState = {
//   data: null,
//   isLoading: false,
//   error: null,
// };

// const saveSlice = createSlice({
//   name: 'save',
//   initialState,
//   reducers: {
//     saveData: (state: MyState, action: SaveDataAction) => {
//       state.isLoading = true;
//       state.error = null;
//       state.data = action.payload;
//       state.isLoading = false;
//     },
//   },
// });

// export const {saveData} = saveSlice.actions;
// export default saveSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SaveState {
  save: any;
}

const initialState: SaveState = {
  save: [],
};

export const getSaves = createAsyncThunk('save/getSaves', async () => {
  const response = await AsyncStorage.getItem('save');
  if (response) {
    return response;
  }
  return [];
});

export const setSaves = createAsyncThunk(
  'save/setSaves',
  async (save: any[]) => {
    try {
      const existingSaveItem = await AsyncStorage.getItem('save');
      const existingSaveArr = existingSaveItem
        ? JSON.parse(existingSaveItem)
        : [];
      const updatedSaves = [...existingSaveArr, ...save];
      await AsyncStorage.setItem('save', JSON.stringify(updatedSaves));
      return updatedSaves;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
);

export const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    addSave: (state, action) => {
      state.save.push(action.payload);
    },
    removeSave: (state, action) => {
      state.save = state.save.filter(
        (item: {id: any}) => item.id !== action.payload.id,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getSaves.pending, () => {})
      .addCase(getSaves.fulfilled, (state: any, action) => {
        state.save = action.payload;
      })
      .addCase(getSaves.rejected, () => {})
      .addCase(setSaves.pending, () => {})
      .addCase(setSaves.fulfilled, (state, action) => {
        state.save = action.payload;
      })
      .addCase(setSaves.rejected, () => {});
  },
});

export const {addSave, removeSave} = saveSlice.actions;
export default saveSlice.reducer;
