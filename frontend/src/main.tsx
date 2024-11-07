import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

import { App } from '~/app/app.js';
import {
    RouterProvider,
    StoreProvider,
} from '~/common/components/components.js';
import { store } from '~/framework/store/store.js';

import { Landing } from './bundles/landing/pages/landing.js';
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
                element: <div>LIST OF SUPERHEROES</div>,
            },
            {
                path: AppRoute.SUPERHERO,
                element: <div>SUPERHERO DETAILS</div>,
            },
            {
                path: AppRoute.CREATE,
                element: <div>CREATE SUPERHERO</div>,
            },
            {
                path: AppRoute.EDIT,
                element: <div>EDIT SUPERHERO</div>,
            },
        ],
    },
];

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </StoreProvider>
    </StrictMode>,
);
