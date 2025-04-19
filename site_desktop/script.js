// DYNAMICZNE PODŚWIETLANIE NAWIGACJI ↓↓↓
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("#nawigacja ul li a");

    const observerOptions = {
        root: null,
        threshold: 0.60
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let activeSection = entry.target.getAttribute("id");

                // Usunięcie klasy 'active' ze wszystkich linków
                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                // Dodanie klasy 'active' do odpowiedniego linku
                document.querySelector(`#nawigacja ul li a[href="#${activeSection}"]`)?.classList.add("active");
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));
});


// DARK THEME HANDLER ↓↓↓

const toggleButton = document.getElementById('przelacz_motyw');

// Sprawdzenie, czy użytkownik wcześniej wybrał motyw
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
  toggleButton.textContent = '☀️ Light Mode';
}

// Obsługa kliknięcia przycisku
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
    toggleButton.textContent = '☀️ Light Mode';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    toggleButton.textContent = '🌙 Dark Mode';
  }
});
