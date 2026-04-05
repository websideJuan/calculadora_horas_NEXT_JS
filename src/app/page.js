import { ListHours } from "./ui/homePage/ListHours";
import { Hours } from "./lib/hours";

export default function Page() {
  return (
    <div className="max-w-lg w-full mx-auto px-5">
      <Hours />
      <ListHours />
    </div>
  );
}
