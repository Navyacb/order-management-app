import './App.css';
import {useEffect, useReducer} from 'react'
import axios from 'axios'
import {MenuList} from './MenuList';
import { OrdersList } from './OrdersList';

const App = ()=>{
  const [menus,menuDispatch] = useReducer(reduce,[])
  const [orders,orderDispatch] = useReducer(reduce,[])

  function reduce(state,action){
    if(action.type === 'Fetch_Menu'){
      return action.payload
    }
    if(action.type === 'Add_Menu'){
      return [...state,action.payload]
    }
    if(action.type === 'Update_Order'){
      return action.payload
    }
    if(action.type === 'Add_Order'){
      return [...state,action.payload]
    }
  }
 
  useEffect(()=>{
    (async function(){
      try{
        const response = await Promise.all([axios.get('http://localhost:3030/menu-list'),
        axios.get('http://localhost:3030/order-list')])
        const [menu,order] = response
        menuDispatch({type:'Fetch_Menu',payload:menu.data})
          orderDispatch({type:'Update_Order',payload:order.data})
      }
      catch(error){
        console.log('Error in getting data in App',error)
      }

    })()
    },[])
                
  return (
    <div className='container'>
       <h1 className='text-center'>Order Management</h1><br/><br/>
       <div className='row'>
            <MenuList menus={menus} orderDispatch={orderDispatch} menuDispatch={menuDispatch} />
            {(orders.length>0) && <OrdersList orders={orders} menus={menus} orderDispatch={orderDispatch}/>}
        </div>
    </div>
  )
}

export default App;
