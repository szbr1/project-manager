"use client"
import React, { useState } from 'react'
import Header from '../../../../components/header'
import SubHeader from '../../_components/sub-header'
import { MenuTypes } from '@/types/types'
import Board from '../_components/Board'
import List from '../_components/List'
import Timeline from '../_components/Timeline'
import Table from '../_components/Table'

function Page() {
  const [Tab, setTab] = useState<MenuTypes>("Board");
  const [isNewTaskPopUpOpen, setIsNewTaskPopUpOPen] = useState<boolean>(false)
  return (
    <div className='h-full w-full '>
      <Header title='Product Design Development' subheading='Design your workflow' button={"Create Task"}/>
      <hr className='text-gray-300 dark:text-zinc-700'/>
      <SubHeader Tab={Tab} setTab={setTab} />

      <div className='overflow-y-scroll scroll pb-8 h-[calc(100vh-200px)] '>
        {Tab === "Board" && <Board setIsNewTaskPopUpOPen={setIsNewTaskPopUpOPen} />}
        {Tab === "List" && <List setIsNewTaskPopUpOPen={setIsNewTaskPopUpOPen} />}
        {Tab === "Timeline" && <Timeline setIsNewTaskPopUpOPen={setIsNewTaskPopUpOPen} />}
        {Tab === "Table" && <Table setIsNewTaskPopUpOPen={setIsNewTaskPopUpOPen} />}
      </div>
    </div>


  )
}

export default Page