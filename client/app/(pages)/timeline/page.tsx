"use client";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import z from "zod";

const zodProject = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail)\.com$/),
  username: z.string().min(3),
});

interface formData {
  username: string;
  email: string;
}

function Page() {
  const [form, setForm] = useState<formData | object>({});
  return (
    <div>
     
          <Input
            onChange={(e) =>
              setForm((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="username"
            type="text"
          />
          <Input
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="email"
            type="email"
          />
       
          <Button
            onClick={() => {
              const result = zodProject.safeParse(form);

              if (!result.success) {
                console.log("❌ Errors:", result.error.flatten().fieldErrors);
              } else {
                console.log("✅ Valid:", result.data);
              }
            }}
          >
            Submit
          </Button>
        
    </div>
  );
}

export default Page;
