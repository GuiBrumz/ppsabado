const data = new Date();
let mesAtual = data.getMonth();
let anoAtual = data.getFullYear();

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const diasContainer = document.querySelector('.dias');
const mesAno = document.getElementById('mesAno');
const dataCompleta = document.getElementById('dataCompleta');

// Função para renderizar o calendário
function renderizarCalendario() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const diasNoMes = ultimoDiaMes.getDate();
    const primeiroDiaSemana = primeiroDiaMes.getDay();
    
    mesAno.textContent = `${meses[mesAtual]} ${anoAtual}`;
    dataCompleta.textContent = `Quarta-Feira, 01 ${meses[mesAtual]}, ${anoAtual}`; // Ajuste conforme necessário
    
    diasContainer.innerHTML = '';

    // Preencher dias do mês anterior
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.classList.add('dia-mes-anterior');
        diasContainer.appendChild(diaVazio);
    }

    // Preencher dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.textContent = dia;
        diaElemento.classList.add('dia');
        diaElemento.dataset.dia = dia; // Atribuir o dia ao dataset
        diaElemento.addEventListener('click', () => selecionarDia(diaElemento));
        diasContainer.appendChild(diaElemento);
    }

    // Exibir tarefas se houver
    exibirTarefas();
}

// Função para navegar pelos meses
document.querySelector('.prev').addEventListener('click', () => {
    mesAtual--;
    if (mesAtual < 0) {
        mesAtual = 11;
        anoAtual--;
    }
    renderizarCalendario();
});

document.querySelector('.next').addEventListener('click', () => {
    mesAtual++;
    if (mesAtual > 11) {
        mesAtual = 0;
        anoAtual++;
    }
    renderizarCalendario();
});

// Função para adicionar uma tarefa ao dia selecionado
let tarefas = {};

document.getElementById('adicionarTarefa').addEventListener('click', () => {
    const descricao = document.getElementById('descricaoTarefa').value;
    const dataTarefa = document.getElementById('dataTarefa').value;
    const horaTarefa = document.getElementById('horaTarefa').value;
    const importancia = document.getElementById('nivelImportancia').value;

    if (!descricao || !dataTarefa || !horaTarefa) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const [ano, mes, dia] = dataTarefa.split('-');
    const chave = `${ano}-${mes}-${dia}`;

    if (!tarefas[chave]) {
        tarefas[chave] = [];
    }

    tarefas[chave].push({ descricao, hora: horaTarefa, importancia });

    renderizarCalendario();
    alert("Tarefa adicionada com sucesso!");
});

// Função para exibir as tarefas no calendário
function exibirTarefas() {
    Object.keys(tarefas).forEach(chave => {
        const [ano, mes, dia] = chave.split('-');
        if (parseInt(ano) === anoAtual && parseInt(mes) - 1 === mesAtual) {
            const diaElemento = document.querySelector(`.dia[data-dia="${parseInt(dia)}"]`);

            if (diaElemento) {
                diaElemento.innerHTML = `<strong>${dia}</strong>`;
                tarefas[chave].forEach(tarefa => {
                    const tarefaDiv = document.createElement('div');
                    tarefaDiv.textContent = `${tarefa.hora} - ${tarefa.descricao}`;
                    tarefaDiv.style.fontSize = '0.8rem';
                    if (tarefa.importancia === 'alto') {
                        tarefaDiv.style.color = 'red';
                    } else if (tarefa.importancia === 'medio') {
                        tarefaDiv.style.color = 'orange';
                    } else {
                        tarefaDiv.style.color = 'green';
                    }
                    diaElemento.appendChild(tarefaDiv);
                });
            }
        }
    });
}

// Inicializar o calendário
renderizarCalendario();

// Selecionar elementos do modal
const modal = document.getElementById('modalTarefas');
const spanFechar = document.querySelector('.fechar');
const diaSelecionadoElem = document.getElementById('diaSelecionado');
const listaTarefasElem = document.getElementById('listaTarefas');

// Função para abrir o modal e exibir as tarefas do dia selecionado
function selecionarDia(diaElemento) {
    const dia = diaElemento.dataset.dia;
    const mes = mesAtual + 1; // Como o mês é indexado de 0 a 11, somamos 1
    const chave = `${anoAtual}-${mes.toString().padStart(2, '0')}-${dia.padStart(2, '0')}`;

    diaSelecionadoElem.textContent = `${dia}/${mes}/${anoAtual}`;
    listaTarefasElem.innerHTML = ''; // Limpar tarefas anteriores

    if (tarefas[chave] && tarefas[chave].length > 0) {
        // Adicionar as tarefas à lista
        tarefas[chave].forEach(tarefa => {
            const li = document.createElement('li');
            li.textContent = `${tarefa.hora} - ${tarefa.descricao} (Importância: ${tarefa.importancia})`;
            listaTarefasElem.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = "Nenhuma tarefa para este dia.";
        listaTarefasElem.appendChild(li);
    }

    // Exibir o modal
    modal.style.display = 'flex';
}

// Função para fechar o modal
spanFechar.onclick = function() {
    modal.style.display = 'none';
}

// Fechar o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Atualizar o calendário para chamar a função selecionarDia ao clicar em um dia
function renderizarCalendario() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const diasNoMes = ultimoDiaMes.getDate();
    const primeiroDiaSemana = primeiroDiaMes.getDay();
    
    mesAno.textContent = `${meses[mesAtual]} ${anoAtual}`;
    dataCompleta.textContent = `Quarta-Feira, 01 ${meses[mesAtual]}, ${anoAtual}`; // Ajuste conforme necessário
    
    diasContainer.innerHTML = '';

    // Preencher dias do mês anterior
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.classList.add('dia-mes-anterior');
        diasContainer.appendChild(diaVazio);
    }

    // Preencher dias do mês atual
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.textContent = dia;
        diaElemento.classList.add('dia');
        diaElemento.dataset.dia = String(dia).padStart(2, '0'); // Padronizar o dia com 2 dígitos
        diaElemento.addEventListener('click', () => selecionarDia(diaElemento));
        diasContainer.appendChild(diaElemento);
    }

    // Exibir tarefas se houver
    exibirTarefas();
}