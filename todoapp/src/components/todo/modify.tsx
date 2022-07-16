import {ChangeEvent, Dispatch, SetStateAction, useCallback} from "react";

interface PropTypes {
    setIsModify: Dispatch<SetStateAction<boolean>>;
    modifyContents: string;
    setModifyContents: Dispatch<SetStateAction<string>>;
    onModifyTodo: () => void;
}

export default function Modify({setIsModify,modifyContents,setModifyContents,onModifyTodo}:PropTypes){
    const onCloseModify = useCallback(()=>{
        setIsModify(false);
    },[setIsModify])

    const onChange = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
        const { value } = e.target;
        setModifyContents(value);
    },[setModifyContents]);

    const onSubmit = useCallback(() => {
        onModifyTodo();
        onCloseModify();
    },[setIsModify, onModifyTodo])

    return (
        <div className="todo-input" style={{display:"inline-block"}}>
            <input
                type="text"
                defaultValue={modifyContents}
                onChange={onChange}
                placeholder="todo를 입력해보세요"
            />
            <button type="button" onClick={onSubmit}>변경하기</button>
            <button type="button" onClick={onCloseModify}>취소</button>
        </div>
    )
}