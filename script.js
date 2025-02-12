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
