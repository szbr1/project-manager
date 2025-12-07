import { Priority } from "@/types/Api-Types";
import PriorityPage from "../../_components/priority-page";

function page() {
  return <div>
        <PriorityPage priority={Priority.Urgent} />
    
  </div>;
}

export default page;
