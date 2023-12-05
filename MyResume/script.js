console.log('script start');

// ########### all variables ###########
let navbarAnchorTags = document.querySelectorAll('.navbar a');
let scrollInterval;
let allSkillBar = document.querySelectorAll('.skill-name');

// ########### all functions ###########

// vertically scroller function
function scrollVertically(targetSection){
    let targetSectionCordinate = targetSection.getBoundingClientRect().top;
    if(targetSectionCordinate <= 0){
        clearInterval(scrollInterval);
    }
    window.scrollBy(0,50);
}

// skill progress initialiser function to 0%
function initialiseSkillBar(skillBar){
    skillBar.setAttribute("data-visited", false);
    skillBar.style.width = 0 + '%';
}

// cheking when progress will be start for all skill progress  
function checkScroll(){
    for(let skillBar of allSkillBar){
        let skillBarCoordinates = skillBar.getBoundingClientRect();
        if((skillBar.getAttribute("data-visited") == "false") && 
        (skillBarCoordinates.top < (window.innerHeight - skillBarCoordinates.height))
        ){
            // updating data-visited  attribute to known skill progress done or not 
            skillBar.setAttribute("data-visited", true);
            //calling function for skill progress
            fillSkillBar(skillBar);
        }
        else if(skillBarCoordinates.top > window.innerHeight){
            initialiseSkillBar(skillBar);
        }
    }
}

// skill progress animation function 
function fillSkillBar(skillBar){
    let currentWidth = 0;
    let targetWidth = skillBar.getAttribute("data-bar-width");

    let interval = setInterval(function(){
        if(currentWidth >= targetWidth){
            clearInterval(interval);
        }
        currentWidth++;
        skillBar.style.width = currentWidth + '%';
    },5);
}


// ########### all logic code below ###########

// smooth scroll all sections
for(let i=0; i<navbarAnchorTags.length; i++){
    navbarAnchorTags[i].addEventListener('click',function(event){
        event.preventDefault();

        let targetSectionId = this.textContent.trim().toLowerCase();
        let targetSection = document.getElementById(targetSectionId);
        
        scrollInterval = setInterval(scrollVertically, 20, targetSection);
    });
}

// initialies all skill progress 0% at the starting 
for(let skillBar of allSkillBar){
    initialiseSkillBar(skillBar);
}

// all skills progress  autofill 
window.addEventListener('scroll', checkScroll);

console.log('script End');