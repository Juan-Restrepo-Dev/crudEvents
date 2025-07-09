import{}from "../../services/service-products.js"

// const activeUser = JSON.parse(sessionStorage.getItem('userLog'));

// document.getElementById('email').value = activeUser.email;
// document.getElementById('firstName').value = activeUser.firstName;
// document.getElementById('lastName').value = activeUser.lastName;
// document.getElementById('country').value = activeUser.country;
// document.getElementById('city').value = activeUser.city;
// document.getElementById('phone').value = activeUser.phone;
// document.getElementById('age').value = activeUser.age;



document.getElementById('saveProduct').addEventListener('click', function (e) {
  e.preventDefault();

  const updatedUser = {
    email: document.getElementById('email').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    age: document.getElementById('age').value,
    codigo: document.getElementById('codigo').value
  };

  localStorage.setItem('userLog', JSON.stringify(updatedUser));
  sessionStorage.setItem('userLog', JSON.stringify(updatedUser));

  alert('Información actualizada correctamente');
});

