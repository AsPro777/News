import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { store } from './app/store.js';
import './index.css';
import { addNews,delNews,selectNews,myThunk } from './app/newsSlice';


function App() {
	const [showForm , setShowForm] = useState(false);
	const [newTitle , setNewTitle] = useState('');
	const [newName , setNewName] = useState('');
	const [newLastname , setNewLastname] = useState('');
	const [newDisc , setNewDisc] = useState('');
	const [lastId , setLastId] = useState(0);
	const [count , setCount] = useState(0);

  const loadNews=useSelector(selectNews);
  const dispatch=useDispatch();

  useEffect(() => {
      dispatch(myThunk());
    }, []);


    function Article(props) {
      const items=props.items;
      setLastId(props.items.length);
      setCount(props.items.length);
        const newsItems=items.map((art,ind) =>
        <NewsItem key={art.id.toString()}
                      id={ind}
                  title={art.title}
              created={art.created_at}
            author={art.author}
            description={art.description}/>);
      
      return ( 
              <div>
            <button className='but'
                  onClick={()=>{ setShowForm(true); }}
          >Добавить новость</button>
                {newsItems}
          </div>
                );
      }

      function NewsItem(props) {
        let dat1=props.created.split('T');
          let dat2=dat1[1].split(':'); 
         
        return (
        <div>
          <div>
            <h1 className='head'>{props.title}</h1>
          <div className='head'>{dat1[0]} {dat2[0]}:{dat2[1]}</div>
          <div className='head'>От {props.author.name} {props.author.lastname}</div>
          <div className='head'>{props.description}</div>
          <div className='line'></div>
          </div>
          <div>
            <button data-id={props.id} onClick={(event)=>{
             setCount(count-1);
             let atrId=event.target.getAttribute('data-id');
             dispatch(delNews(atrId));
            }}>Удалить</button>
          </div>
        </div>
        )
       }
    
       function formAddNews() {
        if(showForm==false) return <div></div>
        else 
           return (<form>
                     <div className='formAdd'>
                     <label className='addNewsLab'>Название - 
                 <input type='text' 
                      value={newTitle}
                    onChange={(event)=> {setNewTitle(event.target.value);}}/>
               </label>
                 <label className='addNewsLab' >Имя создателя - 
                 <input type='text' 
                      value={newName}
                      onChange={(event)=> {setNewName(event.target.value);}}/>
               </label>
                 <label className='addNewsLab'>Фамилия создателя - 
                 <input type='text' 
                      value={newLastname}
                    onChange={(event)=> {setNewLastname(event.target.value);}}/>
               </label>
                 <label className='addNewsLab'>Содержимое - 
                 <input type='text' 
                      value={newDisc}
                    onChange={(event)=> {setNewDisc(event.target.value);}}/>
               </label>
                 <button className='addNewsBut' onClick={()=>{
                 setCount(count+1);
                 const obj=setNewObj();
                 dispatch(addNews(obj));
                 setNewDisc('');
                 setNewLastname('');
                 setNewName('');
                 setNewTitle('');
                 setShowForm(false)}}>Принять</button>
             </div>
                </form>)
        }   

        function setNewObj(){
          let newObj={}; 
          let dat=new Date();
          let datNews=dat.toISOString(); 
        
            newObj={
            'id': lastId+1,
            'author': {
                      'name': newName,
                  'lastname': newLastname
            },
            'created_at': datNews,
                'description': newDisc,
                'title': newTitle		
          };
          setLastId(lastId+1);
          return newObj;
           }    
console.log(111);
    return <div> 
      {
      ((loadNews!==null) && (loadNews!==undefined) && (JSON.stringify(loadNews)!=='{}')) ? 
        <>
          {formAddNews()}
          <Article items={loadNews}/>
          <div>Всего: {count}</div>
        </>  
        :
        <></>}
     
    </div>;
    
}


/*const mapStateToProps=(state)=>({items:state.items});

export default connect (mapStateToProps) (App);*/
export default App
