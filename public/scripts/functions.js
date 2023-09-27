// Aqui vai a chamada da API para consulta de CEP

const API = {
  getZipCodeInfo: async (zipCodeValue) => {
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cep/v2/${zipCodeValue}`
    );

    return data;
  },
};

const Render = {
  zipCodeLabelsMapper: {
    cep: 'CEP',
    state: 'Estado',
    city: 'Cidade',
    neighborhood: 'Bairro',
    street: 'Logradouro',
    service: 'Provedor',
    location: 'Localização',
  },
  zipCodeProviderMapper: {
    viacep: {
      logo: '/public/images/logo-viacep.png',
      name: 'ViaCEP',
    },
    correios: {
      logo: '/public/images/logo-correios.png',
      name: 'Correios',
    },
    fallback: {
      logo: '/public/images/no-logo-fallback.svg',
      name: 'N/A',
    },
  },
  zipCodeDataContent: (zipCodeData) => {
    // console.log(`Os dados do CEP`, zipCodeData);
    const zipCodeDataContentElement = document.querySelector(
      '#zip-code-data-content'
    );
    const zipCodeKeys = Object.keys(zipCodeData);

    let gridColumns = [];

    for (const key of zipCodeKeys) {
      let cardContent = `<div class="card__content">${zipCodeData[key]}</div>`;

      if (key === 'location') {
        cardContent = `<div class="card__content">
          Latitude: ${zipCodeData[key].coordinates.latitude}<br />
          Longitude: ${zipCodeData[key].coordinates.longitude}
        </div>`;
      }

      gridColumns.push(
        `<div class="card card--columns">
          <div class="card__title">${Render.zipCodeLabelsMapper[key]}</div>
          ${cardContent}
        </div>`
      );
    }

    zipCodeDataContentElement.innerHTML = gridColumns.join('');
  },
  zipCodeDataTitle: (zipCodeData) => {
    const zipCodeProviderLogo = document.querySelector(
      '#zip-code-provider-logo'
    );
    const zipCodeTitle = document.querySelector('#zip-code-title');
    const provider = zipCodeData.service || 'fallback';

    zipCodeProviderLogo.style.backgroundImage = `url('${Render.zipCodeProviderMapper[provider].logo}')`;
    zipCodeTitle.innerHTML = `CEP "${zipCodeData.cep}" via ${Render.zipCodeProviderMapper[provider].name}`;
  },
};
