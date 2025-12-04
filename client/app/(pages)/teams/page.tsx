"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTeamsQuery } from "@/store/services/api"
import React from "react";

function Page() {
  const {data:teams, isError, isLoading} = useGetTeamsQuery();

  if(isError){
    return <div className="center size-full">Error While Fetching Teams data.</div>
  }else if(isLoading){
    return <div className="center size-full">Loading...</div>
  }

  return (
    <div className="p-3">
       <div>
        <h1 className="text-xl md:text-3xl mb-4 font-bold ">Teams</h1>
       </div>
     <Table>
       <TableHeader>
         <TableRow>
            <TableHead>No</TableHead>
         <TableHead>Name</TableHead>
         <TableHead>Manager</TableHead>
         <TableHead>Owner</TableHead>
         </TableRow>
         
       </TableHeader>
       <TableBody>
         {teams && teams.map((team,index) => (
          <React.Fragment key={index}>
             <TableRow>
                <TableCell>{index+1}</TableCell>
                <TableCell>{team.teamName}</TableCell>
                <TableCell>{team.teamProductManager.username}</TableCell>
                <TableCell>{team.teamProductOwner.username}</TableCell>
             </TableRow>
          </React.Fragment>
         ))}
       </TableBody>
     </Table>
    </div>
  )
}

export default Page