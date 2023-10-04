let sec1=document.getElementById("intro");
let heading=document.getElementById("heading");
let para=document.getElementById("para");
let btn=document.getElementById("btn");

let nava=document.getElementById("anchor");

let sec2=document.getElementById("quizPage");
let question=document.getElementById("questions");
let options=document.getElementsByClassName("options");
let ans=document.getElementById("ans");


let sec3=document.getElementById("afterLastQuestion");
let scorecard=document.getElementById("scorecard")
let btnUserName=document.getElementById("btnUserName");
let input=document.getElementById("username");

let sec4=document.getElementById("finalSec");
let highScoreList=document.getElementById("highScoreList");
let btnBack=document.getElementById("btnback");
let btnReset=document.getElementById("btnclear");




let time=document.getElementById("time");
let score=0;
let main=document.getElementById("main");
let intervalId;

function starting(){
    let timer=50;
    time.textContent=timer;
        intervalId=setInterval(()=>{
        timer--;
        time.textContent=timer;
    },1000);
    // setTimeout(()=>{
    //     displayLast();
    // },50000);
    main.style.margin="5.5vmax auto";
    sec1.style.display="none";
    sec3.style.display="none";
    sec4.style.display="none";
    sec2.style.display="block";
    displayQuestions(0);
}


function displayQuestions(i){
    question.textContent=questions[i]["questionText"]
    let arr=questions[i]["options"]
    for(let j=0;j<arr.length;j++){
        options[j].textContent=arr[j];
    }
    displayNext(i,questions[i]["answer"]);
}
function displayNext(i,answer){
    function handleOptionClick(event){
        
        if(i<questions.length-1)
        {
            if(answer==event.target.id)
            {
                ans.innerHTML="<hr>Correct!";
                score+=10;
                setTimeout(()=>{
                    ans.textContent=" ";
                },1000)
            }
            else
            {
                ans.innerHTML="<hr>Incorrect!"
                 setTimeout(()=>{
                    ans.textContent=" ";
                },1000)
            }
            for (let opt of options) {
                opt.removeEventListener("click", handleOptionClick);
            }
            setTimeout(()=>{
                displayQuestions(++i);
            },1200)
        }
        else
        {
            if(answer==event.target.id)
            {
                ans.innerHTML="<hr>Correct!";
                score+=10;
                setTimeout(()=>{
                    ans.textContent=" ";
                },1000)
            }
            else
            {
                ans.innerHTML="<hr>Incorrect!"
                setTimeout(()=>{
                    ans.textContent=" ";
                },1000)
            }
            for (let opt of options) {
                opt.removeEventListener("click", handleOptionClick);
            }
            setTimeout(()=>{
                displayLast();
            },1200);
        }
    }
    for (let opt of options) {
        opt.addEventListener("click", handleOptionClick);
    }
}

function displayLast(){
    clearInterval(intervalId);
    sec1.style.display="none";
    sec2.style.display="none";
    sec4.style.display="none";
    sec3.style.display="block";
    scorecard.textContent=score;
}
let arr_score=[];
let lastdata=[];
function save(){
    lastdata=JSON.parse(localStorage.getItem("leaderboard"));
    if(lastdata===null)
    {
        arr_score.push({[input.value]:score});
    }
    else
    {
        arr_score = arr_score.concat(lastdata);
        arr_score.push({[input.value]:score});
    }
    input.value="";
    localStorage.setItem("leaderboard",JSON.stringify(arr_score));
    displayScore();
}

function displayScore(){
    sec1.style.display="none";
    sec2.style.display="none";
    sec3.style.display="none";
    sec4.style.display="block";
    let data=JSON.parse(localStorage.getItem("leaderboard"))
     data.sort((d1, d2) => d2[Object.keys(d2)[0]] - d1[Object.keys(d1)[0]]);
    for(let i=0;i<data.length;i++){
        for(let j in data[i])
        {
            highScoreList.innerHTML+=`<li>${j}-${data[i][j]}</li>`
        }
    }
    btnReset.style.marginTop="1vmax";
}

btnUserName.addEventListener("click",()=>{
    if(input.checkValidity()){
        save();
    }
    else{
        alert("Please fill your name")
    }
});
btn.addEventListener("click",starting);
btnReset.addEventListener("click",()=>{
    localStorage.removeItem("leaderboard");
    location.reload();
})
btnBack.addEventListener("click",()=>{
    location.reload();
})

nava.addEventListener("click",displayScore)
