"use client"
import { useGetAllUsersQuery } from "@/store/services/api";
import { Table, TableBody, TableCell,TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import Image from "next/image";

function Page() {
  const {data:users, isError, isLoading} = useGetAllUsersQuery()

  if(isError){
    return <div className="size-full center">Error Unable To Fetch Users</div>
  } else if(isLoading){
    return <div className="size-full center">Loading...</div>
  }
  return <div className="h-full overflow-y-auto pb-20 scroll p-3">
    <div>
        <h1 className="text-xl font-bold md:text-3xl mb-4 ">Users</h1>
       </div>
    
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold ">Username</TableHead>
           <TableHead className="font-bold ">Id</TableHead>
           <TableHead className="font-bold ">Image</TableHead>
           <TableHead className="font-bold text-center">Team Id</TableHead>
          </TableRow>
           
        </TableHeader>
       <TableBody>
           {users && users.map((user) => (
             <React.Fragment key={user.userId}>
              <TableRow>
              <TableCell className="" >{user.username}</TableCell>
              <TableCell className="" >{user.userId}</TableCell>
              <TableCell className="" >
                <Image src={`/${user?.profilePictureUrl}`} alt="" height={20} width={20} className="size-8 rounded-full" />
              </TableCell>
              <TableCell className="text-center">{user.teamId}</TableCell>
         </TableRow>
            </React.Fragment>
           ))}
       </TableBody>
    </Table>
  </div>;
}

export default Page;
