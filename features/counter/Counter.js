import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

function Counter(props) {
  const [isLoaded, setIsLoaded] = useState(false);
	const [showForm , setShowForm] = useState(false);
	const [newTitle , setNewTitle] = useState('');
	const [newName , setNewName] = useState('');
	const [newLastname , setNewLastname] = useState('');
	const [newDisc , setNewDisc] = useState('');
	const [lastId , setLastId] = useState(0);
	const [count , setCount] = useState(0);
	
	let news=[];

  useEffect(() => {
    fetch("https://test-api-app-for-react.herokuapp.com/api/v1/news")
      .then(res => res.json())
      .then(
        (result) => {
		  
          setIsLoaded(true);

		  result.data.articles.map((item,i)=>{addNews(item); 
		  setLastId(item.id); 
		  setCount(item.id);
		  } 
          )

        },
        (error) => {
          
        }
      )
    }, []);

    function NewsItem(props) {
      /*console.log(props);*/
      let dat1=props.created.split('T');
        let dat2=dat1[1].split(':'); 
       
      return (
      <div>
        <div>
          <h1 style={styles.head}>{props.title}</h1>
        <div style={styles.head}>{dat1[0]} {dat2[0]}:{dat2[1]}</div>
        <div style={styles.head}>От {props.author.name} {props.author.lastname}</div>
        <div style={styles.head}>{props.description}</div>
        <div style={styles.line}></div>
        </div>
        <div>
          <button data-id={props.id} onClick={(event)=>{
           setCount(count-1);
           let atrId=event.target.getAttribute('data-id');
           delNews(atrId);
          }}>Удалить</button>
        </div>
      </div>
      )
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
     
     function addNews(newObj){ 
    props.dispatch({type: 'ADD_NEWS',
                    newItem: newObj})
    
     }
     
     function delNews(id){  
    props.dispatch({type: 'DEL_NEWS',
                    delId: id})
    
     }
     
     function formAddNews() {
     if(showForm==false) return <div></div>
     else 
        return (<form>
                  <div style={styles.formAdd}>
                  <label style={styles.addNewsLab}>Название - 
              <input type='text' 
                   value={newTitle}
                 onChange={(event)=> {setNewTitle(event.target.value);}}/>
            </label>
              <label style={styles.addNewsLab}>Имя создателя - 
              <input type='text' 
                   value={newName}
                   onChange={(event)=> {setNewName(event.target.value);}}/>
            </label>
              <label style={styles.addNewsLab}>Фамилия создателя - 
              <input type='text' 
                   value={newLastname}
                 onChange={(event)=> {setNewLastname(event.target.value);}}/>
            </label>
              <label style={styles.addNewsLab}>Содержимое - 
              <input type='text' 
                   value={newDisc}
                 onChange={(event)=> {setNewDisc(event.target.value);}}/>
            </label>
              <button style={styles.addNewsBut} onClick={()=>{
              setCount(count+1);
              const obj=setNewObj();
              addNews(obj);
              setNewDisc('');
              setNewLastname('');
              setNewName('');
              setNewTitle('');
              setShowForm(false)}}>Принять</button>
          </div>
             </form>)
     }
     
     function Article(props) {
      const items=props.items;
      setLastId(props.items.length);
      
        const newsItems=items.map((art,ind) =>
        <NewsItem key={art.id.toString()}
                      id={art.id}		  
                  title={art.title}
              created={art.created_at}
            author={art.author}
            description={art.description}/>);
      
      return ( 
              <div>
            <button style={styles.but}
                  onClick={()=>{ setShowForm(true); }}
          >Добавить новость</button>
                {newsItems}
          </div>
                );
      }
    
    return <div>
      {formAddNews()}
      <Article items={props.items} />	
      <div>Всего: {count}</div>
    </div>;
    
}

const mapStateToProps=(state)=>({items:state.items});

export default connect (mapStateToProps) (Counter);