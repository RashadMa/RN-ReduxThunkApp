import {createSlice, Action} from '@reduxjs/toolkit';

interface MyData {
  title: string;
  description: string;
  id: string;
}

interface MyState {
  data: MyData | null;
  isLoading: boolean;
  error: string | null;
}

interface SaveDataAction extends Action {
  type: string;
  payload: MyData;
}

const initialState: MyState = {
  data: null,
  isLoading: false,
  error: null,
};

const saveSlice = createSlice({
  name: 'save',
  initialState,
  reducers: {
    saveData: (state: MyState, action: SaveDataAction) => {
      state.isLoading = true;
      state.error = null;
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export const {saveData} = saveSlice.actions;
export default saveSlice.reducer;
