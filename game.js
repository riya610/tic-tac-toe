var score ={
'X':0,
'O':0
};
var turn ='X';
var Dimensions  =0;

function gameLoad(){
var select = document.getElementById("grid");
for(i =3; i <=3; i +=1){

 select.options[select.options.length]=new Option(i +' X '+ i, i);
}

    addEvent(document.getElementById("game"),"click", choose);

    reset();
}

function addEvent(element, eventName, callback){

if(element.addEventListener){
        element.addEventListener(eventName, callback,false);
}else if(element.attachEvent){
        element.attachEvent("on"+ eventName, callback);
}
}

function choose(e){
if(e.target && e.target.nodeName =="TD"){
var targetElement = document.getElementById(e.target.id);
var prevTurn;
if((targetElement.className).indexOf("disabled")==-1){
            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);
            score[turn]+=1;
            prevTurn = turn;
            turn = turn ==="X"?"O":"X";
if(decide(targetElement, prevTurn)){
                alert(prevTurn +'--Won!!..Wow!!');
                reset();
}else if((score['X']+ score['O'])==(Dimensions  * Dimensions )){
                alert('Tie,Play again!!');
                reset();
}
}
}
}

function decide(targetElement, prevTurn){
var UL = document.getElementById('game');
var elements, i, b, cnt;
if(score[prevTurn]>= Dimensions ){
var classes = targetElement.className.split(/\s+/);
for(i =0; i < classes.length; i +=1){
            cnt =0;
if(classes[i].indexOf('row')!==-1|| classes[i].indexOf('col')!==-1|| classes[i].indexOf('dia')!==-1){
                elements = UL.getElementsByClassName(classes[i]);
for(b =0; b < elements.length; b +=1){
if(elements[b].innerHTML == prevTurn){
                        cnt +=1;
}
}
if(cnt == Dimensions ){
return true;
}
}
}
}
return false;
}

function reset(){
var gameUL = document.getElementById("game");
if(gameUL.innerHTML !==''){
        gameUL.innerHTML =" ";
        score ={
'X':0,
'O':0
};
        turn ='X';
        Dimensions  =0;
}
var select = document.getElementById("grid");
    Dimensions  = select.options[select.selectedIndex].value;
var i, b, li, k =0,
        classLists;
var addGrid =+Dimensions  +1;

for(i =1; i <= Dimensions ; i +=1){
        tr = document.createElement('tr');
for(b =1; b <= Dimensions ; b +=1){
            k +=1;
            li = document.createElement('td');
            li.setAttribute("id",'li'+ k);

            classLists ='td row'+ i +' col'+ b;

if(i === b){
                classLists ='td row'+ i +' col'+ b +' dia0';
}

if((i + b)=== addGrid){
   classLists ='td row'+ i +' col'+ b +' dia1';
}

if(!isEven(Dimensions ) && (Math.round(Dimensions  /2)=== i && Math.round(Dimensions  /2)=== b))
   classLists ='td row'+ i +' col'+ b +' dia0 dia1';

        li.className = classLists;
        tr.appendChild(li);

}
        gameUL.appendChild(tr);
}
}

function isEven(value){
return value %2 ==0;
}