document.addEventListener('DOMContentLoaded', function() {
    // Carregar e inserir o header
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            addActiveButtonListeners(); // Adiciona os listeners para atualizar o activeButtonId
            applyActiveButtonId(); // Aplica o activeButtonId após carregar o header
        })
        .catch(error => console.error('Erro ao carregar o header:', error));

    // Carregar e inserir o footer
    fetch('footer.html')
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

function applyActiveButtonId() {
    const activeButtonId = localStorage.getItem('activeButtonId');
    if (activeButtonId) {
        const activeButton = document.getElementById(activeButtonId);
        if (activeButton) {
            activeButton.style.color = '#6729FF';
        }
    }
}

function addActiveButtonListeners() {
    const navItems = document.querySelectorAll('header div nav li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            localStorage.setItem('activeButtonId', item.id); 
            applyActiveButtonId(); 
        });
    });
}

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
            } else {
                localStorage.setItem('contactFormData', JSON.stringify({ name, email, message }));
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
            } else {
                // Armazena o email no localStorage
                localStorage.setItem('newsletterEmail', email);
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}