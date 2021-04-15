import { useState } from 'react';

const api = {
    key: "66aa88baf7e62908a9e83092f343247f",
    base: "https://api.openweathermap.org/data/2.5/weather?q="
}

function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    // const [weather1, setWeather] = useState({});
    const search = evt => {
        if (evt.key === "Enter") {
            fetch(api.base + query + "&units=metric&APPID=" + api.key)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
    }

}

const dateBulider = (d) => {
    let months = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return day + ", " + date + " " + month + " " + year;
}


return (
    < div className="app" id="myDiv" >
        <main>
            <div className="heading">Weather App</div>
            <input type="text" autoComplete="off" placeholder="Search a City Here" className="search-box" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}></input>
            {(typeof weather.main != "undefined") ? (
                <div>
                    <section className="location">
                        <div className="city">{weather.name}, {weather.sys.country}</div>
                    </section>
                    <div className="date">{dateBulider(new Date())}</div>
                    <div className="information">
                        <div className="weather">{weather.weather[0].main}</div>
                        <div className="temp"><span className="temps">{Math.round(weather.main.temp)}</span><span>°c</span></div>
                        <div className="min-max">
                            <div className="min-temp"><span>Min Temperature : </span><span id="min-temps">{weather.main.temp_min}</span><span className="cel">°C</span></div>
                            <div className="max-temp"><span>Max Temperature : </span><span id="max-temps">{weather.main.temp_max}</span><span className="cel">°C</span></div>
                        </div>
                    </div>
                </div>
            ) : ('')}
        </main>
    </div>
);
}

export default App;