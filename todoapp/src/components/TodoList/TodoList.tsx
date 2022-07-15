import React, {useCallback} from "react";
import {useRecoilState} from "recoil";
import {todoState, ITodoTypes} from "../../recoil/todo";
import TodoItem from "./Todoitem/TodoItem";

const TodoList = (): JSX.Element => {
    const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todoState);

    const onComplete = useCallback((id: number): void => {
        setTodos(todos.map((todo: ITodoTypes) => {
            // 매개변수로 받은 id와 같은 객체만 완료상태 업데이트
            return todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo;
        }));
    }, [setTodos, todos]);

    const onDelete = useCallback((id: number): void => {
        setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
    }, [setTodos, todos]);

    return (
        <div className="TodoList">
            {!todos.length ?
                <div className="TodoList-NoList"> Todo가 없습니다. </div> :
                todos.map((todo: ITodoTypes) => {
                    const {id, contents, isCompleted} = todo;
                    return (
                        <TodoItem
                            key={id}
                            id={id}
                            contents={contents}
                            isCompleted={isCompleted}
                            onComplete={onComplete}
                            onDelete={onDelete}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList;