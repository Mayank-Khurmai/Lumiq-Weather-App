const api = {
    key : "c3db8b90a36c9eee7eca24b8001913cb",
    url : "https://api.openweathermap.org/data/2.5/weather?q=",
}

const search_icon = document.getElementById("search-icon");
const input = document.getElementsByTagName("INPUT")[0];

input.addEventListener('input', (event)=>{
    if(input.value != ""){
        search_icon.style.display = "block";
            }
    else{
        search_icon.style.display = "none";
    }
});


complete_date = ()=>{
    let date = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let full_date = date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+", "+days[date.getDay()];
    return full_date;
}

backgroud_change = (value)=>{
    let pic_index = 0;
    let images = ['cloudy.jpeg','clear-sky.jpeg','mist.jpeg', 'snow.jpeg', 'rain.jpeg', 'shower-rain.jpeg', 'thunderstorm.jpeg', 'else.jpeg']; 

    if(value>800)
        pic_index = 0;
    else if(value==800)
        pic_index = 1;
    else if(value>=700 && value<800)
        pic_index = 2;
    else if(value>=600 && value<700)
        pic_index = 3;
    else if(value>=500 && value<600)
        pic_index = 4;
    else if(value>=300 && value<500)
        pic_index = 5;
    else if(value>=200 && value<300)
        pic_index = 6;
    else
        pic_index = 7;
    document.body.style.backgroundImage = "url('./images/"+images[pic_index]+"')";
}

display_output = (data)=>{
    console.log(data);
    document.getElementById("result-div-span1-text").innerHTML = data.name+", "+data.sys.country;
    document.getElementById("result-div-span2").innerHTML = complete_date();
    document.getElementById("result-div-span3").innerHTML = Math.round(data.main.temp)+"&#8451";
    document.getElementById("result-div-span4").innerHTML = Math.round(data.main.temp_min)+"&#8451; (min) / "+Math.round(data.main.temp_max)+"&#8451 (max)";
    document.getElementById("result-div-span5").innerHTML = data.weather[0].main;
    document.getElementById("result-div-img").src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    backgroud_change(data.weather[0].id);
}

api_request = (name)=>{
    let url = api.url+name+"&appid="+api.key+"&units=metric";
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        display_output(data);
    });
}

search_icon.addEventListener('click', (event)=>{
    if(input.value == "")
        return false;
    else
        api_request(input.value);
});

window.addEventListener('load', ()=>{
    api_request("delhi");
  });