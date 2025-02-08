document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("Dziękujemy za wiadomość, " + name + "!");
            form.reset();
        } else {
            alert("Proszę wypełnić wszystkie pola.");
        }
    });
});
