export default function resetPage() {
    return `
        <div class="login-wrapper">
            <div class="container">
            <h2>Reset Password</h2>
            <form id="resetPasswordForm">
                <input type="hidden" id="emailInput" name="email">
                <input type="hidden" id="tokenInput" name="token">
                <label for="resetPasswordInput">
                    <span>Password *</span>
                    <input type="password" required id="resetPasswordInput" name="newPassword" autocomplete="new-password">
                </label>
                <label for="confirmResetPasswordInput">
                    <span>Confirm Password *</span>
                    <input type="password" required id="confirmResetPasswordInput" name="confirmPassword" autocomplete="new-password">
                </label>
                <button type="submit" id="resetPasswordButton">Reset Password</button>
            </form>
            <div id="toast"><div id="desc"></div></div>
        </div>
        </div>
    `;
}

export function initResetPage() {
    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        const token = urlParams.get('token');
        document.getElementById('emailInput').value = email;
        document.getElementById('tokenInput').value = token;
    });

    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }

    document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('resetPasswordInput').value;
        const confirmPassword = document.getElementById('confirmResetPasswordInput').value;
        const email = document.getElementById('emailInput').value;
        const token = document.getElementById('tokenInput').value;

        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, newPassword }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            showToast('Password reset successful');
            setTimeout(() => {
                window.location.href = '#/login';
            }, 3000);
        } catch (error) {
            showToast(error.message);
        }
    });
}
