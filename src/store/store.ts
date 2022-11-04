import { atom } from "recoil";

export const titleState = atom({
    key: "title",
    default: ""
});

export const urlState = atom({
    key: "url",
    default: ""
});

export const collapsedState = atom({
    key: "collapsed",
    default: true
})