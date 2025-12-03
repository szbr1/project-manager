import { cn } from "@/lib/utils";
import { MenuTypes } from "@/types/types";
import { BsGrid3X3 } from "react-icons/bs";
import {
  CiBoxList,
  CiClock1,
  CiFilter,
  CiShare1,
  CiViewTable,
} from "react-icons/ci";

interface SubHeaderTypes {
  Tab: MenuTypes;
  setTab: React.Dispatch<React.SetStateAction<MenuTypes>>;
}

function SubHeader({ Tab, setTab }: SubHeaderTypes) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex md:order-2  gap-2 py-1 px-4 mt-2 md:border-b border-gray-300 dark:border-zinc-700 ">
        <div className="flex  justify-center items-center gap-1">
          <CiFilter size={23} className="dark:text-gray-300 cursor-pointer" />
          <CiShare1 size={23} className="dark:text-gray-300 cursor-pointer" />
        </div>
        <input
          className="outline-none w-55  border-gray-400 bg-light-green dark:bg-zinc-900 dark:text-zinc-500 dark:border-zinc-700 border rounded-sm px-3 py-0.5  "
          placeholder="Search..."
        />
      </div>
      <div className="border-b px-2 md:order-1  border-gray-300 flex items-center gap-2 dark:border-zinc-700 py-2  size-full">
        <MenuButton Tab={Tab} Icon={BsGrid3X3} name="Board" setTab={setTab} />
        <MenuButton Tab={Tab} Icon={CiBoxList} name="List" setTab={setTab} />
        <MenuButton Tab={Tab} Icon={CiClock1} name="Timeline" setTab={setTab} />
        <MenuButton Tab={Tab} Icon={CiViewTable} name="Table" setTab={setTab} />
      </div>
    </div>
  );
}

interface MenuButtonTypes {
  name: MenuTypes;
  Icon: React.ElementType;
  Tab: MenuTypes;
  setTab: React.Dispatch<React.SetStateAction<MenuTypes>>;
}

const MenuButton = ({ name, Icon, setTab, Tab }: MenuButtonTypes) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 lg:gap-5 ">
      <button
        className={cn(
          name === Tab &&
            "relative after:content-[''] after:absolute after:left-0 after:w-full after:h-0.5 after:bg-amber-600 after:-bottom-[9px] md:after:-bottom-3",
          "center gap-2 cursor-pointer",
        )}
        onClick={() => setTab(name)}
      >
        <Icon size={16} className="dark:text-gray-400" />
        {name}
      </button>
    </div>
  );
};

export default SubHeader;
