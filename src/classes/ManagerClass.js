
import { get, put, post, AuthObj } from '../helpers'

export class ManagerClass {


    managerPromotions = async () => {
        const res = await get('/manager/promotion', AuthObj.connectedUser.token)
        return res
    }
    updatePromotionStatus = async ({ promotionId, status }) => {
        const res = await put((`/promotion/${promotionId}`), { status }, AuthObj.connectedUser.token)
        return res
    }

}

export default ManagerClass

