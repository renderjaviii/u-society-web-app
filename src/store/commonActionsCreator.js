import store from "./store";
import {get, post, put} from "../configuration/service";

export const baseGetCreator = (path, initialCallback, successCallback, errorCallback) => {
    store.dispatch(initialCallback());
    return async function (dispatch, getState) {
        await get(path, dispatch, successCallback, errorCallback, getState);
    };
};

export const basePostCreator = (path, body, initialCallback, successCallback, errorCallback) => {
    store.dispatch(initialCallback());
    return async function (dispatch, getState) {
        await post(path, body, dispatch, successCallback, errorCallback, getState);
    };
};

export const basePutCreator = (path, body, initialCallback, successCallback, errorCallback) => {
    store.dispatch(initialCallback());
    return async function (dispatch, getState) {
        await put(path, body, dispatch, successCallback, errorCallback, getState);
    };
};
