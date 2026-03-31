'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";

export const NavbarItems = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [dropdownMenu, setDropdownMenu] = useState(false)
  
  const items = [
    { name: "HOME", url: '/' ,dataId: 0 },
    { name: "SUBIR GUIA", url: '/create-guide' ,dataId: 1 }
  ];

  const handleDropdownMenu = (e) => {
    setDropdownMenu(!dropdownMenu)
  }

  const handleClick = () => {
    setActiveMenu(!activeMenu)
  }

  return (
    <nav className="max-w-lg w-full mx-auto">
      <div className="flex justify-between items-center h-20 relative">
        <button className="btn-menu-show ms-6" onClick={handleClick}>
          <span className={activeMenu ? 'rotate-45 translate-y-1' : ''}></span>
          <span className={activeMenu ? 'hidden': ''}></span>
          <span className={activeMenu ? '-rotate-45 -translate-y-1.25' : ''}></span>
        </button>
        <div className={`absolute top-full z-10 w-full bg-zinc-950 ${activeMenu ? '' : 'hidden'}`}>
          <ul className='flex flex-col'>
            {items.map((item) => (
              <li className="text-white p-2 ps-6" key={item.dataId}>
                <Link href={item.url} onClick={handleClick}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4 text-white me-6">
          <div className="w-10 h-10 rounded-full bg-gray-400/15">
            <div className="flex justify-center items-center h-full text-xs">J.H</div>
          </div>
          <div className="relative h-full">
            <button type="button" onClick={handleDropdownMenu}>
              <FontAwesomeIcon icon={faBell} className="pointer-events-none"/>
            </button>
            {dropdownMenu && <ul className="bg-white p-5 absolute top-full right-0">
              <li className="text-zinc-500 text-nowrap">No tienes Notificaciones aun!</li>  
            </ul>}
          </div>
          <span className="hidden md:block">Juan Herrera</span>
        </div>
      </div>
    </nav>
  );
};
