let input = document.getElementById('input')
let searchBtn = document.querySelector('#searchBtn')
let main = document.querySelector('.main')
let tempToggle = document.getElementById('tempToggle')
let windToggle = document.getElementById('windToggle')
let alertMsg = document.getElementById('alertMsg')
let tempStatus = 0
let url
let tempValue
let feelsValue

let city
let country
let temp_c
let temp_f
let feelsLike_c
let feelsLike_f
let humidity
let wind_kph
let uv
let weatherDescription
let weatherCode

function setStatus() {
    if(tempStatus == 0){
        tempStatus = 1
    }
    else if (tempStatus == 1){
        tempStatus = 0
    }}

tempToggle.addEventListener('click', setStatus)

async function getData(){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=610d10d100e044db897174405230407&q=${input.value}`, {mode: 'cors'});
    data = await response.json();

    if(response.status === 400){
        alertMsg.style.display = 'block'
    }
    else {
        alertMsg.style.display = 'none'
        return data
    }        
}

async function processData() {
    
    const myData = await getData()
        city = myData.location.name
        country = myData.location.country,
        temp_c = Math.round(myData.current.temp_c),
        temp_f = Math.round(myData.current.temp_f),
        feelsLike_c = Math.round(myData.current.feelslike_c),
        feelsLike_f = Math.round(myData.current.feelslike_f),
        humidity = myData.current.humidity + " %",
        wind_kph = Math.round(myData.current.wind_kph) + " km/h",
        uv = myData.current.uv
        weatherDescription = myData.current.condition.text
        weatherCode = myData.current.condition.code
}

searchBtn.addEventListener('click', () => {
    tempToggle.removeEventListener('click', setStatus)
    displayData()

})

async function displayData() {
    await processData()
    
    clearDisplay()
    displayLocation()
    displayTemperature()
    displayInfo()

}

function displayStatus() {
    let statusDiv = document.createElement('div')
    main.appendChild(statusDiv)

    let statusIcon = document.createElement('img')
    statusIcon.src('')
}


function displayLocation() {
    let location = document.createElement('div')
    main.appendChild(location)
    location.classList.add('location')
    let place = document.createElement('p')
    place.innerHTML = "<b>" + city + "</b>" + ", " + country
    location.appendChild(place)
}

function displayTemperature() {
    
    let temperature = document.createElement('div')
    main.appendChild(temperature)
    temperature.classList.add('temperature')

    let temp = document.createElement('div')
    temperature.appendChild(temp)
    temp.classList.add('temp')
    let tempTitle = document.createElement('p')
    tempTitle.classList.add('text')
    tempTitle.textContent = "Currently"
    temp.appendChild(tempTitle)
    tempValue = document.createElement('p')
    tempValue.classList.add('number')
    temp.appendChild(tempValue)
    
    let feels = document.createElement('div')
    temperature.appendChild(feels)
    feels.classList.add('feels')
    let feelsTitle = document.createElement('p')
    feelsTitle.textContent = "Feels Like"
    feelsTitle.classList.add('text')
    feels.appendChild(feelsTitle)
    feelsValue = document.createElement('p')
    feelsValue.classList.add('number')
    feels.appendChild(feelsValue)

    if(tempStatus == 0){
        tempValue.innerHTML = temp_c + '<sup style="font-size:20px"> º C</sup>'
        feelsValue.innerHTML = feelsLike_c + '<sup style="font-size:20px"> º C</sup>'
    }
    else  {
        tempValue.innerHTML = temp_f + '<sup style="font-size:20px"> º F</sup>'
        feelsValue.innerHTML = feelsLike_f + '<sup style="font-size:20px"> º F</sup>'
    }

    let line = document.createElement('div')
    main.appendChild(line)
    line.classList.add('line')

    tempToggle.addEventListener('click', changeTemperature)
}

function displayInfo() {

    setIcon()

    let info = document.createElement('div')
    info.classList.add('info')
    main.appendChild(info)

    let weatherInfo = document.createElement('div')
    weatherInfo.classList.add('cell')
    info.appendChild(weatherInfo)
    
    let weatherIcon = document.createElement('img')
    weatherIcon.setAttribute('src', url)
    weatherInfo.appendChild(weatherIcon)

    let weatherP = document.createElement('p')
    weatherP.textContent = weatherDescription
    weatherInfo.appendChild(weatherP)

    let humidityInfo = document.createElement('div')
    humidityInfo.classList.add('cell')
    info.appendChild(humidityInfo)

    let humidityIcon = document.createElement('img')
    humidityIcon.setAttribute('src', 'images/humidity.png')
    humidityInfo.appendChild(humidityIcon)

    let humidityP = document.createElement('p')
    humidityP.textContent = humidity
    humidityInfo.appendChild(humidityP)

    let windInfo = document.createElement('div')
    windInfo.classList.add('cell')
    info.appendChild(windInfo)

    let windIcon = document.createElement('img')
    windIcon.setAttribute('src', 'images/wind.png')
    windInfo.appendChild(windIcon)

    let windP = document.createElement('p')
    windP.textContent = wind_kph
    windInfo.appendChild(windP)

    let uvInfo = document.createElement('div')
    uvInfo.classList.add('cell')
    info.appendChild(uvInfo)

    let uvIcon = document.createElement('img')
    uvIcon.setAttribute('src', 'images/uv.png')
    uvInfo.appendChild(uvIcon)

    let uvP = document.createElement('p')
    uvP.textContent = uv
    uvInfo.appendChild(uvP)
}

function setIcon(){

    if(weatherCode == 1003 ){
        url = 'images/partlyclear.png'
    }
    else if(weatherCode == 1087 || (weatherCode >= 1273) && (weatherCode <= 1282)){
        url = 'images/storm.png'
    }
    else if(weatherCode == 1063 || (weatherCode >= 1150) && (weatherCode <= 1201) || (weatherCode >= 1240) && (weatherCode <= 1246)){
        url = 'images/rainy.png'
    }
    else if(weatherCode == 1066 || weatherCode == 1069 || weatherCode == 1072 || weatherCode == 1114 || weatherCode == 1117 || (weatherCode >= 1204) && (weatherCode <= 1237) || (weatherCode >= 1249) && (weatherCode <= 1264)){
        url = 'images/snow.png'
    }
    else if(weatherCode == 1006 || weatherCode == 1009 || weatherCode == 1030 || weatherCode == 1135 || weatherCode == 1147){
        url = 'images/clouds.png'
    }
    else {
        url = 'images/sun.png'
    }
}

function clearDisplay() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
     }
     tempToggle.removeEventListener('click', changeTemperature)
}

function changeTemperature() {
    if(tempStatus == 0){
        tempValue.innerHTML = temp_f + '<sup style="font-size:20px"> º F</sup>'
        feelsValue.innerHTML = feelsLike_f + '<sup style="font-size:20px"> º F</sup>'
        tempStatus = 1
    }
    else {
        tempValue.innerHTML = temp_c + '<sup style="font-size:20px"> º C</sup>'
        feelsValue.innerHTML = feelsLike_c + '<sup style="font-size:20px"> º C</sup>'
        tempStatus = 0
    }}