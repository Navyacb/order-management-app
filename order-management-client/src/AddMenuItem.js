import axios from "axios"
import { useState } from "react"

export const AddMenuItem = (props)=>{
    const { addItemDispatch, menuDispatch } = props
    const [menuType,setMenuType] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')

    function handChange(e){
        if(e.target.id === 'type'){
            setMenuType(e.target.value)
        }
        if(e.target.id === 'name'){
            setName(e.target.value)
        }
        if(e.target.id === 'price'){
            setPrice(e.target.value)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const formData = {
                name,
                menuType,
                price
            }
            const response = await axios.post('http://localhost:3030/add-menu', formData)
            console.log(response.data)
            menuDispatch({type:'Add_Menu',payload:response.data})
            addItemDispatch({type:'Hide_Form'})
        }
        catch(error){
            console.log('Error inside Add Menu Items',error)
        }

    }

    function handleCancel(){
        addItemDispatch({type:'Hide_Form'})
    }

    return(
        <form className="mt-3" style={{width:'max-content'}} onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="name" className="form-label">Name</label>
            <input type="name" className="form-control" id="name" value={name} onChange={handChange} />
        </div>
        <div className="mb-3">
            <label for="type" className="form-label">MenuType</label>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="food" id="type" value='Food' checked={menuType==='Food'} onChange={handChange}/>
                <label className="form-check-label" for="type">
                    Food
                </label>
                </div>
                <div className="form-check">
                <input className="form-check-input" type="radio" name="drink" id="type" value='Drink' checked={menuType==='Drink'} onChange={handChange}/>
                <label className="form-check-label" for="type">
                    Drink
                </label>
            </div>
        </div>
        <div className="mb-3">
            <label for="type" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" value={price} onChange={handChange} />
        </div>
        <div className="row">
            <div className="col-4"><button type="submit" class="btn btn-outline-primary">Save</button></div>
            <div className="col-5"><button type="button" class="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button></div>
        </div>
        </form>
    )
}