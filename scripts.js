var Id_transfer = "12jkljklja"
var minutes = 0;
var seconds = 15;
document.querySelectorAll('.id-transfer').forEach((e) =>{
    e.innerHTML = Id_transfer;
})

function setTimerLocalStore(m,s){
    let arrayTimer = {
        id: Id_transfer,
        minutes: m,
        seconds: s
    }
    localStorage.setItem('timer', JSON.stringify(arrayTimer));
}

if(!localStorage.getItem('timer')){
    setTimerLocalStore(minutes, seconds);
}
if(localStorage.getItem('timer')){
    minutes = JSON.parse(localStorage.getItem('timer')).minutes;
    seconds = JSON.parse(localStorage.getItem('timer')).seconds;
    document.querySelector('.timer').innerHTML = `0${minutes}:${seconds}`;
    
    const a = setInterval(function(){
        timer();
    }, 1000)
    function timer(){
        seconds--;
        if(seconds < 0){
            seconds = 59;
            minutes--;
        }
        var stringseconds = seconds;
        if(seconds < 10){
            stringseconds = `0${seconds}`;
        }
        document.querySelector('.timer').innerHTML = `0${minutes}:${stringseconds}`;
        setTimerLocalStore(minutes, seconds);
        if(minutes <= 0 && seconds <= 0){
            localStorage.removeItem("timer");
            document.querySelector('.timer').innerHTML = "00:00";
            clearInterval(a);
        }
    }
}
    

