// Função para adicionar destaque ao item do menu clicado
const menuItems = document.querySelectorAll('.sidebar nav ul li a');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove a classe 'active' de todos os itens
        menuItems.forEach(link => link.classList.remove('active'));
        // Adiciona a classe 'active' ao item clicado
        this.classList.add('active');
    });
});

// Função para voltar ao topo da página
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.backgroundColor = '#0077b6';
scrollToTopButton.style.color = 'white';
scrollToTopButton.style.border = 'none';
scrollToTopButton.style.borderRadius = '5px';
scrollToTopButton.style.padding = '10px';
scrollToTopButton.style.cursor = 'pointer';
scrollToTopButton.style.display = 'none'; // Inicialmente oculto

document.body.appendChild(scrollToTopButton);

// Mostrar ou esconder o botão de rolagem
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Adicionar o evento de clique para rolar para o topo
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
});
