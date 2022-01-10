import { Home } from './Home'
import { centers } from './Centers'
import { login } from './login'
import { SuperAdmin } from './Super'
import { Admins } from './Admins'
import { Managers } from './Managers'
import { Promotions } from './Promotions'



let pages = [
  {
    page: login,
    path: "login"
  },
  {
    page: Home,
    path: "/",
    auth: true
  },
  {
    page: SuperAdmin,
    path: "super",
    auth: true
  },
  {
    page: centers,
    path: "centers",
    auth: true
  },
  {
    page: Admins,
    path: "admins",
    auth: true
  },
  {
    page: Managers,
    path: "managers",
    auth: true
  },
  {
    page: Promotions,
    path: "promotions",
    auth: true
  }
]


export default pages