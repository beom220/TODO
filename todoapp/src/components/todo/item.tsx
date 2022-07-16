import {TodoTypes} from "../../recoil/newTodo";
import {SetterOrUpdater} from "recoil";
import {useCallback, useState} from "react";
import Modify from "./modify";

interface PropTypes {
    id: number;
    contents: string;
    isCompleted: boolean;

    onComplete: (id: number) => void;
    onDelete: (id: number) => void;

    todoList: TodoTypes[];
    setTodoList: SetterOrUpdater<TodoTypes[]>;
}


export default function Item({id, contents, isCompleted, onComplete, onDelete, todoList, setTodoList}: PropTypes) {
    const styled = {
        border: isCompleted ? "1px solid blue" : "1px solid red",
        margin: '10px',
        padding: '10px'
    }
    const showIsCompleted = (isCompleted: boolean) => {
        switch (isCompleted) {
            case false:
                return '미완료'
            case true :
                return '완료'
            default :
                return '에러 : 상태없음'
        }
    }
    const [modifyContents, setModifyContents] = useState<string>('');
    const [isModify, setIsModify] = useState<boolean>(false);

    const onModify = useCallback((): void => {
        setIsModify(true);
        setModifyContents(contents);
    }, [contents])

    const onModifyTodo = useCallback((): void => {
        if (!modifyContents.trim()) return;

        setTodoList(todoList.map((list: TodoTypes) => {
            return list.id === id ? {...list, contents: modifyContents} : list;
        }))
    }, [id, modifyContents, todoList, setTodoList])

    return (
        <>
            <div style={styled}>
                <div>할 일 :
                    {!isModify ?
                        contents :
                        <Modify
                            setIsModify={setIsModify}
                            modifyContents={modifyContents}
                            setModifyContents={setModifyContents}
                            onModifyTodo={onModifyTodo}
                        />
                    }
                    {!isModify && <button onClick={onModify}>수정</button>}
                </div>
                <div>
                    <span>상태 : </span>
                    <button type="button" onClick={() => onComplete(id)}>
                        {showIsCompleted(isCompleted)}
                    </button>
                </div>
                <div>
                    <button type="button" onClick={() => onDelete(id)}>삭제</button>
                </div>
            </div>
        </>
    )
}