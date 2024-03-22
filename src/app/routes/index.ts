import {Routes } from "@angular/router";

export const routes : Routes =[
    {
        path: 'results',
        loadChildren: () => import('../components/sncf/routes/index').then(item => item.resultRoutes)
    }
]