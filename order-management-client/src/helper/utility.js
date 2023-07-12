export const menuName = (menus,menuItem)=>{
    const result = menus.find(menu=>{
        return (menu._id === menuItem)
    })
    return result.name
}