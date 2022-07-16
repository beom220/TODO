import {ChangeEvent, useCallback, useState} from "react";
import {useRecoilState} from "recoil";
import {todoListState, TodoTypes} from "../../recoil/newTodo";

export default function Input() {
    const [input, setInput] = useState<string>('');
    const [todoList, setTodoList] = useRecoilState<TodoTypes[]>(todoListState)

    const addTodo = useCallback((): void => {
        if (!input.trim()) return;

        const nextId: number = !todoList.length ? 0 : todoList[todoList.length - 1].id + 1;
        const todo: TodoTypes = {
            id: nextId,
            contents: input,
            isCompleted: false,
        }
        setTodoList([...todoList, todo]);
        setInput('');
    }, [input, setInput, todoList, setTodoList]);

    const onChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
    }, [setInput]);

    return (
        <div className="todo-input">
            <input
                type="text"
                value={input}
                onChange={onChange}
                placeholder="todo를 입력해보세요"
            />
            <button type="button" onClick={addTodo}>Add</button>
        </div>
    )
}