import {atom, selector} from "recoil";
import {v1} from "uuid";

export interface TodoTypes {
    id: number;
    contents: string;
    isCompleted: boolean;
}

export const todoListState = atom<TodoTypes[]>({
    key: 'todoListState' + v1(),
    default: []
})

export const todoListFilterState = atom({
    key: 'todoListFilterState' + v1(),
    default: 'Show All',
})

export const filteredTodoListState = selector({
    key: 'filteredTodoListState' + v1(),
    get: ({get}) => {
        const filter = get(todoListFilterState);
        const list = get(todoListState);

        switch (filter) {
            case 'Show Completed' :
                return list.filter((item: TodoTypes) => item.isCompleted);
            case 'Show UnCompleted' :
                return list.filter((item: TodoTypes) => !item.isCompleted)
            default:
                return list;
        }
    }
})

export const todoListStatsState = selector({
    key: 'todoListStatsState' + v1(),
    get: ({get}) => {
        const todoList = get(todoListState);
        const totalNum = todoList.length;
        const totalCompletedNum = todoList.filter((item: TodoTypes) => item.isCompleted).length;
        const totalUncompletedNum = totalNum - totalCompletedNum;
        const percentCompleted = totalNum !== 0 ? totalCompletedNum / totalNum : 0;

        return {totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted};
    }
})