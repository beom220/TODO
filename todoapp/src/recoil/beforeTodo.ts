import { atom } from "recoil";

export interface ITodoTypes {
    id: number;
    contents: string;
    isCompleted: boolean;
}

// TodoInput의 입력값을 atom으로 관리
export const inputState = atom<string>({
    key: 'inputState',
    default: ''
})

// Update시킬 Todos atom 배열
export const todoState = atom<ITodoTypes[]>({
    key: 'todos',
    default: [
        {
            id:1,
            contents: 'Todo Lists를',
            isCompleted: false,
        },
        {
            id:2,
            contents: '자유롭게',
            isCompleted: false,
        },
        {
            id:3,
            contents: '추가해보세요!',
            isCompleted: false,
        },
    ]
})