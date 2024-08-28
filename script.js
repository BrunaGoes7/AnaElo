// Função para mostrar a seção ativa
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Arrays para armazenar os produtos e produtos vendidos
const produtos = [];
const produtosVendidos = [];
const vendasPorMes = {};

// Função para adicionar um produto
function adicionarProduto() {
    const data = document.getElementById('produtoData').value;
    const nome = document.getElementById('produtoNome').value;
    const valor = parseFloat(document.getElementById('produtoValor').value);
    const codigo = document.getElementById('produtoCodigo').value;

    if (data && nome && valor && codigo) {
        const produto = { data, nome, valor, codigo };
        produtos.push(produto);
        atualizarListaProdutos();
        document.getElementById('produtoData').value = '';
        document.getElementById('produtoNome').value = '';
        document.getElementById('produtoValor').value = '';
        document.getElementById('produtoCodigo').value = '';
        atualizarDashboard();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para atualizar a lista de produtos na aba Entrada de Produto
function atualizarListaProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${produto.data} - ${produto.codigo} - ${produto.nome} - R$${produto.valor.toFixed(2)}
            <button onclick="venderProduto(${index})">Vendido</button>
            <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        listaProdutos.appendChild(li);
    });
}

// Função para vender um produto
function venderProduto(index) {
    const produtoVendido = produtos.splice(index, 1)[0];
    produtosVendidos.push(produtoVendido);
    const mes = produtoVendido.data.split('-')[1]; // Obtém o mês da data
    if (!vendasPorMes[mes]) vendasPorMes[mes] = 0;
    vendasPorMes[mes] += produtoVendido.valor;
    atualizarListaProdutos();
    atualizarListaSaida();
    atualizarResumoMensal();
    atualizarDashboard();
}

// Função para excluir um produto
function excluirProduto(index) {
    produtos.splice(index, 1);
    atualizarListaProdutos();
    atualizarDashboard();
}

// Função para atualizar a lista de saída de produtos na aba Saída de Produto
function atualizarListaSaida() {
    const listaSaida = document.getElementById('listaSaida');
    listaSaida.innerHTML = '';

    produtosVendidos.forEach((produto) => {
        const li = document.createElement('li');
        li.innerHTML = `${produto.data} - ${produto.codigo} - ${produto.nome} - R$${produto.valor.toFixed(2)}`;
        listaSaida.appendChild(li);
    });

    // Exibir o total das vendas na aba Saída de Produto
    const totalVendas = produtosVendidos.reduce((acc, produto) => acc + produto.valor, 0);
    document.getElementById('totalVendasSaida').textContent = `Total Vendido: R$${totalVendas.toFixed(2)}`;
}

// Função para atualizar o resumo mensal na aba Resumo Mensal
function atualizarResumoMensal() {
    const listaResumoMensal = document.getElementById('listaResumoMensal');
    listaResumoMensal.innerHTML = '';

    for (const mes in vendasPorMes) {
        const li = document.createElement('li');
        li.innerHTML = `${mes}: R$${vendasPorMes[mes].toFixed(2)}`;
        listaResumoMensal.appendChild(li);
    }
}

// Função para atualizar o dashboard com totais
function atualizarDashboard() {
    const totalVendido = produtosVendidos.reduce((acc, produto) => acc + produto.valor, 0);
    const totalEstoque = produtos.reduce((acc, produto) => acc + produto.valor, 0);
    
    document.getElementById('totalVendido').textContent = totalVendido.toFixed(2);
    document.getElementById('totalEstoque').textContent = totalEstoque.toFixed(2);

    let mesMaisVendas = '';
    let mesMenosVendas = '';
    let maxVendas = 0;
    let minVendas = Infinity;

    for (const mes in vendasPorMes) {
        if (vendasPorMes[mes] > maxVendas) {
            maxVendas = vendasPorMes[mes];
            mesMaisVendas = mes;
        }
        if (vendasPorMes[mes] < minVendas) {
            minVendas = vendasPorMes[mes];
            mesMenosVendas = mes;
        }
    }

    document.getElementById('mesMaisVendas').textContent = mesMaisVendas || 'Nenhum';
    document.getElementById('mesMenosVendas').textContent = mesMenosVendas || 'Nenhum';
}
