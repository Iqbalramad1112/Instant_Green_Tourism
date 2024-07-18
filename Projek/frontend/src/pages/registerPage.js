export default function registerPage() {
    return `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: sans-serif;
            }

            a, button {
                cursor: pointer;
            }

            a {
                text-decoration: none;
            }

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
                <h2 class="login-header">Register</h2>

                <div class="login-main">
                    <form id="signupForm">
                        <label for="nama-InputRegister">
                            <span>Nama Lengkap:</span>
                            <input type="text" id="namaInputRegister" name="name" required>
                        </label>
                        <label for="email-InputRegister">
                            <span>Email:</span>
                            <input type="text" id="emailInputRegister" name="email" required>
                        </label>
                        <label for="noTelephone-InputRegister">
                            <span>No. Telepon:</span>
                            <input type="text" id="noTelephoneInputRegister" name="phone" required>
                        </label>
                        <label for="password">
                            <span>Password:</span>
                            <input type="password" id="password" name="password" required>
                        </label>
                        <label for="confirmPassword">
                            <span>Konfirmasi Password:</span>
                            <input type="password" id="confirmPassword" name="confirmPassword" required>
                        </label>
                        <button type="submit" class="button-login">Register</button>
                    </form>
                </div>
            
                <div id="toast"><div id="desc"></div></div>

                <div class="login-footer">
                    <span>Sudah punya akun? <a href="#/login">Masuk</a></span>
                </div>
            </div>
        </div>
    `;
}

export function initRegisterPage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }

    document.getElementById('signupForm').addEventListener('submit', async function(event) {
        event.preventDefault();
    
        const name = document.getElementById('namaInputRegister').value;
        const email = document.getElementById('emailInputRegister').value;
        const phone = document.getElementById('noTelephoneInputRegister').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password.length < 8) {
            showToast('Password mesti 8 karakter.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, password, confirmPassword })
            });
    
            const result = await response.json();
            if (response.ok) {
                showToast('Signup Complete!');
                setTimeout(() => {
                    window.location.href = '#/login';
                }, 1500);
            } else {
                showToast('Registration failed: ' + result.error);
            }
        } catch (error) {
            showToast('Network error: ' + error.message);
        }
    });
    
}
