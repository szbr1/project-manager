import Image from "next/image"
import Link from "next/link"

function Sidebar() {
  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white h-screen md:w-[30vw] lg:w-[23vw] border-r p-3 dark:border-zinc-700 border-gray-300 relative z-30">
      <Link href={"/"} className="flex justify-center items-center gap-1">
        <Image src={"/taskflow.png"} height={50} width={50}/>
        <p>TaskFlow</p>
      </Link>
    </div>
  )
}

export default Sidebar 