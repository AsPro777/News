import { configureStore, createReducer,createSlice } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

export const store = configureStore({reducer: {news:newsReducer} , middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)})
