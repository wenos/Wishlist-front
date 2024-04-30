import {makeAutoObservable} from "mobx";
import type AppStore from "../AppStore";
import $api from "../../http";
import {message} from "antd";


export default class SharedStore {

    rootStore: AppStore;

    constructor(rootStore: AppStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }


    getLink = async (values) => {
        try {
            const json = JSON.stringify({
                wishlistId: values.id,
                accessMode: values.mode
            });
            console.log(json)
            let res = await $api.post(`/link`, json);
            return res.data
        } catch (e) {
            this.rootStore.httpError(e);
        }
        return "Not link";
    }

}