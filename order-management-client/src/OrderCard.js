import { menuName } from "./helper/utility"

export const OrderCard = (props)=>{
    const {order,i,updateOrders,nextOrder,menus,ordered} = props

    function handleChange(e){
        const res= window.confirm('Is the order delivered ?')
        if(res){
            updateOrders(order._id,order.menuItem)
        }
    }

    return (
        <div style={{width:'fit-content'}}>
            {console.log('ordered div',ordered)}
            <div className='card me-3 mt-3 p-0' style={(order.isCompleted) ? {background : '#59af59'} :  {background : '#f59149'}}>
                <div className='card-body'>
                    <h5>#{i+1}{((i===0) && (<input type='checkbox' className="float-end" checked={ordered} onChange={handleChange}/>)) ||
                        ((i===1) && (<button type="button" className="btn btn-link text-white" onClick={nextOrder}>Next</button>))} </h5>
                        <p>{menuName(menus,order.menuItem)}</p>
                 </div>
            </div>
        </div>
    )
}