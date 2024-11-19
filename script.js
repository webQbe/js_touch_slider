// Define DOM Elements
const slider = document.querySelector('.slider-container'),

/* Convert node list into an array with Array.from() */
slides = Array.from(document.querySelectorAll('.slide')) 

// Globals
let mouseDown = false, 
    startPos = 0, // Position clicked
    currentTranslate = 0, // TranslateX(value)
    prevTranslate = 0,  // position of the slider before drag started
    animationID = 0, 
    currentIndex = 0 // currently displayed slide's index.

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

// Disable Context Menu
// Listen for context menu opening (right-click)
window.oncontextmenu = function (event) {

    event.preventDefault(); // stops the browser from opening the context menu

    // Stops right-click from propagating to other elements
    // in the DOM that might also be listening
    event.stopPropagation();

    return false; // an older way of preventing default actions in JavaScript. 
    // In some older browsers, it served as a safeguard.
}

function touchStart(index){

    // Return func
    return function(event){

        currentIndex = index; // Set current index
        startPos = getPositionX(event); // Get start X position
        mouseDown = true;

        // Start the animation loop
        // passing reference to animation()
        animationID = requestAnimationFrame(animation);

        // Add grabbing class
        slider.classList.add('grabbing');
        /* Update cursor and scales down image */
    }
}

function touchEnd(){

    mouseDown = false;

    // Stop the animation loop.
    cancelAnimationFrame(animationID);

    /* Without cancelAnimationFrame, the animation() function might keep running even when the interaction has ended, wasting resources and potentially causing unintended behavior. */

    // Bringing in next and previous slides

    // Get the horizontally dragged distance
    const movedBy = currentTranslate - prevTranslate;

    // If movedBy is negative &
    // enough (< -100) to indicate a swipe to the left &
    // currentIndex is NOT last slide's index 
    if(movedBy < -100 && currentIndex < (slides.length - 1)) 
        
        currentIndex += 1;  // Move to the next slide

    // If movedBy is positive &
    // enough (> 100) to indicate a swipe to the right &
    // currentIndex is NOT first slide's index
    if(movedBy > 100 && currentIndex > 0) 
       
        currentIndex -= 1; // Move to the prev slide


    /* If the swipe distance (movedBy) is less than the threshold (e.g., 100 pixels), 
      the currentIndex remains unchanged. */

    // Position slider to display the correct slide
    setPositionByIndex();

 
    // Remove .grabbing class
    slider.classList.remove('grabbing'); 

}

// Handle movement of slider
function touchMove(event){

    // Skip if MouseUp
    if(mouseDown){

        // Get the current mouse or touch position
        const currentPosition = getPositionX(event);

        // currentTranslate determines current position of slider
            // Calculate the new translation value:
            // previous translation + movement since the starting position
        currentTranslate = prevTranslate + currentPosition - startPos;

    }

    /* How touchMove() Works:

        - getPositionX(event) extracts the X-coordinate of the event (either pageX for mouse or clientX for touch).

        - currentTranslate calculates the new slider position by adding the change in position (currentPosition - startPos) to the previous position (prevTranslate). 
    */

}

function getPositionX(event){

    return event.type.includes('mouse') // Get Mouse Events
            ? event.pageX // If true, Get click X position
            : event.touches[0].clientX; // Else, Get to touch X position

}



function animation() {

    // Update the slider's position based on currentTranslate
    setSliderPosition();

    /* Calling setSliderPosition() to update the slider's position visually. */

    // Continue the animation loop if mouseDown is still true
    if (mouseDown) requestAnimationFrame(animation); // callback animation()

    /*  requestAnimationFrame() creates a loop that runs as long as
        the user is interacting with the slider (mouseDown is true). 
    
        It stops when the user releases the mouse or lifts their finger (when touchEnd() sets mouseDown to false).*/

}



function setSliderPosition() {

    // Apply a CSS transform to move the slider
    slider.style.transform = `translateX(${currentTranslate}px)`;

    /* How setSliderPosition() Works:

        - Updates the transform property of the .slider-container element.

        - Moves the slider horizontally (translateX) by the value of currentTranslate (in pixels).
    
    */

}



function setPositionByIndex(){

    // Calculate exact horizontal offset for the slide to be centered
    currentTranslate = currentIndex * -window.innerWidth; // Negative values shift slider left
    /* window.innerWidth : Represents the width of the viewport.*/
    
    // Set previous position to current position
    // ensures that future drag movements start from the new position
    prevTranslate = currentTranslate;
    
    setSliderPosition(); // Apply new position to the slider
    // This visually moves the slider to the calculated position


    /* Example Scenarios:

        Swipe Left (Next Slide):
            currentIndex changes from 0 to 1.
            currentTranslate = 1 * -window.innerWidth = -window.innerWidth.
            The slider moves to the second slide.

        Swipe Right (Previous Slide):
            currentIndex changes from 2 to 1.
            currentTranslate = 1 * -window.innerWidth = -window.innerWidth.
            The slider moves back to the second slide. 
            
        
        Effect of currentTranslate Negative Value:

        By decreasing currentIndex, the negative multiplication 
        (currentIndex * -window.innerWidth) results in a LESS negative currentTranslate.

        This moves the slider rightward, bringing the previous slide into view. */

    

}