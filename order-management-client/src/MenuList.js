import SearchMenu from "./SearchMenu"

export const MenuList = (props)=>{
    const {menus,orderDispatch} = props
    return (
        <div className='col-6'>
            <h3>Menu</h3>
            {/*<div className='row'>
                    <input type='radio' value={selected} onChange={handleChange} name='menuType' id={menu._id} />
            </div>*/}
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
        </div>)
}

