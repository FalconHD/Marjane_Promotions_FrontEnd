import { SuperObj, AuthObj, AdminObj,ManagerObj } from "../helpers"
import ApexCharts from 'apexcharts'


export const witchAdmin = async () => {
    const connectedUser = AuthObj.connectedUser
    let adminCenters = []
    let categeories = []
    if (connectedUser.data.role == "super_admin") adminCenters = await SuperObj.adminCenters(connectedUser.token)
    if (connectedUser.data.role == "admin_center") categeories = await AdminObj.getAllManagers(connectedUser.token)
    // if (connectedUser.data.role == "manager") const categeories = await ManagerObj.promotions(connectedUser.token)


    var options = {
        chart: {
            type: 'area',
            stacked: true,

        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        strock: {
            curve: 'smooth',
        },
        series: [{
            name: 'sales',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    }

    goTo('/', {
        user: connectedUser.data, categeories, adminCenters
    }, [
        () => {
            var chart = new ApexCharts(document.querySelector("#main-chart"), options);
            chart.render();
        }
    ])

};

export const Centers = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const admins = await SuperObj.Admins(connectedUser.token)
    const centers = await SuperObj.Centers(connectedUser.token)
    goTo((`${path}`), { user: connectedUser.data, centers, admins, state: arg })
};

export const admins = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const admins = await SuperObj.Admins(connectedUser.token)
    goTo((`${path}`), { user: connectedUser.data, admins, state: arg })
};

export const managers = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const managers = await AdminObj.getAllManagers(connectedUser.token)
    const categories = await AdminObj.getMycategories(connectedUser.token)


    var options = {
        series: [44, 55, 13, 43, 22],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    // [
    //     () => {
    //         var chart = new ApexCharts(document.querySelector("#manager_chart"), options);
    //         chart.render();
    //     }
    // ]

    goTo((`${path}`), { user: connectedUser.data, categories, managers, state: arg })
};
export const Promotions = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const promotions = await AdminObj.promotions(connectedUser.token)
    const products = await AdminObj.products(connectedUser.token)
    goTo((`${path}`), { user: connectedUser.data, promotions, products, state: arg })
};

export const managerPromotions = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const promotions = await ManagerObj.managerPromotions(connectedUser.token)
    // const products = await AdminObj.products(connectedUser.token)
    goTo((`${path}`), { user: connectedUser.data, promotions, state: arg })
};



export const ref = [

    {
        path: "/",
        func: witchAdmin
    },
    {
        path: "/centers",
        func: Centers
    },
    {
        path: "/admins",
        func: admins
    },
    {
        path: "/managers",
        func: managers
    },
    {
        path: "/promotions",
        func: Promotions
    },
    {
        path: "/manager_promotions",
        func: managerPromotions
    }
]