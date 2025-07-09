const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const country = document.getElementById('country').value.trim();
    const city = document.getElementById('city').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = parseInt(document.getElementById('age').value.trim());

    const message = document.getElementById('message');

    if (age < 14) {
        message.textContent = "Debes tener al menos 14 años para registrarte.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        message.textContent = "Este correo ya está registrado.";
        return;
    }

    const newUser = {
        email, firstName, lastName, country, city, phone, age, role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('activeUser', JSON.stringify(newUser));

    message.classList.remove("error");
    message.classList.add("success");
    message.textContent = "Registro Exitoso";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1500);
});


