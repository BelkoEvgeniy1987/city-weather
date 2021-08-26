let wrapper = document.querySelector(".kharkiv-weather");
let out = ``;

//город по умолчанию - Харьков
let cityToShow = 'Kharkiv';

// создаем элементы погоды на основании класса
let city = new WeatherArticle('div', 'city',);
city.create();
let temperature = new WeatherArticle('div', 'temperature',);
temperature.create();
let feelsLike = new WeatherArticle('div', 'feelsLike',);
feelsLike.create();
let weather = new WeatherArticle('div', 'weather',);
weather.create();
let weatherImg = new WeatherArticle('div', 'weatherImg',);
weatherImg.create();

//добавляем элементы через содержимое тега
wrapper.innerHTML = out;


function fetchFunc(cityToShow) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityToShow}&appid=16270f06eb77a549e4824d01f4278238`)
        .then((resp) => resp.json())
        .then((data) => {
            /*console.log(data) */

            //город
            document.querySelector('.city').innerHTML = data.name;

            //температура (округляем в большую сторону), переводим из градусов Келвина в градусы Цельсия
            let temp = Math.ceil((data.main.temp) - 273);
            document.querySelector('.temperature').innerHTML = temp + '&deg';
            //в конце - добавляем символ "градус"

            //температура по ощущениям
            let feels = Math.round((data.main.feels_like) - 273);
            document.querySelector('.feelsLike').innerHTML = 'feels ' + feels + '&deg';

            //состояние погоды
            let weather = data.weather[0]['description'];
            document.querySelector('.weather').innerHTML = weather;

            //вызываем функцию для определения соответсвующей img
            imgForWeather(temp)
        })
        .catch(() => {
            document.querySelector('.city').innerHTML = "City not found";
            document.querySelector('.temperature').innerHTML = '';
            document.querySelector('.feelsLike').innerHTML = '';
            document.querySelector('.weather').innerHTML = '';
            document.querySelector('.weatherImg').innerHTML = '';
        })
}

//вызываем функцию погоды
fetchFunc(cityToShow);

//функция присваивания соответсвующей img для текущей погоды
function imgForWeather(temp) {
    let img;
    let weatherNow = document.querySelector('.weather').innerHTML;

    if ((weatherNow.includes("drizzle")) || (weatherNow.includes("rain")) || (weatherNow == "thunderstorm")) {
        img = '<img src="img/rain.png" alt="rain">';
    } else if (weatherNow == "snow") {
        img = '<img src="img/snow.png" alt="snow">';
    } else if ((weatherNow == `clear sky`) && (temp >= "30")) {
        img = '<img src="img/heat.png" alt="heat">';
    } else if ((weatherNow == "clear sky") && (temp <= "0")) {
        img = '<img src="img/cold.png" alt="cold">';
    } else if (weatherNow == `clear sky`) {
        img = '<img src="img/clearSky.png" alt="clearSky">';
    } else if (weatherNow.includes('clouds')) {
        img = '<img src="img/clouds.png" alt="clouds">';
    } else if (weatherNow.includes('mist')) {
        img = '<img src="img/mist.png" alt="mist">';
    }

    //соответствующая погоде img
    document.querySelector('.weatherImg').innerHTML = img;
}

let btn = document.querySelector('.citySubmit');
let cityName = document.querySelector('.cityInput');

document.querySelector('.new-city').addEventListener('submit', e => {
    e.preventDefault();
    fetchFunc(cityName.value);
    cityName.value = "";
});

btn.addEventListener('click', e => {
    e.preventDefault();
    fetchFunc(cityName.value);
    cityName.value = "";
});

