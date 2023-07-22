import { useReducer } from "react"
import SearchMenu from "./SearchMenu"
import { AddMenuItem } from "./AddMenuItem"

export const MenuList = (props)=>{
    const {menus,orderDispatch,menuDispatch} = props
    const [addItem,addItemDispatch] = useReducer(reducer,false)

    function reducer(state,action){
        return !state
    }

    function handleAdd(){
        addItemDispatch({type:'Show_Form'})
    }

    return (
        <div className='col-6'>
            <div className="row">
                <div className="col-8"><h3>Menu</h3></div>
                <div className="col-4"><button type="button" class="btn btn-outline-dark" onClick={handleAdd}>Add New Item</button></div>
            </div>
            {/*<div className='row'>
                    <input type='radio' value={selected} onChange={handleChange} name='menuType' id={menu._id} />
            </div>*/}
            {
                (addItem) ? 
                <AddMenuItem addItemDispatch={addItemDispatch} menuDispatch={menuDispatch} /> :
                <div>
                <div className="row">
                <table className='table' style={{width:'auto'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>MenuType</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menus.map(menu=>{
                                return <tr key={menu._id}>
                                    <td>{menu.name}</td>
                                    <td>{menu.menuType}</td>
                                    <td>{menu.price}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
                <div className="row my-4">
                        <SearchMenu orderDispatch={orderDispatch} />
                </div>
            </div>
            }
        </div>)
}

