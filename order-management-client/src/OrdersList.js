import React from "react"
import { menuName } from "./helper/utility"
import axios from "axios"

const {useState} = React

export const OrdersList = (props)=>{
    const {orders,menus,updateOrder} = props
    const [textStatus,setTextStatus] = useState('')
    const [checked,setChecked] = useState(false)
    const [completedId,setCompletedId] = useState('')

    function handleDone(id,menuId){
        setChecked(true)
        const name = menuName(menus,menuId)
        setTextStatus(name)
        setCompletedId(id)
        axios.put(`http://localhost:3030/order/${id}`,{isCompleted : true})
        .then((response)=>{
            console.log('response',response.data)
            const result = orders.map(order=>{
                if(id===response.data._id){
                return {...order,isCompleted:!order.isCompleted}
                }else{
                return {...order}
                }
            })
            updateOrder(result)
        })
        .catch((error)=>{
            console.log('Error in update order function',error)
        })
    }

    function handleNext(){
        const result = orders.filter(order=>{
            return order._id!==completedId
        })
        updateOrder(result)
        setTextStatus('')
    }

    function calAmt(menuId){
        const result = menus.find(menu=>menu._id === menuId)
        return result.price
    }

    return(
            <div className='col-6'>
                <h3>Orders {(textStatus.length>0) && <span className="float-end text-success">The {textStatus} order is ready !</span>}</h3>
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            {(orders.length>0) &&
                            (orders.map((order,i)=>{
                                return(
                                    <div style={{width:'fit-content'}}>
                                        <div className='card me-3 mt-3 p-0' style={(order.isCompleted) ? {backgroundColor : '59af59'} :  {backgroundColor : 'f59149'}} key={order._id}>
                                                <div className='card-body'>
                                                    <h5>#{i+1}{((i===0) && (<input type='checkbox' className="float-end" value={checked} onChange={()=>{handleDone(order._id,order.menuItem)}}/>)) ||
                                                    ((i===1) && (<button type="button" className="btn btn-link text-white" onClick={handleNext}>Next</button>))} </h5>
                                                    <p>{menuName(menus,order.menuItem)}</p>
                                                </div>
                                        </div>
                                    </div>
                                )
                            }))}
                        </div>
                    </div>
                    <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5>Amount Due</h5>
                                    <p>{orders.reduce((prev,curr)=>{
                                        return prev+calAmt(curr.menuItem)
                                    },0)}</p>
                                </div>

                            </div>
                    </div>
                </div>
        </div>
    )
}