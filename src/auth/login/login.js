const users = JSON.parse(localStorage.getItem('users')) || [];

const defaultUsers = [
    {
        email: "lina@email.com",
        password: "1234",
        firstName: "Lina",
        lastName: "Gómez",
        country: "Colombia",
        city: "Medellín",
        phone: "3001234567",
        age: 22,
        role: "user"
    },
    {
        email: "pedro@email.com",
        password: "1234",
        firstName: "Pedro",
        lastName: "Martínez",
        country: "Mexico",
        city: "CDMX",
        phone: "5559876543",
        age: 30,
        role: "user"
    },
    {
        email: "sofia@email.com",
        password: "1234",
        firstName: "Sofía",
        lastName: "Ramírez",
        country: "Argentina",
        city: "Buenos Aires",
        phone: "1123456789",
        age: 19,
        role: "user"
    },
    {
        email: "admin@email.com",
        password: "4321",
        firstName: "altrufio",
        lastName: "mogollon",
        country: "peru",
        city: "Cusco",
        phone: "1111111",
        age: 27,
        role: "admin"
    }
];

defaultUsers.forEach(defaultUser => {
    if (!users.some(u => u.email === defaultUser.email)) {
        users.push(defaultUser);
    }
});

localStorage.setItem('users', JSON.stringify(users));

document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('emailLogin').value.trim();
    const password = document.getElementById('passwordLogin').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem('userLog', JSON.stringify(user));
        window.location.href = "/";
    } else {
        document.getElementById('loginError').textContent = "Correo o Contraseña incorrecta.";
    }
});

document.getElementById('registerBton').addEventListener('click', () => {
    window.location.href = "../register/register.html";
});