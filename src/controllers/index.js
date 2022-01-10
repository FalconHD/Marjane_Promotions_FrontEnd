import { AdminObj, AuthObj, back, get } from "../helpers";
import { header } from "../components";
import { ref } from "../Mout";
import { goTo, router, SuperObj, render } from "../helpers";

class Controller {
    constructor() {
        window._ = this
        router();

        //Our Global Router Link
        window.goTo = goTo;
        window.clearAllTimeOutes = this.clearAllTimeOutes;


        //login onload
        this.loginOnload()

        //auto login
        // this.login({
        //     email: "youssbak.2015@gmail.com",
        //     password: "123"
        // })
        //render Header components
        this.updateHeader();


        //Listener on navigator go back
        back();

        //Handle routing system on load
        goTo(location.pathname);
    }

    loginOnload = async () => {
        console.log("first load", location.pathname);
        let token = localStorage.getItem("token");
        if (token) {
            let res = await this.isTokenValid(token)
            console.log(res);
            if (res.error) this.logout()
            SuperObj.super = {
                data: res,
                token: token
            }
            AuthObj.connectedUser = {
                data: res,
                token: token
            }
            this.goToSync(location.pathname)
        } else {
            this.logout()
            goTo('/login')
        }
    }

    isTokenValid = async (token) => {
        let res = await get('/auth/token', token)
        return res
    }

    goToSync = async (path, arg) => {
        console.log("path", path);
        let res = ref.find(elm => elm.path == path)
        res ? res.func(path, arg) : goTo(`/${path}`, arg)
    }

    isAuth = async () => {
        return AuthObj.connectedUser
    }

    addUser = async (UserData) => {
        let user = await SuperObj.instription(UserData);
        this.updateHeader();
        localStorage.setItem("email", user.email);
        localStorage.setItem("password", user.password);
        return user;
    };

    logout = () => {
        SuperObj.super = {}
        AuthObj.connectedUser = {}
        this.updateHeader()
        localStorage.removeItem("token");
        goTo('/login')
    };

    //login
    login = async (UserData) => {
        let result = await AuthObj.login(UserData);
        console.log("login result", result);
        if (result?.token) {
            AuthObj.connectedUser = result
            console.log(result);
            localStorage.setItem("token", result.token);
            this.updateHeader();
            this.goToSync("/")
        } else {
            goTo('/login')
        }
    };

    updateHeader = async () => {
        render(
            {
                path: "header",
                page: header,
            },
            SuperObj.super
        );
    };

    getAllAdminCenters = async () => {
        let res = await SuperObj.getAllAdminCenters();
        return res;
    };


    clearAllTimeOutes = () => {
        let id = window.setTimeout(() => { }, 0);
        while (id--) {
            window.clearTimeout(id);
        };
    };


    addAdminCenter = async (data) => {
        let res = await SuperObj.addAdminCenter(data);
        console.log(res);
        if (res.error) console.log(res.error);
        this.goToSync("/admins");
        return res;
    }

    addNewCenter = async (data) => {
        let res = await SuperObj.addCenter(data);
        if (res.error) console.log(res.error);
        this.goToSync("/centers");
        return res;
    }

    addManager = async (data) => {
        let res = await AdminObj.addManager(data);
        if (res.error) console.log(res.error);
        this.goToSync("/managers");
        return res;
    }

    addPromotion = async (data) => {
        let res = await AdminObj.addPromotion(data);
        if (res.error) console.log(res.error);
        this.goToSync("/promotions");
        return res;
    }
}

export default Controller;
