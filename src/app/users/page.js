import {getUsersData} from '@/app/lib/data.js'

export default async function Page () {
  const users = await getUsersData() 
  
  return users && <div> 
    {users.map(user => <div key={user.id}>{user.nombre_user}</div>)}
  </div>
}