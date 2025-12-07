import { Priority } from "@/types/Api-Types";
import PriorityPage from "../../_components/priority-page";

function Page() {
  return <div>
    <PriorityPage priority={Priority.Low} />
  </div>;
}

export default Page;
