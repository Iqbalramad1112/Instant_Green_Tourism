export default function profilePage() {
    return `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
            color: #FFF;
            scroll-behavior: smooth;
        }
        
        body {
            background: linear-gradient(360deg, #9ebad3 75%, #9ed3cb) no-repeat center center fixed;
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
    <div class="profile-wrapper">
        <header>
            <a href="#/">Kembali</a>
        </header>

        <div class="profile">
            <div class="profile-info">
                <h2 class="profile-name"></h2>
                <h3 class="profile-number"></h3>
                <h3 class="profile-email"></h3>
            </div>
            <a href="#" id="logoutLink">Logout</a>
        </div>
        <div class="package">
            <h2>Tour</h2>
            <div class="contents">
                <div id="tourCont"></div>
            </div>
        </div>
        <div class="package">
            <h2>Package</h2>
            <div class="contents">
                <div id="packageCont"></div>
            </div>
        </div>
        <div id="toast"><div id="desc"></div></div>
    </div>
    `;
}

export function initProfilePage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }
    
    const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const userPhone = localStorage.getItem('userPhone');

        if (userName && userEmail && userPhone) {
            document.querySelector('.profile-name').textContent = userName;
            document.querySelector('.profile-email').textContent = userEmail;
            document.querySelector('.profile-number').textContent = userPhone;
        } else {
            console.error('User information is not available in localStorage.');
            showToast('User information is not available in localStorage.');
        }

    function logout() {
        localStorage.clear();
        window.location.href = '#/login';
    }

    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault(); 
        logout();
    });

    async function fetchOrders() {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
    
            const orders = await response.json();
            return orders;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    
    async function displayOrders() {
        const orders = await fetchOrders();
    
        const packageCont = document.getElementById('packageCont');
        packageCont.innerHTML = '';
    
        if (orders.length === 0) {
            packageCont.innerHTML = '<p>No orders found.</p>';
            return;
        }
    
        orders.forEach(order => {
            const orderDiv = document.createElement('div');
            orderDiv.classList.add('order-profile');
    
            const paketElement = document.createElement('p');
            paketElement.textContent = `Paket: ${order.paket}`;
            
            const destinasiElement = document.createElement('p');
            destinasiElement.textContent = `Destinasi: ${order.destinasi}`;
            
            const tanggalElement = document.createElement('p');
            tanggalElement.textContent = `Tanggal: ${new Date(order.tanggal).toLocaleDateString()}`;
    
            orderDiv.appendChild(paketElement);
            orderDiv.appendChild(destinasiElement);
            orderDiv.appendChild(tanggalElement);
    
            packageCont.appendChild(orderDiv);
        });
    }

    async function fetchTourOrders() {
        const userEmail = localStorage.getItem('userEmail');
        const authToken = localStorage.getItem('token');
    
        if (!userEmail || !authToken) {
            showToast('User email or auth token not found in localStorage.');
            return [];
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/get-tour-orders?email=${userEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
    
            const orders = await response.json();
            return orders;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    
    async function displayTourOrders() {
        const orders = await fetchTourOrders();
    
        const tourCont = document.getElementById('tourCont');
        tourCont.innerHTML = '';
    
        if (orders.length === 0) {
            tourCont.innerHTML = '<p>No orders found.</p>';
            return;
        }
    
        orders.forEach(order => {
            if (order.tour) {
                const tourDiv = document.createElement('div');
                tourDiv.classList.add('tour-profile');
    
                const tourTitle = document.createElement('h2');
                tourTitle.textContent = order.tour.title;
                tourDiv.appendChild(tourTitle);
    
                const tourLocations = document.createElement('p');
                tourLocations.textContent = `Locations: ${order.tour.locations}`;
                tourDiv.appendChild(tourLocations);
    
                const tourDate = document.createElement('p');
                tourDate.classList.add('date');
                tourDate.textContent = `Date: ${new Date(order.tour.date).toLocaleDateString()}`;
                tourDiv.appendChild(tourDate);
    
                const tourPrice = document.createElement('p');
                tourPrice.textContent = `Price: IDR ${order.tour.price}`;
                tourDiv.appendChild(tourPrice);
    
                tourCont.appendChild(tourDiv);
            } else {
                console.error('Order is missing tour details:', order);
            }
        });
    }
    
    (async () => {
        await displayTourOrders();
        await displayOrders();
    })();
    
}
