import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~/app/app.js';
import { StoreProvider } from '~/common/components/components.js';
import { store } from '~/framework/store/store.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StoreProvider store={store.instance}>
            <App />
        </StoreProvider>
    </StrictMode>,
);
