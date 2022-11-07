import axios from 'axios';
import { addNews,delNews,loaded,selectNews } from '../app/newsSlice';
import { useSelector, useDispatch, connect } from 'react-redux';

export async function myThunk(dispatch , getState){
   
   /* const response = await client.get ('https://test-api-app-for-react.herokuapp.com/api/v1/news');*/
   const response = await axios.get('https://test-api-app-for-react.herokuapp.com/api/v1/news');
    dispatch(loaded(response.data.data.articles));
}