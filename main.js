const api = {
    key : "167320e10349fc613c753af1d12331ab",
    base : "https://api.openweathermap.org/data/2.5/weather?q="
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(api.base+query+"&units=metric&APPID="+api.key).then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    if(weather.cod == "404"){
        document.querySelector('.location .city').innerText = weather.message;
    document.querySelector('.date').innerText = dateBulider(new Date());
    document.querySelector('.information .temp .temps').innerText = "--";
    document.querySelector('.information .weather').innerText = "--";
    document.querySelector('.information .min-max .min-temp #min-temps').innerText = "--";
    document.querySelector('.information .min-max .max-temp #max-temps').innerText = "--";
    document.body.style.backgroundImage = "url('error.jpg')";
    }
    else{
    document.querySelector('.location .city').innerText = weather.name +" "+ weather.sys.country;
    document.querySelector('.date').innerText = dateBulider(new Date());
    document.querySelector('.information .temp .temps').innerText = Math.round(weather.main.temp);
    document.querySelector('.information .weather').innerText = weather.weather[0].main;
    document.querySelector('.information .min-max .min-temp #min-temps').innerText = Math.round(weather.main.temp_min);
    document.querySelector('.information .min-max .max-temp #max-temps').innerText = Math.round(weather.main.temp_max);
    if(weather.weather[0].main == "Haze"){
        document.body.style.backgroundImage = "url('haze.jpg')";
    }
    else if(weather.weather[0].main == "Sunny"){
        document.body.style.backgroundImage = "url('sunny.jpg')";
    }
    else if(weather.weather[0].main == "Clouds"){
        document.body.style.backgroundImage = "url('clouds.jpg')";
    }
    else if(weather.weather[0].main == "Clear"){
        document.body.style.backgroundImage = "url('clear.jpg')";
    }
    else if(weather.weather[0].main == "Smoke"){
        document.body.style.backgroundImage = "url('smoke.jpg')";
    }
    else if(weather.weather[0].main == "Rain"){
        document.body.style.backgroundImage = "url('rain.jpg')";
    }
    else if(weather.weather[0].main == "Mist"){
        document.body.style.backgroundImage = "url('mist.jpg')";
    }
    else if(weather.weather[0].main == "Thunderstorm"){
        document.body.style.backgroundImage = "url('thunderstorm.jpg')";
    }
    else if(weather.weather[0].main == "Snow"){
        document.body.style.backgroundImage = "url('snow.jpg')";
    }
    else if(weather.weather[0].main == "Drizzle"){
        document.body.style.backgroundImage = "url('drizzle.jpg')";
    }
}
}

function dateBulider(d){
    let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return day+", "+date+" "+month+" "+year;
}