// api.openweathermap.org/data/2.5/weather?q=noida&appid=c3db8b90a36c9eee7eca24b8001913cb
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
document.getElementById("result-div-span2").innerHTML = complete_date();

display_output = (data)=>{
    console.log(data);

    document.getElementById("result-div-span1").innerHTML = data.name+", "+data.sys.country;
    document.getElementById("result-div-span2").innerHTML = complete_date();
    document.getElementById("result-div-span3").innerHTML = Math.round(data.main.temp)+"&#8451";
    document.getElementById("result-div-span4").innerHTML = Math.round(data.main.temp_min)+"&#8451; (min) / "+Math.round(data.main.temp_max)+"&#8451 (max)";
    document.getElementById("result-div-span5").innerHTML = data.weather[0].main;
    document.getElementById("result-div-img").src = "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
}

api_request = ()=>{
    let url = api.url+input.value+"&appid="+api.key+"&units=metric";
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        display_output(data);
    });
}

search_icon.addEventListener('click', (event)=>{
    if(input.value == "")
        return false;

    api_request();
});