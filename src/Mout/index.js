import { SuperObj, AuthObj, AdminObj, ManagerObj } from "../helpers"
import ApexCharts from 'apexcharts'


export const witchAdmin = async () => {
    const connectedUser = AuthObj.connectedUser
    let adminCenters = []
    let categeories = []
    let promotions = []
    if (connectedUser.data.role == "super_admin") adminCenters = await SuperObj.adminCenters(connectedUser.token)
    if (connectedUser.data.role == "admin_center") {
        categeories = await AdminObj.getAllManagers(connectedUser.token)
        promotions = await AdminObj.promotions(connectedUser.token)
        if (!promotions.error) {

            let done = promotions.filter(promotion => promotion.status == "accepted")
            let Rejected = promotions.filter(promotion => promotion.status == "Rejected")
            let pending = promotions.filter(promotion => promotion.status == "pending")

            console.log(done, Rejected, pending);

            var options = {
                chart: {
                    type: 'donut'
                },
                series: [done.length, Rejected.length, pending.length],
                labels: ['accepted', 'rejected', 'pending']
            }

        }
    }
    if (connectedUser.data.role == "manager") {
        promotions = await ManagerObj.managerPromotions(connectedUser.token)
        if (!promotions.error) {
            console.log(promotions);
            let done = promotions.filter(promotion => promotion.status == "accepted")
            let Rejected = promotions.filter(promotion => promotion.status == "Rejected")
            let pending = promotions.filter(promotion => promotion.status == "pending")

            console.log(done, Rejected, pending);

            var options = {
                chart: {
                    type: 'donut'
                },
                series: [done.length, Rejected.length, pending.length],
                labels: ['accepted', 'rejected', 'pending']
            }
        }
    }

    goTo('/', {
        user: connectedUser.data, categeories, adminCenters, error: promotions?.error ? promotions.error : null,
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
    let promotions = []
    const products = await AdminObj.products(connectedUser.token)
    if (connectedUser.data.role == "super_admin") {
        
        promotions = await SuperObj.promotions(connectedUser.token)

        console.log(promotions);
        let done = promotions.filter(promotion => promotion.status == "accepted")
        let Rejected = promotions.filter(promotion => promotion.status == "Rejected")
        let pending = promotions.filter(promotion => promotion.status == "pending")

        console.log(done, Rejected, pending);

        var options = {
            chart: {
                type: 'donut'
            },
            series: [done.length, Rejected.length, pending.length],
            labels: ['accepted', 'rejected', 'pending']
        }

        goTo((`${path}`), { user: connectedUser.data, promotions, products, state: arg }, [
            () => {
                var chart = new ApexCharts(document.querySelector("#main-chart"), options);
                chart.render();
            }
        ])

    } else {
        promotions = await AdminObj.promotions(connectedUser.token)
        goTo((`${path}`), { user: connectedUser.data, promotions, products, state: arg })

    }
};

export const managerPromotions = async (path, arg) => {
    const connectedUser = AuthObj.connectedUser
    const promotions = await ManagerObj.managerPromotions(connectedUser.token)
    // const products = await AdminObj.products(connectedUser.token)
    promotions.error ? goTo((`${path}`), { user: connectedUser.data, error: promotions.error, state: arg }) : goTo((`${path}`), { user: connectedUser.data, promotions, state: arg })

};


const mylogs = async () => {
    const connectedUser = AuthObj.connectedUser
    const logs = await _.logs(connectedUser.data.id)
    goTo('/mylogs', { user: connectedUser.data, logs })
}


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
    },
    {
        path: "/mylogs",
        func: mylogs
    }
]