export default function verificationPage() {
    return `
    <div class="login-wrapper">
        <div class="container">
            <h1>Verification</h1>
            <form id="verificationForm">
                <label for="verificationInput">
                    <span>Code Verification *</span>
                    <input type="text" required id="verificationInput" name="token">
                </label>
                <div id="timer"></div>
                <input type="hidden" id="emailInput" name="email">
                <button type="submit" id="verificationButton">Verify</button>
            </form>
        </div>
        <div id="toast">
            <div id="desc"></div>
        </div>
    </div>
    `;
}

export function initVerificationPage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        document.getElementById('emailInput').value = email;

        let timer = 60;
        const timerElement = document.getElementById('timer');

        const updateTimer = () => {
            if (timer > 0) {
                timerElement.textContent = `Resend code in ${timer} seconds`;
                timer--;
                setTimeout(updateTimer, 1000);
            } else {
                timerElement.innerHTML = `<a href="#" id="resendLink">Resend code</a>`;
                document.getElementById('resendLink').addEventListener('click', resendCode);
            }
        };

        const resendCode = async (event) => {
            event.preventDefault();
            const email = document.getElementById('emailInput').value;

            try {
                const response = await fetch('http://localhost:5000/api/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                showToast('Reset code resent to your email');
                timer = 60;
                updateTimer();
            } catch (error) {
                showToast(error.message);
            }
        };

        updateTimer();
    });

    document.getElementById('verificationForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = document.getElementById('verificationInput').value;
        const email = document.getElementById('emailInput').value;

        try {
            const response = await fetch('http://localhost:5000/api/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            showToast('Token verified');
            setTimeout(() => {
                window.location.href = `#/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
            }, 3000);
        } catch (error) {
            showToast(error.message);
        }
    });
}
