export default function packagePage() {
    return `
        <header>
            <nav>
                <span>Package</span>
                <img src="/images/Instant Green Tourism_transparent.png" alt="logo">
                <a href="#/">Kembali</a>
            </nav>
        </header>
        <main>
            <div class="trending-package-container">
                <h2>Trending Package</h2>
                <div class="package-list">
                    <img src="https://img.freepik.com/free-vector/realistic-travel-agency-instagram-posts-collection_23-2149557642.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="package-1">
                    <img src="https://img.freepik.com/free-vector/flat-travel-instagram-stories_23-2149048762.jpg?ga=GA1.2.453597134.1710514333&semt=ais_hybrid" alt="package-2">
                    <img src="https://img.freepik.com/free-vector/travel-sale-instagram-stories-set_23-2148630583.jpg?ga=GA1.2.453597134.1710514333&semt=ais_hybrid" alt="package-3">
                </div>
            </div>
            <form id="orderForm">
                <div class="pilih-container">
                    <div class="pilih-paket">
                        <h2>Pilih Paket</h2>
                        <select name="paketSeleksi" id="paketCont">
                            <option value="" disabled selected>Pilih Paket</option>
                            <option value="paketA">Paket A</option>
                            <option value="paketB">Paket B</option>
                            <option value="paketC">Paket C</option>
                        </select>
                    </div>
                    <div class="pilih-destinasi">
                        <h2>Pilih Destinasi</h2>
                        <select name="destSeleksi" id="destCont">
                            <option value="" disabled selected>Pilih Destinasi</option>
                            <option value="Bali">Bali</option>
                            <option value="Lombok">Lombok</option>
                            <option value="Malang">Malang</option>
                        </select>
                    </div>
                    <div class="pilih-hari">
                        <div class="tanggal">
                            <h2>Pilih tanggal</h2>
                            <select id="tanggalPilihan"></select>
                        </div>
                        
                        <div class="bulan">
                            <h2>Bulan</h2>
                            <input type="text" id="bulanSekarang" disabled>
                        </div>

                        <div class="tahun">
                            <h2>Tahun</h2>
                            <input type="text" id="tahunSekarang" disabled>
                        </div>
                    </div>
                </div>
                <button>Submit</button>
            </form>
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

export function initPackagePage() {
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const tanggal = new Date();

    const tanggalHariIni = tanggal.getDate();
    const namaBulan = bulan[tanggal.getMonth()];
    const tahun = tanggal.getFullYear();

    for(let i = 1; i <= 31; i++) {
        document.getElementById('tanggalPilihan').innerHTML += `<option>${i}</option>`
    }
    document.getElementById('bulanSekarang').value = namaBulan;
    document.getElementById('tahunSekarang').value = tahun;

    function showToast(message) {
        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");
        desc.textContent = message;
        toast.style.visibility = "visible";
        setTimeout(function(){ toast.style.visibility = "hidden"; }, 3000);
    }

    async function submitOrder(event) {
        event.preventDefault();

        const paket = document.getElementById('paketCont').value;
        const destinasi = document.getElementById('destCont').value;
        const tanggal = document.getElementById('tanggalPilihan').value;
        const userEmail = localStorage.getItem('userEmail'); 

        if (!userEmail) {
            showToast('User is not logged in.');
            return;
        }

        const bulan = document.getElementById('bulanSekarang').value;
        const tahun = document.getElementById('tahunSekarang').value;
        const fullDate = `${tahun}-${bulan}-${tanggal}`;

        const orderData = {
            paket,
            destinasi,
            tanggal: fullDate,
            userEmail 
        };

        try {
            const token = localStorage.getItem('token'); 

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                showToast('Order placed successfully!');
            } else {
                const result = await response.json();
                showToast('Order failed: ' + result.error);
            }
        } catch (error) {
            showToast('Network error: ' + error.message);
        }
    }

    document.getElementById('orderForm').addEventListener('submit', submitOrder);
}
