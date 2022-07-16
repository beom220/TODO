import {useRecoilState} from "recoil";
import {todoListFilterState} from "../../recoil/newTodo";
import {ChangeEvent, useCallback} from "react";

export default function Filters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);

    const updateFilter = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
        const {value} = e.target;
        setFilter(value);
    }, [setFilter])

    return (
        <>
            Filter :
            <select value={filter} onChange={updateFilter}>
                <option value="Show All">All</option>
                <option value="Show Completed">Completed</option>
                <option value="Show UnCompleted">Uncompleted</option>
            </select>
        </>
    )
}