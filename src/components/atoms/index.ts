import {atom} from 'recoil'

export const todoAtom = atom<number>({
    key:"counter",
    default: 0
})