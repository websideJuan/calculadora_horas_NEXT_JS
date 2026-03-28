import { createDatabase, getGuides } from "../lib/data"

export default async function Page () {
  const res = await createDatabase()
  console.log(res);
  if (!res.isOk) {
    const users = await getGuides()
    return
  };
  
  console.log(res);
    
  return (
    <span>
      processing data...
    </span>
  )
}