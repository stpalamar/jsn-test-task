import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

const NotificationContainer: React.FC = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    );
};

export { NotificationContainer };
