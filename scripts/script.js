document.addEventListener('DOMContentLoaded', function() {
    if (activeButtonId) {
        var activeButton = document.getElementById(activeButtonId);
        if (activeButton) {
            activeButton.style.color = '#6729FF';
        }
    }

    fetch('../footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            addFooterFormValidation(); 
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));

    addContactFormValidation();
});

function addContactFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                event.preventDefault();
            } else if (!validateEmail(email)) {
                alert('Por favor, insira um endereço de email válido.');
                event.preventDefault();
            }
        });
    }
}

function addFooterFormValidation() {
    const footerForm = document.querySelector('.newsletter');
    if (footerForm) {
        footerForm.addEventListener('submit', function(event) {
            const email = document.getElementById('email').value.trim();

            if (!email) {
                alert('Por favor, insira seu endereço de email.');
                event.preventDefault();
            } else if (!validateEmail(email)) {
                alert('Por favor, insira um endereço de email válido.');
                event.preventDefault();
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}