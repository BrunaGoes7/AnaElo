// Arrays para armazenar produtos de entrada e saída
let produtosEntrada = [];
let produtosSaida = [];


// Função para alternar entre as abas
function mostrarAba(aba) {
    document.querySelectorAll('.aba').forEach(div => div.classList.remove('ativa'));
    document.getElementById(aba).classList.add('ativa');
}


// Arrays para armazenar os produtos e produtos vendidos
const produtos = [];
const produtosVendidos = [];
const vendasPorMes = {};
// Função para adicionar produtos manualmente pelo formulário
function adicionarProdutoFormulario() {
    const codigo = document.getElementById('codigo').value;
    const nome = document.getElementById('nome').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const data = document.getElementById('data').value;

    if (!codigo || !nome || !valor || !data) {
        alert("Por favor, preencha todos os campos.");
        return;

        
    }

    adicionarProdutoEntrada(codigo, nome, valor, data);

    // Limpar o formulário após a submissão
    document.getElementById('codigo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('data').value = '';
}

// Função para alternar entre as abas
function mostrarAba(aba) {
    document.querySelectorAll('.aba').forEach(div => div.classList.remove('ativa'));
    document.getElementById(aba).classList.add('ativa');
}

// Função para adicionar produtos na aba de entrada
function adicionarProdutoEntrada(codigo, nome, valor, data) {
    const produto = { codigo, nome, valor, data };
    produtosEntrada.push(produto);
    atualizarTabelaEntrada();
    atualizarDashboard();
}

// Função para excluir produto na aba de entrada
function excluirProdutoEntrada(codigo) {
    const index = produtosEntrada.findIndex(produto => produto.codigo === codigo);
    if (index !== -1) {
        produtosEntrada.splice(index, 1);
        atualizarTabelaEntrada();
        atualizarDashboard();
        atualizarResumoMensal();
    }
}
// Função para mover produto para a aba de saída (vender)
function venderProduto(codigo) {
    const index = produtosEntrada.findIndex(produto => produto.codigo === codigo);
    if (index !== -1) {
        const produto = produtosEntrada.splice(index, 1)[0]; // Remove da entrada
        produtosSaida.push(produto); // Adiciona na saída
        atualizarTabelaEntrada();
        atualizarTabelaSaida();
        atualizarDashboard();
        atualizarResumoMensal(); // Atualizar o resumo mensal também
    }
}


/// Função para excluir o produto da aba saída e retornar para a aba entrada
function excluirProdutoSaida(codigo) {
    const index = produtosSaida.findIndex(produto => produto.codigo === codigo);
    if (index !== -1) {
        const produto = produtosSaida.splice(index, 1)[0]; // Remove da saída
        produtosEntrada.push(produto); // Retorna para a entrada
        atualizarTabelaSaida();
        atualizarTabelaEntrada();
        atualizarDashboard();
        atualizarResumoMensal(); // Atualizar o resumo mensal também
    }
}

// Função para atualizar a tabela de entrada e exibir o valor total
function atualizarTabelaEntrada() {
    const entradaProdutosBody = document.getElementById('entradaProdutosBody');
    entradaProdutosBody.innerHTML = ''; // Limpa a tabela de entrada

    let valorTotalEntrada = 0; // Inicializa o valor total em 0

    produtosEntrada.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>R$${produto.valor}</td>
            <td>${produto.data}</td>
            <td>
                <button onclick="venderProduto('${produto.codigo}')">Vender</button>
                <button onclick="excluirProdutoEntrada('${produto.codigo}')">Excluir</button>
            </td>
        `;
        entradaProdutosBody.appendChild(tr);

        // Soma os valores dos produtos na entrada
        valorTotalEntrada += parseFloat(produto.valor);
    });

    // Exibe o valor total no final da tabela
    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `
        <td colspan="2"><strong>Total de Entrada</strong></td>
        <td colspan="3"><strong>R$${valorTotalEntrada.toFixed(2)}</strong></td>
    `;
    entradaProdutosBody.appendChild(trTotal);
}


  // Função para atualizar a tabela de saída e exibir o valor total
function atualizarTabelaSaida() {
    const saidaProdutosBody = document.getElementById('saidaProdutosBody');
    saidaProdutosBody.innerHTML = ''; // Limpa a tabela de saída

    let valorTotalSaida = 0; // Inicializa o valor total de saída

    produtosSaida.forEach(produto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>R$${produto.valor}</td>
            <td>${produto.data}</td>
            <td>
                <button onclick="excluirProdutoSaida('${produto.codigo}')">Excluir</button>
            </td>
        `;
        saidaProdutosBody.appendChild(tr);

        // Soma os valores dos produtos vendidos
        valorTotalSaida += parseFloat(produto.valor);
    });

    // Exibe o valor total no final da tabela
    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `
        <td colspan="2"><strong>Total de Saída</strong></td>
        <td colspan="3"><strong>R$${valorTotalSaida.toFixed(2)}</strong></td>
    `;
    saidaProdutosBody.appendChild(trTotal);
}



// Função para calcular e exibir o resumo mensal
function atualizarResumoMensal() {
    const resumoMensalDiv = document.getElementById('resumoMensal');
    resumoMensalDiv.innerHTML = ''; // Limpa a área de resumo

    // Objeto para armazenar os totais de cada mês
    const totaisMensais = {};

    produtosEntrada.forEach(produto => {
        const mes = new Date(produto.data).getMonth(); // Obtém o mês da data
        if (!totaisMensais[mes]) {
            totaisMensais[mes] = { entrada: 0, saida: 0 };
        }
        totaisMensais[mes].entrada += parseFloat(produto.valor);
    });

    produtosSaida.forEach(produto => {
        const mes = new Date(produto.data).getMonth(); // Obtém o mês da data
        if (!totaisMensais[mes]) {
            totaisMensais[mes] = { entrada: 0, saida: 0 };
        }
        totaisMensais[mes].saida += parseFloat(produto.valor);
    });

    // Exibe o resumo para cada mês
    Object.keys(totaisMensais).forEach(mes => {
        const mesNome = new Date(2024, mes, 1).toLocaleString('default', { month: 'long' }); // Nome do mês
        resumoMensalDiv.innerHTML += `
            <p>${mesNome}: Entrada - R$${totaisMensais[mes].entrada.toFixed(2)}, Saída - R$${totaisMensais[mes].saida.toFixed(2)}</p>
        `;
    });
}



// Função para atualizar o dashboard com os totais gerais
function atualizarDashboard() {
    const dashboardDiv = document.getElementById('dashboardResumo');
    
    let valorTotalEntrada = 0;
    let valorTotalSaida = 0;

    // Calcula o total de entrada
    produtosEntrada.forEach(produto => {
        valorTotalEntrada += parseFloat(produto.valor);
    });

    // Calcula o total de saída
    produtosSaida.forEach(produto => {
        valorTotalSaida += parseFloat(produto.valor);
    });

    // Calcula o lucro
    const lucro = valorTotalEntrada - valorTotalSaida;

    // Atualiza o dashboard com os totais
    dashboardDiv.innerHTML = `
        <p>Total de Produtos em Entrada: R$${valorTotalEntrada.toFixed(2)}</p>
        <p>Total de Produtos em Saída: R$${valorTotalSaida.toFixed(2)}</p>
        <p>Lucro Total: R$${lucro.toFixed(2)}</p>
    `;
}
// Função para gerar o gráfico no Dashboard
function gerarGraficoDashboard() {
    const ctx = document.getElementById('graficoDashboard').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (pode ser 'line', 'pie', 'bar', etc.)
        data: {
            labels: ['', '', '', '', ''], // Meses (ou outros rótulos)
            datasets: [{
                label: 'Entrada de Produtos',
                data: [30, 50, 40, 60, 70], // Dados de exemplo para entradas
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Saída de Produtos',
                data: [20, 40, 35, 50, 60], // Dados de exemplo para saídas
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true, // Torna o gráfico responsivo
            scales: {
                y: {
                    beginAtZero: true // Inicia o eixo Y a partir do zero
                }
            }
        }
    });
    
}

// Chame a função ao abrir a aba de Dashboard
document.addEventListener('DOMContentLoaded', function() {
    gerarGraficoDashboard();
});



// Adiciona alguns produtos de exemplo para teste
//adicionarProdutoEntrada(1, 'Produto A', 10.00);
//adicionarProdutoEntrada(2, 'Produto B', 15.00);
//adicionarProdutoEntrada(3, 'Produto C', 20.00);

// Inicializa os dados do dashboard e resumo mensal
//atualizarDashboard();
//atualizarResumoMensal();
//dashboardDiv.innerHTML = `
  //  <p>Total de Produtos em Estoque: ${totalEstoque}</p>
    //<p>Total de Produtos Vendidos: ${totalVendas}</p>
//`;
