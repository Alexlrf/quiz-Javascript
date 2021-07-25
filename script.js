
let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion(){
    if (questions[currentQuestion]) {
        let quest = questions[currentQuestion];
        
        let progressBar = Math.floor((currentQuestion/questions.length)*100);
        document.querySelector('.progress--bar').style.width = `${progressBar}%`;
        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = quest.question;
        
        let optionHtml = '';
        for(let i in quest.options){
            optionHtml += `<div data-op="${i}" class= "option"><span>${parseInt(i)+1}</span>${quest.options[i]}</div>`           
        }
        document.querySelector('.options').innerHTML = optionHtml;
        
        document.querySelectorAll('.options .option').forEach(item=> {
            item.addEventListener('click', optionClickEvent);
        });
        
    } else {
        finishQuiz()
    }
}

function optionClickEvent(e){
    
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    
    if(clickedOption === questions[currentQuestion].answer){
        correctAnswer++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswer / questions.length) * 100);
    
    if (points < 40) {
        document.querySelector('.scoreText1').innerHTML = 'Você foi mal';
        document.querySelector('.scorePct').style.color = 'red';
    } else if (points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bem';
        document.querySelector('.scorePct').style.color = 'yellow';
    }  else {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = 'green';
    }
    
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}`
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    currentQuestion = 0;
    correctAnswer = 0;
    console.log('FFFFFFF');
    showQuestion();
}