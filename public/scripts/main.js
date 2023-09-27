// Função anônima auto executável
(() => {
  // Evento de submissão do formulário
  const formCep = document.querySelector('#form-cep');
  formCep.addEventListener('submit', async (event) => {
    // Isso não deixa o formulário executar o comportamento padrão
    // que é redirecionar de acordo com o action
    event.preventDefault();

    // Coletar as informações do formulário
    const formData = new FormData(formCep);
    const zipCodeValue = formData.get('zip_code');

    // Valida se o CEP tem 8 digitos
    if (zipCodeValue.length < 8) {
      alert('CEP deve ter 8 digitos');
      // Faz o foco no input de texto
      document.querySelector('[name="zip_code"]').focus();
      return;
    }

    try {
      // Esconde o resultado atual
      document.querySelector('#zip-code-data-container').style.display = 'none';
      // Esconde o erro
      document.querySelector('#zip-code-error').style.display = 'none';
      // Mostra "carregando informações..."
      document.querySelector('#zip-code-loading').style.display = '';

      // Coleta informações da API de CEP
      const zipCodeData = await API.getZipCodeInfo(zipCodeValue);

      // Renderiza as informações na tela
      document.querySelector('#zip-code-data-container').style.display = '';

      Render.zipCodeDataTitle(zipCodeData);
      Render.zipCodeDataContent(zipCodeData);
    } catch (e) {
      console.error(`Erro ao consultar CEP`, e);

      // Mostra o erro
      document.querySelector('#zip-code-error').style.display = '';
    } finally {
      // Esconde o estado de carregamento independente do resultado da API
      document.querySelector('#zip-code-loading').style.display = 'none';
    }
  });

  const newSearchButton = document.querySelector('#new-search-button');
  newSearchButton.addEventListener('click', () => {
    const zipCodeInput = document.querySelector('[name="zip_code"]');

    // Limpa e coloca foco no campo de texto
    zipCodeInput.value = '';
    zipCodeInput.focus();

    // Esconde o resultado atual
    document.querySelector('#zip-code-data-container').style.display = 'none';
  });
})();
