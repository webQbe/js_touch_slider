// Define DOM Elements
const slider = document.querySelector('.slider-container'),

/* Convert node list into an array with Array.from() */
slides = Array.from(document.querySelectorAll('.slide')) 

// Globals
let isDragging = false, // Mouse-down & moving
    startPos = 0, // Position clicked
    currentTranslate = 0, // TranslateX(value)
    prevTranslate = 0, 
    animationID = 0, 
    currentIndex = 0 // Current slide


