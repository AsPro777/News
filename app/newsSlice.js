import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const newsSlice=createSlice({
    name: 'news',
    initialState: {
      items:[],
      status: 'none',
      error: null
    },
    reducers: {
        addNews:(state,action)=>{  
          state.items.push(action.payload) },
        delNews:(state,action)=>{ 
          state.items.splice(action.payload, 1); },
    },
    extraReducers(builder) {
      builder
        .addCase(myThunk.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(myThunk.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.items = action.payload;
        })
        .addCase(myThunk.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
})

export const myThunk = createAsyncThunk(
    'news/myThunk',
    async () => {
      const response = await axios.get('https://test-api-app-for-react.herokuapp.com/api/v1/news');  
      return response.data.data.articles;
    }
  );

export const {  addNews, delNews}=newsSlice.actions;

export const selectNews=state=>state.news.items;

export default newsSlice.reducer;