import {makeAutoObservable} from "mobx";
import UserStore from "./modules/UserStore";
import {message, notification} from "antd";
import $api from "../http";
import SystemStore from "./modules/SystemStore";
import WishlistStore from "./modules/WishlistStore";
import SharedStore from "./modules/SharedStore";

export default class AppStore {

    users = new UserStore(this);
    system = new SystemStore(this);
    wishlists = new WishlistStore(this)
    sharedStore = new SharedStore(this)

    userState = null;
    isAuthState = false;
    isSuperAdminState = null;

    get isAuth() {
        return this.isAuthState;
    }

    set isAuth(value) {
        this.isAuthState = value;
    }

    get user() {
        return this.userState;
    }

    set user(value) {
        this.userState = value;
    }

    get isSuperAdmin() {
        return this.isSuperAdminState;
    }

    set isSuperAdmin(value) {
        this.isSuperAdminState = value;
    }

    constructor() {
        makeAutoObservable(this, {
                courses: false,
                topics: false,
                postTypes: false,
                posts: false,
                users: false,
                comments: false,
                subjects: false,
                system: false
            },
            {
                deep: true
            });

        // Проверка авторизации
        this.checkAuth();
    }

    checkAuth = () => {
        const token = localStorage.getItem('token');
        if (token) {
            this.loadUser(token);
        }
    }

    loadUser = (token) => {
        const {id, email, role} = JSON.parse(atob(token.split('.')[1]));
        const username = JSON.parse(atob(token.split('.')[1])).sub;
        this.user = {id, username, email, role};
        this.isAuth = true;

        this.checkSuperAdmin();
    }

    checkSuperAdmin = async () => {
        if (this.user.role === 'ROLE_ADMIN') {
            try {
                const response = await $api.get('/users/is-superuser');
                this.isSuperAdmin = response.data;
            } catch (e) {
                this.isSuperAdmin = false;
            }
        } else {
            this.isSuperAdmin = false;
        }
    }

    logout = () => {
        console.log('logout')
        localStorage.removeItem('token');
        this.user = null;
        this.isAuth = false;
    }

    httpError = (e) => {
        // switch-case by http code
        const msg = 'Ошибка сервера';
        if (e.response) {
            switch (e.response?.status) {
                case 400 || 401:
                    if (e.response.data?.title === 'Constraint Violation') {
                        notification.error({
                            message: 'Ошибка валидации данных',
                            description: e.response.data?.violations?.map(v => <p>{v.message}</p>),
                        }, 10);
                    } else {
                        notification.error({
                            message: e.response.data?.title,
                            description: e.response.data?.detail,
                        }, 10);
                    }

                    // notification.error({
                    //     message: e.response.data?.title,
                    //     description: e.response.data?.detail,
                    // });
                    break;
                // case 401:
                //     message.error('Необходимо авторизоваться');
                //     break;
                case 403:
                    message.error('Недостаточно прав');
                    break;
                case 404:
                    message.error('Не найдено');
                    break;
                default:
                    notification.error({
                        message: e.response.data.title,
                        description: e.response.data.detail,
                    }, 10);
            }
        } else {
            message.error(msg);
        }
    }

    isAdmin(): boolean {
        // return true;
        return this.user?.role === 'ROLE_ADMIN';
    }

    isModerator(): boolean {
        return this.user?.role === 'ROLE_MODERATOR' || this.isAdmin();
    }
}