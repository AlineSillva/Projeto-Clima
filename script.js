//Manipulando o submit do formulário através da classe busca
document.querySelector('.busca').addEventListener('submit', async (event) => {
    
    //Deixar na mesma tela ao clicar no botão do formulário
    event.preventDefault();

    //Capturando o valor digitado no campo de texto
    let input = document.querySelector('#searchInput').value;
    
    //Verificando se foi informando algum texto no input
    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        //Chamando a URL da API e armazenando em uma variável
        //Na URL vamos passar a informação do campo de texto ${encodeURI(input)}
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q= 
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`);
        
        //Transformando o json retornado pela URL em um objeto
        let json = await results.json();
        
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }  
    } else {
        clearInfo();
    }
});

function showInfo(obj) {
    
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = 
    `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

// Função para não exibir a div de resultado
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

//Exibir mensagem de aviso
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}