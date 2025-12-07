import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateProjectInterface,
  CreateTaskInterface,
} from "@/types/types";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Status } from "@/types/Api-Types";

interface PopupcardProps {
  title: string;
  description: string;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectDetails?: React.Dispatch<
    React.SetStateAction<CreateProjectInterface>
  >;
  setTaskDetails?: React.Dispatch<React.SetStateAction<CreateTaskInterface>>;
  isPopupOpen?: boolean;
  buttonText: string;
  projectDetails?: CreateProjectInterface;
  taskDetails?: CreateTaskInterface;
  createProject?: boolean;
  createTask?: boolean;
}
function PopupCard({
  buttonText,
  description,
  setPopupOpen,
  isPopupOpen,
  title,
  createProject,
  projectDetails,
  taskDetails,
  createTask,
  setTaskDetails,
  setProjectDetails,
}: PopupcardProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // If changing a date → convert to Date()
    if (name === "startDate" || name === "endDate") {
      if (setProjectDetails) {
        setProjectDetails((prev) => ({
          ...prev,
          [name]: new Date(value),
        }));
      } else if (setTaskDetails) {
        setTaskDetails((prev) => ({
          ...prev,
          [name]: new Date(value),
        }));
      }
    } else {
      if (setProjectDetails) {
        setProjectDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else if (setTaskDetails) {
        setTaskDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  return (
    <div className="absolute top-1/2 right-1/2 -translate-1/2">
      <Dialog open={isPopupOpen} onOpenChange={(e) => setPopupOpen(e)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {createProject && (
            <React.Fragment>
              <Input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Name"
              />
              <Textarea
                name="description"
                onChange={handleChange}
                placeholder="Description"
              />
              <Input
                name="startDate"
                onChange={handleChange}
                type="Date"
                placeholder="start date"
              />
              <Input
                name="endDate"
                onChange={handleChange}
                type="Date"
                placeholder="due date"
              />
            </React.Fragment>
          )}

          {/* TASKS  */}
          {createTask && setTaskDetails && (
            <React.Fragment>
              {/* TITLE  */}
              <Input
                name="title"
                onChange={handleChange}
                type="text"
                placeholder="Title"
              />
              {/* DESCRIPTION  */}
              <Textarea
                name="description"
                onChange={handleChange}
                placeholder="Description"
              />
              {/* STATUS  */}
              <Select
                defaultValue={taskDetails?.status}
                onValueChange={(value) =>
                  setTaskDetails((prev) => ({
                    ...prev,
                    status: value as Status,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={taskDetails?.status} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Work In Progress">
                      Work In Progress
                    </SelectItem>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* PRIORITY  */}
              <Select
                defaultValue={"medium"}
                onValueChange={(value) =>
                  setTaskDetails((prev) => ({
                    ...prev,
                    priority: value as CreateTaskInterface["priority"],
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Select Prioriy"} />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="urget">Urgent</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* START DATE  */}
              <Input
                name="startDate"
                onChange={handleChange}
                type="Date"
                placeholder="Start Date"
              />
              {/* END DATE  */}
              <Input
                name="endDate"
                onChange={handleChange}
                type="Date"
                placeholder="Due Date"
              />
              {/* TAGS  */}
              <Input
                name="tags"
                onChange={handleChange}
                type="text"
                placeholder="Gaming,Graphics,Color"
              />
            </React.Fragment>
          )}
          <DialogFooter>
            {createProject && (
              <Button
                className="py-2"
              >
                {buttonText}
              </Button>
            )}

            {/* TASKS  */}
            {createTask && (
              <Button
                className="py-2"
               
              >
                {buttonText}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PopupCard;
