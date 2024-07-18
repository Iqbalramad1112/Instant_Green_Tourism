export default function tourPage() {
    return `
        <header>
            <nav>
                <span>Tour</span>
                <img src="/images/Instant Green Tourism_transparent.png" alt="logo">
                <a href="#/">Kembali</a>
            </nav>
        </header>
        <main>
            <div id="search" class="search-container">
                <h3>Temukan Liburan Terbaik Anda di Sini</h3>
                <div class="input-container">
                    <button id="inputSubmit"></button>
                    <input type="text" id="inputUser" placeholder="Tempat Liburan" required>
                    <button id="clearSearch">X</button>
                </div>
            </div>
            <div id="search-results-container"></div>
            <div class="tour-container">
                <h3>Tour Tersedia</h3>
                <div class="tour-list">
                    <div id="tours-container"></div>
                </div>
            </div>
            <div id="toast"><div id="desc"></div></div>
        </main>
        <footer>
            <div class="footer-description">
                <img src="/images/Instant Green Tourism_transparent.png" alt="logo">
                <p>Dengan mengggunakan Instant Green Tourism, pengguna dapat dengan mudah merencanakan perjalanan wisata mereka
                    tanpa harus mencari informasi dari berbagai sumber. Semua informasi dan layanan dapat ditemukan dalam satu
                    platform yang terupdate dan terpercaya.</p>
            </div>
            <div class="footer-cb">
                <div class="footer-menu">
                    <h3>Menu</h3>
                    <ul>
                        <li><a href="#/tour">Tour</a></li>
                        <li><a href="#/package">Paket Wisata</a></li>
                        <li><a href="#/insurance">Asuransi Perjalanan</a></li>
                        <li><a href="#/documentation">Dokumentasi</a></li>
                    </ul>
                </div>
                <div class="footer-sosial-media">
                    <h3>Sosial Media</h3>
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://github.com/MJAZain/Projek-Capstone-BDT24-FS037" target="_blank" rel="noopener noreferrer">Github</a></li>
                        <li><a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    `;
}

export function initTourPage() {
    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function () {
            toast.style.visibility = "hidden";
        }, 3000);
    }

    const userEmail = localStorage.getItem('userEmail');
    const authToken = localStorage.getItem('token');

    async function fetchTours() {
        console.log('Fetching tours...');
        try {
            const response = await fetch('http://localhost:5000/api/tours');
            if (!response.ok) {
                console.error('Failed to fetch tours:', response.status, response.statusText);
                throw new Error('Failed to fetch tours');
            }
            const tours = await response.json();
            console.log('Tours fetched successfully:', tours);
            displayTours(tours);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    }

    function displayTours(tours) {
        const toursContainer = document.getElementById('tours-container');
        toursContainer.innerHTML = '';

        if (tours.length === 0) {
            toursContainer.innerHTML = '<p>No tours available.</p>';
            return;
        }

        tours.forEach(tour => {
            const tourDiv = document.createElement('div');
            tourDiv.className = 'tour';

            const tourTitle = document.createElement('h2');
            tourTitle.textContent = tour.title;
            tourDiv.appendChild(tourTitle);

            const tourLocations = document.createElement('p');
            tourLocations.textContent = `Locations: ${tour.locations}`;
            tourDiv.appendChild(tourLocations);

            const tourDate = document.createElement('p');
            tourDate.className = 'date';
            tourDate.textContent = `Date: ${new Date(tour.date).toLocaleDateString()}`;
            tourDiv.appendChild(tourDate);

            const tourDescription = document.createElement('p');
            tourDescription.textContent = tour.description;
            tourDiv.appendChild(tourDescription);

            const tourPrice = document.createElement('p');
            tourPrice.textContent = `Price: IDR ${tour.price}`;
            tourDiv.appendChild(tourPrice);

            fetch(`http://localhost:5000/api/tours/${tour._id}/image`)
                .then(response => {
                    if (!response.ok) {
                        console.error('Failed to fetch tour image:', response.status, response.statusText);
                        throw new Error('Failed to fetch tour image');
                    }
                    return response.blob();
                })
                .then(blob => {
                    const tourImage = document.createElement('img');
                    const url = URL.createObjectURL(blob);
                    tourImage.src = url;
                    tourDiv.insertBefore(tourImage, tourTitle);
                })
                .catch(error => {
                    console.error('Error fetching tour image:', error);
                });

            const orderButton = document.createElement('button');
            orderButton.textContent = 'Order';
            orderButton.className = 'order-button';
            orderButton.addEventListener('click', () => {
                console.log('Order button clicked for tour:', tour._id);
                if (userEmail && authToken) {
                    console.log('Placing order with email:', userEmail, 'authToken:', authToken);
                    fetch('http://localhost:5000/api/order-tours/place-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify({
                            email: userEmail,
                            tourId: tour._id,
                        }),
                    })
                    .then(response => {
                        console.log('Response status:', response.status); // Debug log
                        if (!response.ok) {
                            if (response.status === 400) {
                                return response.json().then(data => {
                                    showToast(data.message);
                                    throw new Error('Failed to place order: ' + data.message);
                                });
                            }
                            console.error('Failed to place order:', response.status, response.statusText);
                            throw new Error('Failed to place order');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Order placed successfully:', data);
                        showToast(data.message);
                    })
                    .catch(error => {
                        console.error('Error placing order:', error);
                        if (error.message.includes('Failed to place order:')) {
                            showToast(error.message);
                        } else {
                            showToast('Error placing order.');
                        }
                    });
                } else {
                    console.error('User email or auth token not found in localStorage.');
                    showToast('User email or auth token not found in localStorage.');
                }
            });
            
            tourDiv.appendChild(orderButton);

            toursContainer.appendChild(tourDiv);
        });
    }

    document.getElementById('inputSubmit').addEventListener('click', async function () {
        const searchInput = document.getElementById('inputUser').value.trim().toLowerCase();
        if (searchInput === '') {
            showToast('Please enter a search term.');
            return;
        }
    
        async function fetchTours() {
            try {
                const response = await fetch('http://localhost:5000/api/tours');
                if (!response.ok) {
                    console.error('Failed to fetch tours:', response.status, response.statusText);
                    throw new Error('Failed to fetch tours');
                }
                const tours = await response.json();
                return tours;
            } catch (error) {
                console.error('Error fetching tours:', error);
                showToast('Error fetching tours.');
                return [];
            }
        }
    
        function displaySearchResults(tours) {
            const searchResultsContainer = document.getElementById('search-results-container');
            searchResultsContainer.innerHTML = '';
    
            if (tours.length === 0) {
                searchResultsContainer.innerHTML = '<p>No matching tours found.</p>';
                return;
            }
    
            tours.forEach(tour => {
                const tourDiv = document.createElement('div');
                tourDiv.className = 'tour';
    
                const tourTitle = document.createElement('h2');
                tourTitle.textContent = tour.title;
                tourDiv.appendChild(tourTitle);
    
                const tourLocations = document.createElement('p');
                tourLocations.textContent = `Locations: ${tour.locations}`;
                tourDiv.appendChild(tourLocations);
    
                const tourDate = document.createElement('p');
                tourDate.className = 'date';
                tourDate.textContent = `Date: ${new Date(tour.date).toLocaleDateString()}`;
                tourDiv.appendChild(tourDate);
    
                const tourDescription = document.createElement('p');
                tourDescription.textContent = tour.description;
                tourDiv.appendChild(tourDescription);
    
                const tourPrice = document.createElement('p');
                tourPrice.textContent = `Price: IDR ${tour.price}`;
                tourDiv.appendChild(tourPrice);
    
                fetch(`http://localhost:5000/api/tours/${tour._id}/image`)
                    .then(response => {
                        if (!response.ok) {
                            console.error('Failed to fetch tour image:', response.status, response.statusText);
                            throw new Error('Failed to fetch tour image');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        const tourImage = document.createElement('img');
                        const url = URL.createObjectURL(blob);
                        tourImage.src = url;
                        tourDiv.insertBefore(tourImage, tourTitle);
                    })
                    .catch(error => {
                        console.error('Error fetching tour image:', error);
                    });
    
                const orderButton = document.createElement('button');
                orderButton.textContent = 'Order';
                orderButton.className = 'order-button';
                orderButton.addEventListener('click', () => {
                    console.log('Order button clicked for tour:', tour._id);
                    if (userEmail && authToken) {
                        console.log('Placing order with email:', userEmail, 'authToken:', authToken);
                        fetch('http://localhost:5000/api/order-tours', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${authToken}`
                            },
                            body: JSON.stringify({
                                email: userEmail,
                                tourId: tour._id,
                            }),
                        })
                        .then(response => {
                            if (!response.ok) {
                                if (response.status === 400) {
                                    return response.json().then(data => {
                                        showToast(data.message);
                                        throw new Error('Failed to place order: ' + data.message);
                                    });
                                }
                                console.error('Failed to place order:', response.status, response.statusText);
                                throw new Error('Failed to place order');
                            }
                            return response.json();
                        })
                        .then(data => {
                            console.log('Order placed successfully:', data);
                            showToast(data.message);
                        })
                        .catch(error => {
                            console.error('Error placing order:', error);
                            if (error.message.includes('Failed to place order:')) {
                                showToast(error.message);
                            } else {
                                showToast('Error placing order.');
                            }
                        });
                    } else {
                        console.error('User email or auth token not found in localStorage.');
                        showToast('User email or auth token not found in localStorage.');
                    }
                });
                tourDiv.appendChild(orderButton);
    
                searchResultsContainer.appendChild(tourDiv);
            });
        }
    
        const userEmail = localStorage.getItem('userEmail');
        const authToken = localStorage.getItem('token');
        const tours = await fetchTours();
        const filteredTours = tours.filter(tour => tour.title.toLowerCase().includes(searchInput));
        displaySearchResults(filteredTours);
    });
    
    document.getElementById('clearSearch').addEventListener('click', function () {
        document.getElementById('inputUser').value = '';
        document.getElementById('search-results-container').innerHTML = '';
    });

    (async () => {
        await fetchTours();
    })();
}




