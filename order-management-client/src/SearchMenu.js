import axios from "axios"
import { useState } from "react"

const SearchMenu = (props)=>{
    const {handleAddOrders} = props
    const [name,setName] = useState('')
    const [searchItems,setSearchItems] = useState([])
    const [error,setError] = useState(false)

    function handleChange(e){
        const name = e.target.value
        setName(name)
        if(name.length>=1){
           // axios.get(`http://localhost:3030/search-menu?name=${name}`)
           axios.get('http://localhost:3030/search-menu',{
            params:{
                name
            }
           })
            .then((response)=>{
            if(response.data.length === 0){
                setError(true)
            }else{
                setSearchItems(response.data)
            }
            })
            .catch((error)=>{
                console.log('error during search',error)
            })
        }else{
            setSearchItems([])
            setError(false)
        }
    }

    function handleAdd(id){
        const item = {
            menuItem : id,
            isCompleted : false
          }
          axios.post('http://localhost:3030/add-order',item)
          .then((response)=>{
            console.log('response',response.data)
              handleAddOrders(response.data)
          })
          .catch((error)=>{
            console.log('Error during adding to orders',error)
          })
    }

    return (
        <div>
            <input type='text' value={name} onChange={handleChange} placeholder="Search menu item name" />
            {(error) && (<p className="text-danger">The Item is currently unavailable</p>)}
            {(searchItems.length>0) && (
                searchItems.map(item=>{
                    return(
                        <div className="card p-3 my-3" key={item._id}>
                            <div className="row">
                                <div className="col-10">
                                    <h5>{item.name}</h5>
                                    <p>Price : {item.price}</p>
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn btn-outline-secondary" onClick={()=>{handleAdd(item._id)}}>Add</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        
        </div>

    )
}

export default SearchMenu