import React, {ChangeEvent, useCallback} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {inputState, ITodoTypes, todoState} from "../../../recoil/beforeTodo";


const TodoInput = (): JSX.Element => {
    const [ contents, setContents ] = useRecoilState<string>(inputState);
    // const todos = useRecoilValue<ITodoTypes[]>(todoState);
    // const setTodos = useSetRecoilState<ITodoTypes[]>(todoState);
    const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todoState);

    const addTodo = useCallback(():void => {
        if(!contents.trim()) return;

        const nextId:number = !todos.length ? 0 : todos[todos.length - 1].id + 1;

        const todo:ITodoTypes = {
            id: nextId,
            contents,
            isCompleted: false,
        };

        setTodos([...todos, todo]);

        setContents('');
    },[contents, setContents, setTodos, todos]);


    const onChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setContents(value);
    },[setContents]);

    const onKeyDown = useCallback((e:React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }, [addTodo]);

    return (
        <div className="TodoInput">
            <input
                type="text"
                className="TodoInput-Input"
                value={contents}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Todo를 입력해보세요!"
            />
            <input type="button" className="TodoInput-Button" onClick={addTodo} value="추가"/>
        </div>
    )
}

export default TodoInput;