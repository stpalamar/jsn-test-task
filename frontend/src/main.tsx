import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '~/app/app.js';
import {
    NotificationContainer,
    RouterProvider,
    StoreProvider,
} from '~/common/components/components.js';
import { store } from '~/framework/store/store.js';

import { Landing } from './bundles/landing/pages/landing.js';
import { CreateSuperHero } from './bundles/superheroes/pages/create-superhero.js';
import { EditSuperHero } from './bundles/superheroes/pages/edit-superhero.js';
import { SuperheroDetails } from './bundles/superheroes/pages/superhero-details.js';
import { SuperheroesList } from './bundles/superheroes/pages/superheroes-list.js';
import { AppRoute } from './common/enums/enums.js';

const routes = [
    {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
                path: AppRoute.ROOT,
                element: <Landing />,
            },
            {
                path: AppRoute.SUPERHEROES,
                element: <SuperheroesList />,
            },
            {
                path: AppRoute.SUPERHERO,
                element: <SuperheroDetails />,
            },
            {
                path: AppRoute.CREATE,
                element: <CreateSuperHero />,
            },
            {
                path: AppRoute.EDIT,
                element: <EditSuperHero />,
            },
        ],
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider router={createBrowserRouter(routes)} />
            <NotificationContainer />
        </StoreProvider>
    </StrictMode>,
);
