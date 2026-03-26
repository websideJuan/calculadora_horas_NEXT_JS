export const NavbarItems = ({listItems}) => {
  console.log(listItems);
  
  return(
    listItems.map(item => <li key={item.name}>
      <a href={item.href}>{item.name}</a>
    </li>)
  )
}