export default function loginPage() {
    return `
        <style>
            header > a {
                position: absolute;
                top: 24px;
                right: 24px;
                font-size: 1.2rem;
                padding: 10px;
                color: #fff;
            }
        </style>
        <div class="login-wrapper">
            <header>
                <a href="#/">Kembali</a>
            </header>
            <div class="login-container">
                <h2 class="login-header">Login</h2>
                <div class="login-main">
                    <form id="loginForm">
                        <label for="emailInput">
                            <span>Email:</span>
                            <input type="text" id="emailInput" name="email" required>
                        </label>
                        <label for="passwordInput">
                            <span>Password:</span>
                            <input type="password" id="passwordInput" name="password" required>
                        </label>
                        <div class="login-cb">
                            <a href="#">Ingatkan Saya</a>
                            <a href="#/forgot-password">Lupa Password?</a>
                        </div>
                        <button type="submit" class="button-login">Login</button>
                    </form>
                </div>
        
                <div id="toast"><div id="desc"></div></div>
    
                <div class="login-footer">
                    <span>Belum punya akun? <a href="#/register">Daftar</a></span>
                </div>
            </div>
        </div>
    `;
}

export function initLoginPage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            console.log('Login response:', result); // Debug log

            if (response.ok) {
                localStorage.setItem('userName', result.name);
                localStorage.setItem('userEmail', result.email); 
                localStorage.setItem('userPhone', result.phone); 
                localStorage.setItem('token', result.token); 
                console.log('Stored userName:', localStorage.getItem('userName')); 
                console.log('Stored userEmail:', localStorage.getItem('userEmail')); 
                console.log('Stored userPhone:', localStorage.getItem('userPhone')); 
                console.log('Stored token:', localStorage.getItem('token')); 
                showToast('Selamat datang!');
                setTimeout(() => {
                    window.location.href = '#/';
                }, 1500); 
            } else {
                // Handle errors
                console.error('Login error:', result.error);
                showToast('Login failed: ' + result.error);
            }
        } catch (error) {
            console.error('Network error:', error);
            showToast('Network error: ' + error.message);
        }
    });
}
