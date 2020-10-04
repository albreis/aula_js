/**
 * Função para verificar dados de um formulário antes de enviá-lo
 * @author Albreis - Design & Programação <contato@albreis.com.br> 
 * @returns {bolean}
 */

function verificar_dados() {

  /**
   * Evitamos que o formulário seja enviado de forma convencional
   * A variável "event" sempre estará disponível dentro de uma função JS
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/Events}
   */
  event.preventDefault();

  /**
   * Inicializa a variável que irá armazenar a mensagem de erro
   * 
   * @var {boolean}
   */
  var error = false;

  /**
   * Captura o elemento DOM do input do campo Nome e armazena ele 
   * em uma variável para ser acessado mais tarde
   * 
   * @var {HtmlElement}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/Element}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/Element/querySelector}
   */
  var inputNome = document.querySelector('[name="nome"]')

  /**
   * Armazena o valor digitado no input em uma variavel
   * 
   * @var {string}
   */
  var valorNome = inputNome.value

  /**
   * Remove a class "error" do input caso exista alguma
   * que tenha sido colocada por validações anteriores
   */
  inputNome.classList.remove('error')

  /**
   * Verifica se o nome digitado é válido
   * 
   * 1 - Dividimos o texto digitado em palavras.
   * 2 - Contamos a quantidade de palavras
   * 3 - Se for menor que 2 o nome não está completo
   */
  if(valorNome.split(' ').length < 2) {
    /**
     * Caso seja inválido definimos qual vai ser a mensagem de erro
     */
    error = 'Por favor insira o nome e sobrenome'

    /**
     * Adicionamos uma classe "error" no input para usarmos
     * uma estilização diferenciada quando ele estiver
     * com algum tipo de erro
     */
    inputNome.classList.add('error')

    /**
     * Para a execução do restante do script nesse momento
     * e exibe a mensagem de erro na página
     */
    return mostrar_erros(error);
  }

  /**
   * Fazemos uma verificação um pouco mais avançada.
   * 
   * Mesmo que a pessoa digite nome e sobrenome ela pode
   * acabar digitando caracteres inválidos.
   * 
   * Mas essa regra se aplica ao Brasil, em outros países essa
   * regra pode não ser útil.
   * 
   * Aqui usamos então Expressão Regular (REGEX) para validar
   * se o nome possui apenas caracteres que são válidos
   * para o nosso sistema
   * 
   * Regex:
   * [\d\w\s]+ 
   * Faz com que só sejam aceitos caracteres alphanuméricos (letras e números) e espaços em branco
   * 
   * Modificadores (gi)
   * g - Aplica a regra em todas as palavras. Caso contrário ele só aplicará na primeira palavra
   * i - Case Insensitive - Não vai diferenciar maiúsculas e minúsculas na regra
   */
  if(!valorNome.match(/[\d\w\s]+/gi)) {
    /**
     * Caso não seja um nome válido apresentamos essa mensagem de erro
     */
    error = 'Por favor insira um nome válido'

    /**
     * Adicionamos a classe "error" no input
     */
    inputNome.classList.add('error')

    /**
     * Paramos a execusão do script
     */
    return mostrar_erros(error);
  }

  if(!error) {
    // caso esteja tudo certo com o nome ocultamos o campo
    document.getElementById('nome').style.display = 'none'
  }

  /**
   * Armazenamos em uma variável o elemento DOM do input de email
   * 
   * @var
   */
  var inputEmail = document.querySelector('[name="email"]')

  /**
   * Agora armazenamos o valor digitado
   * 
   * @var {HtmlElement}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/Element}
   */
  var valorEmail = inputEmail.value

  /**
   * Removemos a class "error" caso exista no input
   */
  inputEmail.classList.remove('error')

  /**
   * Fazemos a validação do campo de email
   * 
   * Novamente usamos uma expressão regular para verificar
   * se é realmente um e-mail válido
   */
  if(valorEmail && !valorEmail.match(/^[\d\w\.+]+@[\w]+[\d\w\-]+\.([\w\d\-]+\.)?[\w]{2,3}$/gi)) {
    /**
     * Caso não seja um e-mail válido definimos uma mensagem de erro
     */
    error = 'Por favor insira um e-mail válido'

    /**
     * Adicionamos a classe "error" no input
     */
    inputEmail.classList.add('error')

    /**
     * Paramos a execução do script
     */
    return mostrar_erros(error);

  } else if (!valorEmail) {
    // Caso esteja vazio
    if(document.getElementById('email').style.display != 'block') {

      /**
       * Exibimos o campo de email
       */
      document.getElementById('email').style.display = 'block'

      /**
       * Se o campo abaou de ser visualizado não aplicamos mensagens de erro
       */ 
      error = false
    } else {
      /**
       * Caso aconteça uma segunda tentativa de envio já com o campo 
       * visivel ai sim exibe um erro
       */
      error = 'Digite um e-mail'
    }

    /**
     * Para a excução do script
     */
    return mostrar_erros(error);

  } else {
    // caso esteja tudo ok
    document.getElementById('email').style.display = 'none'
  }

   /**
    * Guardamos o nosso textarea da mensagem em uma variável
    * 
    * @var {HtmlElement}
    * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/Element}
    */
  var inputMensagem = document.querySelector('[name="mensagem"]')

  /**
   * Capturamos o valor digitado
   * 
   * @var {string}
   */
  var valorMensagem = inputMensagem.value

  /**
   * Removemos a classe error caso exista na textarea
   */
  inputMensagem.classList.remove('error')

  /**
   * Fazemos então a verificação do campo de mensagem
   */
  if(!valorMensagem && document.getElementById('msg').style.display == 'block') {
    /**
     * Caso esteja vazio adicionamos a mensagem de erro
     */
    error = 'Por favor insira uma mensagem'

    /**
     * Adicionamos a classe no input
     */
    inputMensagem.classList.add('error')

    /**
     * Paramos a execução do script
     */
    return mostrar_erros(error);

  } else if(document.getElementById('msg').style.display != 'block') {
    /**
     * Exibe o campo de mensagem
     */
    document.getElementById('msg').style.display = 'block'

    /**
     * Paramos a execução do script sem retornar erros
     */
    return mostrar_erros(false);

  } else {
    // exist uma mensagem não executa nada...
  }


  /**
   * Caso todas as validações sejam concluídas com sucesso o script
   * vai chegar nessa parte
   * 
   * Aqui podemos executar o envio da mensagem para o nosso script
   * do lado servidor, que vai processar e guardar os dados  do formulário
   */

  /**
   * Envia o formulário e retorna True ou False
   * 
   * @var {boolean}
   */
  var envia = envia_formulario(valorNome, valorEmail, valorMensagem);

  if (!envia) {
    /**
     * Caso ocorra erros no envio do formulário exibe os erros
     */
    return mostrar_erros('Houve um erro ao enviar a mensagem, tente novamente!')
  } else {
    /**
     * Caso esteja tudo certo com o campo de mensagem ocultamos ele
     */
    document.getElementById('msg').style.display = 'none'
  }

  return false;

}

/**
 * Função que faz o envio dos dados do formlário para um script externo
 * 
 * @param {string} nome - Nome de quem enviou a mensagem
 * @param {string} email - E-mail de quem enviou a mensagem
 * @param {string} msg - Texto da mensagem
 * @returns {boolean}
 */
function envia_formulario(nome, email, msg) {
  /**
   * Inicializamos um FormData 
   * 
   * @var {FormData}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/FormData}
   */
  var dados = new FormData()

  /**
   * Adicionamos o nome aos dados que serão enviados
   */
  dados.append('nome', nome)

  /**
   * Adicionamos o email aos dados que serão enviados
   */
  dados.append('email', email)

  /**
   * Adicionamos a mensagem aos dados que serão enviados
   */
  dados.append('msg', msg)

  /**
   * Executamos o envio do ajax
   * 
   * @var {boolean}
   */
  var envia = executa_ajax('sendmail.php', 'POST', dados);

  if (!envia) {
    /**
     * Caso tenha algum erro no envio exibe uma mensagem
     */
    return mostrar_erros('Houve um erro ao enviar, tente novamente', event);
  }

  /**
   * Caso seja enviado com sucesso mostra uma mensagem
   */
  return mostra_msg_sucesso('Formulário enviado com sucesso!');

}

/**
 * Executa a requisição XMLHttpRequest (ajax) para enviar os dados
 * para nosso script no backend
 * 
 * @param {string} url - URL do script que irá processar os dados
 * @param {string} method - Tipo de envio (geralmente POST ou GET)
 * @param {FormData|ArrayBuffer|Blob|Document|DOMString} - Dados para erem enviados
 * @returns {boolean}
 */
function executa_ajax(url, method, form) {
  /**
   * Inicializa o XMLHttpRequest
   * 
   * @var {XMLHttpRequest}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest}
   */
  var ajax = new XMLHttpRequest();

  /**
   * Abre a conexão com o servidor
   */
  ajax.open(method, url);

  /**
   * Envia os dados
   */
  ajax.send(form);

  /**
   * Espera a resposta do servidor
   */
  ajax.onreadystatechange = () => {
    if(this.readyState == this.DONE) {
      /**
       * Caso tenha sido concluído o envio
       */
      if(this.status == 200) {
        /**
         * Se o código de resposta for 200
         * a requisição foi concuída com sucesso
         */
        return true;
      } else {
        /**
         * Caso o código seja diferente de 200
         * é sinal que possivelmente houve algum tipo de erro
         */
        return false;
      }
    }
  }
}

/**
 * Exibe uma mensagem de sucesso caso o formlário seja enviado sem erros
 * 
 * @param {string} msg - Mensagem de sucesso
 */
function mostra_msg_sucesso(msg) {  
  /**
   * Cria um elemento virtual H1
   * @var {HtmlElement}
   * @see {@link https://developer.mozilla.org/pt-BR/docs/Web/API/HtmlElement}
   */
  var h1 = document.createElement('h1')

  /**
   * Define o texto do H1
   */
  h1.innerText = msg

  /**
   * Define a cor de fundo
   */
  h1.style.backgroundColor = 'green'

  /**
   * Cor do texto
   */
  h1.style.color = '#fff'

  /**
   * Alinhamento do texto
   */
  h1.style.textAlign = 'center'

  /**
   * Tamanho da fonte
   */
  h1.style.padding = '30px'

  /**
   * Mostra a mensagem de sucesso
   */
  document.getElementById('msg').innerHTML = h1.outerHTML
}

/**
 * Mostra as mensagens de erro
 * 
 * @param {string} erro - Mensagem para ser exibida
 */
function mostrar_erros(error) {
  /**
   * Oculta a msg de erro para inicializar o processo
   * e evitar erros
   */
  document.getElementById('error').style.display = 'none'

  if(typeof error == 'string') {
    /**
     * Se o error for uma string, ou seja, uma mensagem de texto
     */

     /**
      * Injetamos a mensagem no HTML
      */
    document.getElementById('error').innerHTML = error  

    /**
     * Exibimos o bloco de erro
     */
    document.getElementById('error').style.display = 'block'
  }
}