class Aluno {
    constructor(nome, curso, quantidadeModulos, valorPorModulo, data = null) {
        this.nome = nome;
        this.curso = curso;
        this.quantidadeModulos = parseInt(quantidadeModulos);
        this.valorPorModulo = parseFloat(valorPorModulo);
        this.data = data ? data : new Date().toLocaleString();
    }

    calcularCustoTotal() {
        return this.quantidadeModulos * this.valorPorModulo;
    }
}

// Função para carregar registros do LocalStorage e exibi-los na tabela
function carregarRegistros() {
    const registrosSalvos = JSON.parse(localStorage.getItem('alunos')) || [];
    registrosSalvos.forEach(aluno => {
        adicionarRegistroNaTabela(new Aluno(aluno.nome, aluno.curso, aluno.quantidadeModulos, aluno.valorPorModulo, aluno.data));
    });
}

// Função para salvar os registros no LocalStorage
function salvarRegistros() {
    const registros = [];
    document.querySelectorAll("#lista-registros tr").forEach(linha => {
        const colunas = linha.querySelectorAll("td");
        registros.push({
            nome: colunas[0].textContent,
            curso: colunas[1].textContent,
            quantidadeModulos: parseInt(colunas[2].textContent),
            valorPorModulo: parseFloat(colunas[3].textContent.replace("R$ ", "").replace(",", ".")),
            data: colunas[5].textContent
        });
    });
    localStorage.setItem('alunos', JSON.stringify(registros));
}

// Evento para capturar o envio do formulário
document.getElementById('form-registro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nomeAluno').value;
    const curso = document.getElementById('curso').value;
    const quantidadeModulos = document.getElementById('quantidadeModulos').value;
    const valorPorModulo = document.getElementById('valorPorModulo').value;
    
    const aluno = new Aluno(nome, curso, quantidadeModulos, valorPorModulo);
    adicionarRegistroNaTabela(aluno);
    salvarRegistros();
    
    this.reset();
});

// Função para adicionar um registro na tabela
function adicionarRegistroNaTabela(aluno) {
    const tabela = document.getElementById('lista-registros');
    const linha = document.createElement('tr');
    linha.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.curso}</td>
        <td>${aluno.quantidadeModulos}</td>
        <td>R$ ${aluno.valorPorModulo.toFixed(2)}</td>
        <td>R$ ${aluno.calcularCustoTotal().toFixed(2)}</td>
        <td>${aluno.data}</td>
        <td><button onclick="removerRegistro(this)">Remover</button></td>
    `;
    tabela.appendChild(linha);
}

// Função para remover um registro e atualizar o LocalStorage
function removerRegistro(botao) {
    botao.parentElement.parentElement.remove();
    salvarRegistros();
}

// Carrega registros ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarRegistros);
