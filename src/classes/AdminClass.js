
import { get, put, post, AuthObj } from '../helpers'

export class AdminClass {

    getAllManagers = async (token) => {
        const result = await get('/admin/managers', token)
        return result
    }
    getMycategories = async (token) => {
        const result = await get('/category/categories', token)
        return result
    }

    promotions = async (token) => {
        const result = await get('/promotion/myPromotions', token)
        return result
    }

    addManager = async (data) => {
        const token = AuthObj.connectedUser.token
        const result = await post('/admin/addManger', data, token)
        return result
    }

    addPromotion = async (data) => {
        const token = AuthObj.connectedUser.token
        const result = await post('/promotion/add', data, token)
        return result
    }

    products = async () => {
        const token = AuthObj.connectedUser.token
        const result = await get('/product/all', token)
        return result
    }


}

export default AdminClass

