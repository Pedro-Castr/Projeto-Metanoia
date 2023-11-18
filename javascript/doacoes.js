// adiciona evento ouvite no objeto DOM carregado
document.addEventListener("DOMContentLoaded", function(){

    // recupera todos os botões da página com a classe btn-adicionar
    let botoes = document.querySelectorAll(".btn-adicionar");

    // para cada botão
    botoes.forEach(function(botao){

        // adiciona evento ouvinte de clique no botão
        botao.addEventListener("click", function(btn){

            // irá armazenar o texto com todos os itens do carrinho
            let itens = "";

            // irá totalizar o carrinho de compras
            let total = 0;

            // recupera o texto do botão
            let texto = botao.textContent;

            // recupera o input de quantidade relacionado ao botão
            let inputQuantidade = botao.parentNode.parentNode
                .querySelector(".quantidade");

            // verifica o conteúdo do texto do botão
            if (texto === "Adicionar") {

                // muda o texto do botão
                botao.textContent = "Remover";

                // caso o usuário não tenha informado uma quantidade
                // if ternário
                inputQuantidade.value.trim() === "" ? inputQuantidade.value = 1 : "";
                
            } else {

                // muda o texto do botão
                botao.textContent = "Adicionar";

                // limpa o input de quantidade
                inputQuantidade.value = "";
            }

            // recupera todos os produtos - card-body
            let produtos = document.querySelectorAll(".produto");

            // para cada produto
            produtos.forEach(function(produto){

                // recupera o nome do produto
                let nome = produto.getAttribute("data-nome");

                // recupera o preço do produto
                let preco = parseFloat(produto.getAttribute("data-preco"));

                // recupera a quantidade informada no input do produto
                let quantidade = parseFloat(
                    produto.children[2].querySelector(".quantidade").value
                );

                // recupera o botão relacionado ao produto
                let textoBotao = produto.children[2]
                    .querySelector(".btn-adicionar").textContent;

                // caso o usuário tenha adicionado o produto
                if (textoBotao === "Remover") {

                    // adiciona o subtotal ao total (agregando)
                    total += preco * quantidade;

                    // define o valor do item
                    let subtotal = preco * quantidade;

                    // forma o texto dos itens do carrinho
                    itens += quantidade + " " + nome + " x " + preco.toFixed(2)
                        + " = R$ " +  subtotal.toFixed(2) + "<br>";
                }
            });

            // imprime os itens na tela
            document.getElementById("carrinho").innerHTML = itens;

            // imprime o total na tela
            document.getElementById("total").innerHTML = "R$ " + total.toFixed(2);

            // caso tenha algum item selecionado
            if (total > 0) {
                document.getElementById("btn-finalizar").style.display = "block";
            } else {
                document.getElementById("btn-finalizar").style.display = "none";
            }
        });

        // recupera todos os inputs de quantidade
        let quantidades = document.querySelectorAll(".quantidade");

        // para cada input de quantidade
        quantidades.forEach(function(input){

            // ao mudar a quantidade
            input.addEventListener("change", function(){
                calcule(input);
            });
            
            // ao mudar a quantidade
            input.addEventListener("keyup", function(){
                calcule(input);
            });
        });

        // ação de clique no botão finalizar
        document.getElementById("btn-finalizar").addEventListener("click", function(){
            // Limpa o conteudo da div qrcode
            document.getElementById("qrcode").innerHTML = ""

            // Determina o valor da doação
            let total = document.getElementById("total").innerHTML.replace("R$ ", "");

            // Cria um objeto da classe pix disponível no arquivo montapix.js
            let px = new Pix('70383869641', 'doacao', 'PEDRO HENRIQUE VIEIRA CASTRO', 'MURIAE', '***', total);

            // Cria um QRcode com base na string do pix copia e cola
            new QRCode(
                document.getElementById("qrcode"), px .getPayload()
            );
        });
});

    function calcule(input) {
        // recupera o botão relacionado ao input
        let botao = input.parentNode.parentNode.querySelector(".btn-adicionar");

        if (input.value > 0) {
            // reseta o texto do botão
            botao.textContent = "Adicionar";
        } else {
            botao.textContent = "Remover";
        }
        // gera ação de clique no botão
        botao.click();
    }
});