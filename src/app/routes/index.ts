import {Routes } from "@angular/router";

export const routes : Routes =[
    {
        path: 'people',
        loadChildren: () => import('../components/bureaux/routes/index').then(item => item.peopleRoutes)
    }
]