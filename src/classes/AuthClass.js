
import { get, put, post } from '../helpers'

export class SuperClass {
    connectedUser = {}

    login = async (data) => {
        const result = await post('/auth/login', data)
        this.super = result
        return result
    }

    
}

export default SuperClass

