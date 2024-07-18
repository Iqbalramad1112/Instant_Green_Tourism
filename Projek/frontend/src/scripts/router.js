import homePage, { initHomePage } from '../pages/homePage.js';
import loginPage, { initLoginPage } from '../pages/loginPage.js';
import registerPage, { initRegisterPage } from '../pages/registerPage.js';
import tourPage, { initTourPage } from '../pages/tourPage.js';
import packagePage, { initPackagePage } from '../pages/packagePage.js';
import documentationPage, { initDocumentationPage } from '../pages/documentationPage.js';
import forgotPage, { initForgotPage } from '../pages/forgotPage.js';
import verificationPage, { initVerificationPage } from '../pages/verificationPage.js';
import resetPage, { initResetPage } from '../pages/resetPage.js';
import profilePage, { initProfilePage } from '../pages/profilePage.js';
import insurancePage from '../pages/insurancePage.js';

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/register': registerPage,
    '/tour': tourPage,
    '/package': packagePage,
    '/documentation': documentationPage,
    '/forgot-password': forgotPage,
    '/verification': verificationPage,
    '/reset-password': resetPage,
    '/profile': profilePage,
    '/insurance' : insurancePage
};

const initFunctions = {
    '/': initHomePage,
    '/login': initLoginPage,
    '/register': initRegisterPage,
    '/tour': initTourPage,
    '/package': initPackagePage,
    '/documentation': initDocumentationPage,
    '/forgot-password': initForgotPage,
    '/verification': initVerificationPage,
    '/reset-password': initResetPage,
    '/profile': initProfilePage,
};

function router() {
    const path = location.hash.slice(1).toLowerCase() || '/';
    const app = document.getElementById('webApp');
    if (!app) {
        console.error('mainContent element not found');
        return;
    }
    app.innerHTML = routes[path] ? routes[path]() : homePage();

    if (initFunctions[path]) {
        initFunctions[path]();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export default router;
