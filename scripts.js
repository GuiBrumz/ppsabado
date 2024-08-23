let button = document.getElementById("handleSubmit");
 
button.onclick = async function() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let data = {title}
 
    const response = await fetch('http://localhost:3000/api/store/task', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data)
    });
 
    let content = await response.json();
 
    if(content.success) {
        alert("Sucesso")
    } else{
        alert('Não');
    }
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtenha os valores dos campos de entrada
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    // Verifique se os campos não estão vazios
    if (title.trim() !== '' && description.trim() !== '') {
        // Crie um novo elemento de mensagem
        const message = document.createElement('div');
        message.className = 'message';

        // Adicione o título e a descrição da mensagem
        message.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
        `;

        // Adicione a nova mensagem ao contêiner de mensagens
        document.getElementById('messages').appendChild(message);

        // Limpe os campos de entrada
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    } else {
        alert('Postagem feita com sucesso!');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
    var messagesDiv = document.getElementById('messages');

    // Função para renderizar postagens
    function renderPostagens() {
        messagesDiv.innerHTML = '';

        // Mostrar ou esconder o contêiner com base na presença de mensagens
        if (postagensSalvas.length > 0) {
            messagesDiv.style.display = 'block'; // Mostrar contêiner se houver mensagens
        } else {
            messagesDiv.style.display = 'none'; // Esconder contêiner se não houver mensagens
        }

        postagensSalvas.forEach(function(postagem, index) {
            var messageItem = document.createElement('div');
            messageItem.classList.add('message-item');

            var p = document.createElement('p');
            p.textContent = postagem.title + ': ' + postagem.description;

            var deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                postagensSalvas.splice(index, 1);
                localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
                renderPostagens();
            });

            messageItem.appendChild(p);
            messageItem.appendChild(deleteButton);
            messagesDiv.appendChild(messageItem);
        });
    }

    // Renderizar postagens salvas ao carregar a página
    renderPostagens();

    // Adicionar evento de clique ao botão de comentar
    document.getElementById('handleSubmit').addEventListener('click', function() {
        var title = document.getElementById('title').value;
        var description = document.getElementById('description').value;

        if (title && description) {
            postagensSalvas.push({title, description});
            localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
            renderPostagens();
            document.getElementById('title').value = ''; // Limpar o campo de entrada
            document.getElementById('description').value = ''; // Limpar o campo de descrição
        }
    });

    // Adicionar evento de clique ao botão de cancelar (limpar postagens)
    document.getElementById('handleClear').addEventListener('click', function() {
        localStorage.removeItem('postagensSalvas');
        postagensSalvas = [];
        renderPostagens();
    });
});

function redirectToIndex() {
    window.location.href = "index.html";
}