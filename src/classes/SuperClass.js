
import { get, put, post, AuthObj } from '../helpers'

export class SuperClass {
    super = {}

   

    adminCenters = async (token) => {
        const result = await get('/admin/all', token)
        this.super = result
        return result
    }

    Centers = async (token) => {
        const result = await get('/center/all', token)
        return result
    }

    Admins = async (token) => {
        const result = await get('/admin/all', token)
        return result
    }

    addAdminCenter = async (data) => {
        const result = await post('/super/adCenter', data, AuthObj.connectedUser.token)
        return result
    }

    addCenter = async (data) => {
        const result = await post('/center/add', data, AuthObj.connectedUser.token)
        return result
    }
}

export default SuperClass

