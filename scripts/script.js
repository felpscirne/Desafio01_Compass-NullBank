document.addEventListener('DOMContentLoaded', function() {
    fetch('../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            var currentPath = window.location.pathname.split('/').pop();
            var menuItems = document.querySelectorAll('.menu li a');

            menuItems.forEach(function(item) {
                if (item.getAttribute('href') === currentPath) {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o header:', error));
});