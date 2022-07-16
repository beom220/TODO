import List from "./list";
import Input from "./input";
import Filters from "./filters";
import Stats from "./stats";

export default function Template(){
    return (
        <div className="template">
            {/* filterStats */}
            <Stats/>
            <Filters/>
            <List/>
            <Input/>
        </div>
    )
}