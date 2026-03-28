import { getGuides } from "../lib/data"

export default async function Page () {
  const guides = await getGuides()
  return (
    <div>
      {guides && guides.map(guide => <div key={guide.numbOfGuide}>{JSON.stringify(guide)}</div>)}
    </div>
  )
}