const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')


const updateUI = (data) =>{
  const {cityDetails, weather} = data;
  details.innerHTML = `
      <h5 class="my-3">${cityDetails.EnglishName}</h5>
                  <div class="my-3">${weather.WeatherText}</div>
                  <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
`;
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)

 
  let timeSrc = weather.isDayTime ? 'img/day.svg' : 'img/night.svg'
  time.setAttribute('src', timeSrc);




// remove the d-none class if present
if(card.classList.contains('d-none')){
  card.classList.remove('d-none');
}
console.log(cityDetails)
console.log(weather)
}


const updateCity = async(value)=>{
  const cityDetails = await getCity(value)
  const weather = await  getWeather(cityDetails.Key)

  return {
    cityDetails,
    weather
  }
}





cityForm.addEventListener('submit', e=>{
  e.preventDefault();
  const value = cityForm.city.value.trim()
  cityForm.reset();

  updateCity(value)
    .then(data => updateUI(data) )
    .catch(err => console.log(err))


   localStorage.setItem('value', value)
})

if(localStorage.getItem('value')){
  updateCity(localStorage.getItem('value'))
    .then(data=> updateUI(data))
    .catch(err=> console.log(err))
} 