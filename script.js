// Define DOM Elements
const slider = document.querySelector('.slider-container'),

/* Convert node list into an array with Array.from() */
slides = Array.from(document.querySelectorAll('.slide')) 

// Globals
let mouseDown = false, 
    startPos = 0, // Position clicked
    currentTranslate = 0, // TranslateX(value)
    prevTranslate = 0, 
    animationID = 0, 
    currentIndex = 0 // Current slide

// Loop Through Slides Array
slides.forEach((slide, index) => { 

    // Prevent image dragging effect
    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch Events
    // Listen for touch-down event on current slide
    slide.addEventListener('touchstart', touchStart(index)); // Call func with index
    //  Listen for touch-release event
    slide.addEventListener('touchend', touchEnd);
    //  Listen for touch-moving event
    slide.addEventListener('touchmove', touchMove);

     // Mouse Events
    // Listen for click-down event on current slide
    slide.addEventListener('mousedown', touchStart(index)) // Call func with index
    // Listen for mouse up event
    slide.addEventListener('mouseup', touchEnd);
    // Listen for cursor leaving slide event
    slide.addEventListener('mouseleave', touchEnd);
    //  Listen for cursor moving around event
    slide.addEventListener('mousemove', touchMove);


});

function touchStart(index){

    // Return func
    return function(event){

        mouseDown = true;
        console.log('start');

    }
}

function touchEnd(){

    mouseDown = false;
    console.log('end');

}

function touchMove(){

    // Skip if MouseUp
    if(mouseDown){

        console.log('move');

    }

}
