import pages from '../pages'
import { router, render } from './'

export const goTo = async (path, data = [],lazy=[]) => {
    const authPage = pages.find(page => page?.path === "login")
    history.pushState({}, path, "/?page=" + path)
    router()
    let page = pages.find(page => {
        let checker = path === "/" ? path : path.replace('/', "")
        return page?.path.toLowerCase() === checker
    })
    if (page?.auth) {
        let auth = await _.isAuth()
        console.log(auth);
        if (auth.token) {
            render(page, data)
            lazy.length > 0 ? lazy.forEach(elm => elm()) : null
        } else {
            history.pushState({}, path, "/?page=" + path)
            router()
            render(authPage, data)
        }
    } else {
        render(page, data)
    }

}