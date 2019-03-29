# app-games #

Esse é uma aplicação de que utiliza a api do [Google Maps](https://developers.google.com/maps/documentation/?hl=pt-br) para definir o melhor trajeto de um ponto ao outro. Ela foi desenvolvida com framework [Titanium](https://www.appcelerator.com/mobile-app-development-products/) para o desenvolvimento.

### Imagens da Aplicação ###



Capa   | Aplicação
--------- | ------
![Capa](https://raw.githubusercontent.com/thiagosalome/app-games/master/images-readme/cover.png)| ![Aplicação](https://raw.githubusercontent.com/thiagosalome/app-games/master/images-readme/application.png)

### Executando o projeto ###

* Para executar um projeto em Titanium é necessário configurar o ambiente. Siga [esse tutorial](https://docs.axway.com/bundle/Titanium_SDK_allOS_en/page/titanium_sdk_getting_started.html) em caso de dúvidas
* Adquira uma chave de API do IGDB [nesse link](https://www.igdb.com/api)
* Adicione a chave de api do IGBD no arquivo network.js
  ```javascript
  const URL_BASE = "https://api-endpoint.igdb.com";
  const USER_KEY = "[YOUR_API_KEY]";
  const HEADER = "application/json";
