/**
 * Script Portofolio Nidia
 * Fitur: Dark Mode, Modal Detail, & EmailJS
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. INISIALISASI MODAL BOOTSTRAP ---
    // Fungsi ini menangani klik pada tombol sertifikat agar muncul pop-up
    const modalElement = document.getElementById('projectModal');
    const projectModal = new bootstrap.Modal(modalElement);

    // Menangani semua tombol dengan class 'detail-btn'
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('detail-btn')) {
            const title = e.target.getAttribute('data-title');
            const desc = e.target.getAttribute('data-desc');
            
            // Masukkan teks ke dalam modal
            document.querySelector('.modal-title').innerText = title;
            document.getElementById('modalDescription').innerText = desc;
            
            // Tampilkan modal
            projectModal.show();
        }
    });

    // --- 2. FITUR DARK MODE ---
    const themeBtn = document.getElementById('darkModeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Ganti ikon bulan/matahari
            const icon = themeBtn.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.replace('bi-moon-stars', 'bi-sun');
            } else {
                icon.classList.replace('bi-sun', 'bi-moon-stars');
            }
        });
    }

    // --- 3. FITUR KIRIM PESAN (EMAILJS) ---
    const contactForm = document.getElementById('contact-form');
    const btnKirim = document.getElementById('btn-kirim');
    const statusMsg = document.getElementById('status-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Efek Loading pada tombol
            btnKirim.disabled = true;
            btnKirim.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Mengirim...';

            // GANTI ID DI BAWAH INI SESUAI AKUN EMAILJS ANDA
            // emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formElement)
            emailjs.sendForm('service_nidia', 'template_nidia', this)
                .then(function() {
                    statusMsg.className = "alert alert-success mt-3";
                    statusMsg.innerHTML = "Pesan Berhasil Terkirim!";
                    statusMsg.classList.remove('d-none');
                    contactForm.reset();
                }, function(error) {
                    statusMsg.className = "alert alert-danger mt-3";
                    statusMsg.innerHTML = "Gagal Mengirim: " + JSON.stringify(error);
                    statusMsg.classList.remove('d-none');
                })
                .finally(() => {
                    btnKirim.disabled = false;
                    btnKirim.innerHTML = '<i class="bi bi-send-fill me-2"></i>Kirim Sekarang';
                });
        });
    }
});