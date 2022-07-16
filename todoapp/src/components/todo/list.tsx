import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {filteredTodoListState, todoListState, TodoTypes} from "../../recoil/newTodo";
import Item from "./item";
import {useCallback, useEffect} from "react";

export default function List() {
    const filterTodoList = useRecoilValue<TodoTypes[]>(filteredTodoListState);
    const [todoList, setTodoList] = useRecoilState<TodoTypes[]>(todoListState)

    const onComplete = useCallback((id: number): void => {
        setTodoList(todoList.map((list: TodoTypes) => {
            return list.id !== id ? list : {...list, isCompleted: !list.isCompleted};
        }));
    }, [todoList, setTodoList]);

    const onDelete = useCallback((id: number): void => {
        setTodoList(todoList.filter((list: TodoTypes) => list.id !== id))
    }, [todoList, setTodoList])



    return (
        <div className="todo-list">
            {!filterTodoList.length ?
                <div className="no-list">할 일을 등록해 보세요.</div> :
                filterTodoList.map((list: TodoTypes) => {
                    const {id, contents, isCompleted} = list;
                    return <Item
                        id={id}
                        key={id}
                        contents={contents}
                        isCompleted={isCompleted}
                        onComplete={onComplete}
                        onDelete={onDelete}
                        todoList={todoList}
                        setTodoList={setTodoList}
                    />
                })
            }
        </div>
    );
}