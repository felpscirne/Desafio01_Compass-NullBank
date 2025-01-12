document.addEventListener('DOMContentLoaded', function() {
    fetch('../header.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            var menuItems = document.querySelectorAll('.menu li a, .login a.sign-up');

            // Adiciona evento de clique para salvar o ID do botão clicado no localStorage
            menuItems.forEach(function(item) {
                item.addEventListener('click', function() {
                    localStorage.setItem('activeButtonId', item.id);
                });
            });

            // Recupera o ID do botão ativo do localStorage
            var activeButtonId = localStorage.getItem('activeButtonId');

            // Marca o botão ativo com base no ID armazenado
            if (activeButtonId) {
                var activeButton = document.getElementById(activeButtonId);
                if (activeButton) {
                    activeButton.style.color = '#6729FF';
                }
            }
        })
        .catch(error => console.error('Erro ao carregar o header:', error));



    fetch('../footer.html') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));

});