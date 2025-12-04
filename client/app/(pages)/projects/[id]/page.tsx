"use client";
import { useState } from "react";
import Header from "../_components/top-header";
import SubHeader from "../../_components/sub-header";
import { CreateProjectInterface, MenuTypes } from "@/types/types";
import Board from "../_components/Board";
import List from "../_components/List";
import Timeline from "../_components/Timeline";
import Table from "../_components/Table";
import PopupCard from "../_components/popup-card";

function Page() {
  const [Tab, setTab] = useState<MenuTypes>("Board");
  const [isNewProjectOpen, setIsNewProjectOpen] = useState<boolean>(false);
  

  const [projectDetails, setProjectDetails] = useState<CreateProjectInterface>({
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    description: "",
  });


  return (
    <div className="h-full w-full relative ">
      <Header
        title="Product Design Development"
        setIsNewProjectOpen={setIsNewProjectOpen}
        subheading="Design your workflow"
        button={"Create Task"}
      />
      <hr className="text-gray-300 dark:text-zinc-700" />
      <SubHeader Tab={Tab} setTab={setTab} />

      <div className="overflow-y-scroll scroll pb-8 h-[calc(100vh-200px)] ">
        {Tab === "Board" && (
          <Board />
        )}
        {Tab === "List" && (
          <List />
        )}
        {Tab === "Timeline" && (
          <Timeline />
        )}
        {Tab === "Table" && (
          <Table setIsNewtaskojectPopUpOPen={setIsNewProjectOpen} />
        )}
      </div>

      <PopupCard
        buttonText="Create Project"
        description="Create new project and track analyse it with ease."
        title="Create New Project"
        createProject={true}
        setProjectDetails={setProjectDetails}
        setPopupOpen={setIsNewProjectOpen}
        isPopupOpen={isNewProjectOpen}
        projectDetails={projectDetails}
      />

      <div className="py-3 px-4">
        Yoloo
      </div>
    </div>
  );
}

export default Page;
