export default function homePage() {
    return `
        <div class="main-pages-container" id="mainContent">
        <header>
            <a href="#produk" tabindex="1" class="skip-link">Skip to main content</a>
                <div class="container-nav">
                    <div class="navbar-left-side">
                        <img src="/images/Instant Green Tourism_transparent.png" alt="Green Tourism" class="navbar-logo">
                        <select class="navbar-cb">
                            <option value="" disabled selected>Pilih Layanan</option>
                            <option value="tour">Tour</option>
                            <option value="package">Paket Wisata</option>
                            <option value="insurance">Asuransi Perjalanan</option>
                            <option value="documentation">Dokumentasi</option>
                        </select>
                    </div>
                    <ul class="navbar-dropdown" id="authLinks">
                        <li><a href="#/login" class="navbar-link" tabindex="3">Login</a></li>
                        <li><a href="#/register" class="navbar-link" tabindex="4">Register</a></li>
                    </ul>
                </div>
            </header>
            <main id="mainContent">
                <div id="carousel" class="carousel-slide">
                    <h1>Instant Green Capstone</h1>
                    <h3>Temukan Liburan Mimpi Anda!</h3>
                </div>

                <div class="produk-container" id="produk">
                    <div class="produk-title">
                        <h2>Produk & Layanan Kami</h2>
                        <p>Rekomendasi Produk & Layanan untuk Perjalanan Anda</p>
                    </div>
                    <ul class="produk-list">
                        <li><a href="#/tour" class="produk-link">Tour</a></li>
                        <li><a href="#/package" class="produk-link">Paket Wisata</a></li>
                        <li><a href="#/insurance" class="produk-link">Asuransi Perjalanan</a></li>
                        <li><a href="#/documentation" class="produk-link">Dokumentasi</a></li>
                    </ul>
                </div>

                <div class="layanan-container">
                    <div class="layanan-title">
                        <h2>Mulai Perjalanan Anda</h2>
                    </div>
                    <ul class="layanan-list">
                        <li><a href="#/tour" class="layanan-link">BALI</a></li>
                        <li><a href="#/tour" class="layanan-link">YOGYAKARTA</a></li>
                        <li><a href="#/tour" class="layanan-link">MALANG</a></li>
                        <li><a href="#/tour" class="layanan-link">LOMBOK</a></li>
                    </ul>
                </div>
                <div class="why-container">
                    <div class="why-title">
                        <h2>Mengapa Instant Green Tourism</h2>
                    </div>
                    <div class="why-list">
                        <div class="why-box">
                            <h1>1#</h1>
                            <h2>Kualitas Pelayanan</h2>
                            <p>Kerja keras serta pelayanan dengan sepenuh hati merupakan dedikasi kami untuk memberikan kualitas terbaik
                                bagi anda.</p>
                        </div>
                        <div class="why-box">
                            <h1>2#</h1>
                            <h2>Terbaik</h2>
                            <p>Menawarkan produk perjalanan yang lengkap dan terbaik untuk mewujudkan pengalaman yang tak terlupakan.
                            </p>
                        </div>
                        <div class="why-box">
                            <h1>3#</h1>
                            <h2>Mudah dan Efisien</h2>
                            <p>Dengan teknologi yang terintegrasi, kami memberikan akses kemudahan pelayanan anda yang didukung dengan
                                harga efisien.</p>
                        </div>
                    </div>
                </div>
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
        </div>
    `;
}

export function initHomePage() {
    document.querySelector('.navbar-cb').addEventListener('change', function () {
        const value = this.value;
        if (value) {
            window.location.hash = `#/${value}`;
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        updateAuthLinks();
    });

    function updateAuthLinks() {
        const userName = localStorage.getItem('userName');
        const authLinks = document.getElementById('authLinks');

        if (authLinks) {
            if (userName) {
                authLinks.innerHTML = `
                    <li><div id="msg">Selamat datang, ${userName}!</div></li>
                    <li><a href="#/profile" id="profileLink" class="navbar-link" tabindex="4">Profile</a></li>
                `;
            } else {
                authLinks.innerHTML = `
                    <li><a href="#/login" class="navbar-link" tabindex="3">Login</a></li>
                    <li><a href="#/register" class="navbar-link" tabindex="4">Register</a></li>
                `;
            }
        } else {
            console.error('Element with id "authLinks" not found.');
        }
    }

    window.addEventListener('hashchange', function() {
        updateAuthLinks();
    });
    
    updateAuthLinks();
}
