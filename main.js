let search = document.querySelector('.search');
let buttonSearch = document.querySelector('.buttonSearch');
let city = document.querySelector('.city');
let temp1 = document.querySelector('.temp');
let img = document.querySelector('.img');
let date = document.querySelector('.date');
let description1 = document.querySelector('.description');
let weatherHour = document.querySelector('.weatherHour'); 
let weatherDay = document.querySelector('.weatherDay');
let cards = document.querySelector('.cards');
let label = document.querySelector('.label'); 
let weatherNow = document.querySelector('.weatherNow');

buttonSearch.addEventListener('click',  function(){
  clearWeatherDay();
  clearWeatherHour();
if(search.value == ""){
  search.className="error"
  label.innerHTML ="Введите название"
  clearWeatherNow()
}else{
  search.className='search';
  label.innerHTML = ''
  
}
localStorage.setItem("city", search.value);

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27`)

      .then(res => res.json())
      .then(({list}) => { 
   
        temp1.innerHTML = Math.round(list[0].main.temp) + '&deg';     
        img.innerHTML = '<img src = "http://openweathermap.org/img/wn/' + list[0].weather[0].icon+'@2x.png"/>'       
        description1.innerHTML =  list[0].weather[0].description;
        date.innerHTML = "Последнее обновление: "+ (list[0].dt_txt);
   

    for (let i=0; i < 5; i++){
      
      function Hour(img, temp1){ 
        this.img = img;
        this.temp = temp1;
    
        this.showStates1 = function(element){       
        element.insertAdjacentHTML("beforeend", `${this.img}<br/>`);
        element.insertAdjacentHTML("beforeend", `${this.temp}`);
        }}       
      let hour = new Hour('<img src = "http://openweathermap.org/img/wn/' + list[i].weather[0].icon+'@2x.png"/>', Math.round(list[i].main.temp) + '&deg');
      
      hour.showStates1(weatherDay)
        
    }  

    for(let i=7; i < 32; i+=8){
      function Day (date, img, temp1, description1){
        this.img = img;
        this.temp = temp1;
        this.date = date;
        this.description = description1;  
        
        this.showStates = function(element){          
          element.insertAdjacentHTML("beforeend", `${this.img}<br/>`);  
          element.insertAdjacentHTML("beforeend", `${this.temp}<br/>`);
          element.insertAdjacentHTML("beforeend", `${this.description}<br/>`);    
        }
    }
        let day = new Day(list[i].dt_txt, '<img src = "http://openweathermap.org/img/wn/' + list[i].weather[0].icon+'@2x.png"/>',  Math.round(list[i].main.temp) + '&deg', list[i].weather[0].main);        
        day.showStates(weatherHour);
       
    }  
    
  })
   function clearWeatherDay() {
      document.getElementsByClassName('.weatherDay')
      weatherDay.innerHTML = '';
    }
    function clearWeatherHour() {
      document.getElementsByClassName('.weatherHour')
      weatherHour.innerHTML = '';
    }
    function clearWeatherNow() {
      document.getElementsByClassName('.weatherHour')
      weatherNow.innerHTML = '';
    }
})
