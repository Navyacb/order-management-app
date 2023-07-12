import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {MenuList} from './MenuList';
import { OrdersList } from './OrdersList';

const App = ()=>{
  const [menus,setMenus] = useState([])
  const [orders,setOrders] = useState([])
 
  useEffect(()=>{
    Promise.all([axios.get('http://localhost:3030/menu-list'),
                 axios.get('http://localhost:3030/order-list')])
      .then((response)=>{
          const [menu,order] = response
          setMenus(menu.data)
          const result = order.data.map(ord=>{
            return {...ord}
          })
          setOrders(result)
      })
      .catch((error)=>{
          console.log('Error in getting data in App',error)
      })
    },[])

    
    function updateOrder(data){
          setOrders(data)
    }

    function handleAddOrders(data){
      setOrders([...orders,data])
    }
                
  return (
    <div className='container'>
       <h1 className='text-center'>Order Management</h1><br/><br/>
       <div className='row'>
            <MenuList menus={menus} handleAddOrders={handleAddOrders} />
            {(orders.length>0) && <OrdersList orders={orders} menus={menus} updateOrder={updateOrder}/>}
        </div>
    </div>
  )
}

export default App;
