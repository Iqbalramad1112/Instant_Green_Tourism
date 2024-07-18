import '../styles/documentation';
import '../styles/main';
import '../styles/user';
import '../styles/footer';
import '../styles/login-signup';
import '../styles/navbar';
import '../styles/profile';
import '../styles/package';
import '../styles/tour';
import '../styles/insurance';

import router from './router.js';
import { initHomePage } from '../pages/homePage.js';
import { initLoginPage } from '../pages/loginPage.js';
import { initRegisterPage } from '../pages/registerPage.js';
import { initTourPage } from '../pages/tourPage.js';
import { initPackagePage } from '../pages/packagePage.js';
import { initDocumentationPage } from '../pages/documentationPage.js';
import { initForgotPage } from '../pages/forgotPage.js';
import { initVerificationPage } from '../pages/verificationPage.js';
import { initResetPage } from '../pages/resetPage.js';
import { initProfilePage } from '../pages/profilePage.js';

document.addEventListener('DOMContentLoaded', () => {
    router();

    const path = location.hash.slice(1).toLowerCase() || '/';
    switch (path) {
        case '/login':
            initLoginPage();
            break;
        case '/register':
            initRegisterPage();
            break;
        case '/tour':
            initTourPage();
            break;
        case '/package':
            initPackagePage();
            break;
        case '/documentation':
            initDocumentationPage();
            break;
        case '/forgot-password':
            initForgotPage();
            break;
        case '/verification':
            initVerificationPage();
            break;
        case '/reset-password':
            initResetPage();
            break;
        case '/profile':
            initProfilePage();
            break;
        default:
            initHomePage();
            break;
    }
});
