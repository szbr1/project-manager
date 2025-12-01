
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import DarkModeComponent from './_components/darkmode';
import { IoIosSettings } from 'react-icons/io';
import Menu from './_components/menubutton';




function Navbar() {

  return (
    <div className='w-full flex items-center px-4 justify-between bg-light-green dark:bg-zinc-900 absolute top-0 border-b border-gray-300 dark:border-zinc-700 '>
      <div className='flex justify-center items-center gap-2'>
          {/* Menu Button  */}
           <Menu />
          {/* logo  */}
          <Link href={"/"} className='flex justify-center items-center'>
            <Image src={"/taskflow.png"} height={50} width={50} alt='logo' />
            <p className='text-lg dark:text-white'>Taskflow</p>
          </Link>
      </div>
     
     <div className='flex justify-center items-center gap-4'>
        {/* Dark Mode  */}
        <DarkModeComponent />
      
        {/* settings icon  */}
        <IoIosSettings  size={25} className='dark:text-white'/>
     </div>

    </div>
  )
}

export default Navbar