import { Priority } from "@/types/Api-Types";
import PriorityPage from "../../_components/priority-page";

function Page() {
  return <div>
    <PriorityPage priority={Priority.High} />
  </div>;
}

export default Page;
