# Sistema de Controle de Estoque

Este é um sistema simples de controle de estoque desenvolvido em JavaScript, HTML e CSS. Ele permite o gerenciamento de produtos em estoque, a visualização de produtos vendidos e o acompanhamento das vendas mensais. A interface é intuitiva e permite a fácil adição, exclusão e venda de produtos.

## Funcionalidades Principais

### 1. Entrada de Produtos
- **Adicionar Produtos:** Permite adicionar produtos com data, nome, valor e código.
- **Listagem de Produtos:** Exibe a lista de produtos em estoque, com a opção de marcar como vendido ou excluir.
- **Total em Estoque:** Exibe o valor total dos produtos em estoque.

### 2. Saída de Produtos
- **Vender Produtos:** Permite mover produtos da lista de estoque para a lista de produtos vendidos.
- **Total Vendido:** Exibe o valor total dos produtos vendidos na aba de saída de produto.
- **Listagem de Produtos Vendidos:** Exibe a lista de todos os produtos vendidos com suas respectivas informações.

### 3. Resumo Mensal
- **Vendas por Mês:** Exibe um resumo das vendas de cada mês, mostrando o total vendido em cada mês específico.
- **Registro Permanente:** As vendas mensais são registradas e permanecem salvas no sistema para consulta futura.

### 4. Dashboard
- **Estatísticas Gerais:** Exibe o total de estoque e o total vendido em tempo real.
- **Mês com Mais e Menos Vendas:** Informa qual foi o mês com maior e menor número de vendas.
- **Gráficos e Resumos:** O dashboard oferece uma visão geral dos dados mais importantes sobre estoque e vendas.

## Como Usar

1. **Adicionar um Produto:**
   - Na aba "Entrada de Produto", preencha os campos de data, nome, valor e código do produto e clique em "Adicionar".

2. **Vender um Produto:**
   - Na aba "Entrada de Produto", clique no botão "Vendido" ao lado do produto que deseja vender. O produto será movido para a aba "Saída de Produto".

3. **Consultar o Resumo Mensal:**
   - Na aba "Resumo Mensal", você pode ver o total vendido por cada mês.

4. **Consultar o Dashboard:**
   - Acesse o dashboard para visualizar o total em estoque, total vendido, e quais foram os meses de maior e menor venda.

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML do sistema.
- `style.css`: Arquivo de estilo CSS para a interface do usuário.
- `script.js`: Script JavaScript que implementa toda a lógica do sistema.

## Tecnologias Utilizadas

- **HTML5:** Estrutura básica do sistema.
- **CSS3:** Estilização da interface.
- **JavaScript:** Lógica de manipulação dos dados e funcionalidades.

## Contribuições

Contribuições são bem-vindas! Se encontrar algum bug ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.
