function Carrinho() {
     // Jeito tosco TODO: melhorar depois
     const btnCarrinho = document.querySelector('#botao-carrinho');

     btnCarrinho.addEventListener('click', function(event) {
         event.preventDefault();
         const openCartClass = 'carrinho-aberto';
 
         document.body.className.includes(openCartClass) ? document.body.className = '' : document.body.className = openCartClass;
     });
 
     const btnFecharCarrinho = document.querySelector('#fechar-carrinho');
 
     btnFecharCarrinho.addEventListener('click', function(event) {
         event.preventDefault();
 
         document.body.className = '';
     });
}