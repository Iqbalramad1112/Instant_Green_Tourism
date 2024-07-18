export default function forgotPage() {
    return `
    <div class="login-wrapper">
        <div class="container">
            <h1>Forgot Password</h1>
            <form id="forgotPasswordForm">
                <label for="forgotPasswordInput">
                    <span>Email *</span>
                    <input type="text" required id="forgotPasswordInput">
                </label>
                <button id="forgotPasswordButton">Enter</button>
            </form>
        </div>
        <div id="toast"><div id="desc"></div></div>
    </div>
    `;
}

export function initForgotPage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function() {
            toast.style.visibility = "hidden";
        }, 3000);
    }

    document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('forgotPasswordInput').value;

        try {
            const response = await fetch('http://localhost:5000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send reset code');
            }

            showToast('Reset code sent to your email');
            setTimeout(() => {
                window.location.href = `#/verification?email=${encodeURIComponent(email)}`;
            }, 3000);
        } catch (error) {
            showToast(error.message);
        }
    });
}
