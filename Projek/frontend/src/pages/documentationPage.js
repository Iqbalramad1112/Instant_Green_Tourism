export default function documentationPage() {
    return `
        <header>
            <nav>
                <span>Documentation</span>
                <img src="/images/Instant Green Tourism_transparent.png" alt="logo">
                <a href="#/">Kembali</a>
            </nav>
        </header>
        <main>
            <div class="documentation-container">
                <h2>Documentation Instant Green Tourism</h2>
                <p>Selamat datang di ruang eksklusif dokumentasi kami, suatu tempat dimana setiap foto dan video adalah penjelmaan visual dari setiap serpihan waktu dalam peluangan tak terlupakan. Disini, kami mengundang anda mengendap masuk ke dalam keajaiban penuh warna dan kekayaan yang detail, yang tidak hanya mengabdikan keindahan tetapi juga menghidupkan kembali setiap emosi dan kekaguman yang terpatri dalam setiap perjalanan. Kami harap halaman dokumentasi ini dapat menginspirasi anda serta meyakinkan anda bahwa kami adalah pilihan bijak untuk mewujudkan perjalanan impian anda. Sampai jumpa di perjalanan wisata yang akan datang bersama kami!</p>
            </div>

            <img id="mainImage" src="https://img.freepik.com/free-vector/airport-queue-diversity-composition_1284-71660.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" class="foto"></img>

            <div class="gallery-container">
                <h2>Temukan dunia bersama Instant Green Tourism</h2>
                <h2>Our Gallery</h2>
                <div class="gallery-list">
                    <img id="img1" src="https://img.freepik.com/free-photo/friends-taking-selfie-with-attractions_23-2147846944.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-1">
                    <img id="img2" src="https://img.freepik.com/free-photo/friends-walking-street-with-map_23-2147846931.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-2">
                    <img id="img3" src="https://img.freepik.com/free-photo/friends-walking-street-with-backpacks_23-2147846940.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-3">
                    <img id="img4" src="https://img.freepik.com/free-photo/medium-shot-friends-with-backpacks_23-2149201390.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-4">
                    <img id="img5" src="https://img.freepik.com/free-photo/medium-shot-happy-friends-group_23-2149002992.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-5">
                    <img id="img6" src="https://img.freepik.com/free-photo/medium-shot-teens-walking-together_23-2149183694.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-6">
                    <img id="img7" src="https://img.freepik.com/free-photo/friends-standing-street-with-map-camera_23-2147846962.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-7">
                    <img id="img8" src="https://img.freepik.com/free-photo/successful-hiker-friends-enjoy-view-mountain-peak_23-2148139711.jpg?ga=GA1.2.453597134.1710514333&semt=ais_user" alt="gallery-8">
                </div>
            </div>
        </main>
        <footer>
            <div class="footer-description">
                <img src="/images/Instant Green Tourism_transparent.png" alt="logo">
                <p>Dengan mengggunakan Instant Green Tourism, pengguna dapat dengan mudah merencanakan perjalanan wisata mereka tanpa harus mencari informasi dari berbagai sumber. Semua informasi dan layanan dapat ditemukan dalam satu platform yang terupdate dan terpercaya.</p>
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

export function initDocumentationPage() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('/api/documentation/mainImage')
            .then(response => response.blob())
            .then(imageBlob => {
                const imageObjectURL = URL.createObjectURL(imageBlob);
                document.getElementById('mainImage').src = imageObjectURL;
            });

        for (let i = 1; i <= 8; i++) {
            fetch(`/api/documentation/img${i}`)
                .then(response => response.blob())
                .then(imageBlob => {
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    document.getElementById(`img${i}`).src = imageObjectURL;
                });
        }
    });
}
