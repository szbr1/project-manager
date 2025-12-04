import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
  return (
    <div className="flex justify-center py-8 size-full px-2">
     <Card className="md:w-1/2 w-full outline-none border-0 shadow-none  h-4/6 dark:bg-zinc-900">
         <CardHeader>
           <CardTitle>
             Account Info
           </CardTitle>
           <CardDescription> Change account details with ease. </CardDescription>
         </CardHeader>
       <CardContent>
         <form className="flex flex-col gap-5">
          <div className="grid gap-2">
              <Label>Name</Label>
              <Input className="py-6" placeholder="Name..." />
          </div>

           <div className="grid gap-2">
              <Label>Email</Label>
              <Input className="py-6" placeholder="Email..." />
          </div>

           <div className="grid gap-2">
              <Label>Name</Label>
              <Input className="py-6" placeholder="Name..." />
          </div>

           <div className="grid gap-2">
              <Label>Team Id</Label>
              <Input className="py-6" placeholder="TeamId..." />
          </div>
          
         </form>
       </CardContent>
     </Card>
    </div>
  );
}

export default Page;
