import { Content } from "./ui/homePage/Content";

export default function Page() {
  return (
    <>
      <nav className="p-6 py-4 bg-cyan-800">
        <div className="flex justify-end">
          <ul>
            <li>
              <a href="#" className="text-white">
                Notificaciones
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Content />
    </>
  );
}
