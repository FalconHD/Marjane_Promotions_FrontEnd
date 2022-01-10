import SuperClass  from "./SuperClass"
import AuthClass  from "./AuthClass"
import AdminClass  from "./AdminClass"
import ManagerClass  from "./ManagerClass"


export const UserSuper = () => {
    return new SuperClass()
}


export const AuthInit = () => {
    return new AuthClass()
}

export const AdminInit = () => {
    return new AdminClass()
}

export const ManagerInit = () => {
    return new ManagerClass()
}