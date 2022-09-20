const weatherTemplate = (elem) => {
    let weather = `\t${elem.dt_txt}:
      +${Math.trunc(elem.main.temp)}°C, ощущается как: +${Math.trunc(elem.main.feels_like)}°C, ${elem.weather[0].description}.
    `;
    return weather;
};

module.exports = weatherTemplate;
