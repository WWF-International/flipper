$(document).ready(function(){

    // Setting some variables. [Alphabetical order]
    // --------------------------------------------
    var isACard = 0,
        theDocument = $(document),
        theFlipper = $('#flipper'),
        theFlipperContainer = $('.flipper-container'),
        theFlipperFront = $('#flipper-front'),
        timingDelay = 500;

    
    // Test to see if the browser supports any transforms - whether 3D or 2D.
    // Then set a variable that can be used later on when the visitor clicks.
    // ----------------------------------------------------------------------
    function modernizrTests() {
        // 2 = CSS 3D tranforms supported.
        // 1 = CSS transforms supported.
        // 0 = Not supported. I'm looking at you IE.

        cssTransformSupport = 0;
        cssTransitionsSupport = 0;

        // test for CSS 3D transforms
        if (Modernizr.csstransforms3d) {
            cssTransformSupport = 2;
        }

        // test for CSS transforms
        else if (Modernizr.csstransforms) {
            cssTransformSupport = 1;
        }

        if (Modernizr.csstransitions) {
            cssTransitionsSupport = 1;
        }
    };
    modernizrTests();


    // Adding a curtain that fades in behind the lightbox / flipped card.
    // ------------------------------------------------------------------
    function curtainCall() {
       $('#curtain').fadeToggle();
    };


    // Checking if the element that's been clicked is a card or the button within - then reassigning
    // theCard to be the card, rather than any internal elements.
    // ---------------------------------------------------------------------------------------------
    function checkIfACard(card) {
        theCardCheck = card.target.localName; // returns the element type eg: h2, a, section
        theCardCheckParent = card.target.offsetParent.localName;

        if ( theCardCheck == 'h2' || theCardCheckParent == 'h2' ) {
            isACard = 1;
        }

        if (theCardCheckParent == 'h2') {
            theCard = card.target.parentElement;
        }
    };

    function resetCheckIfACard() {
        isACard = 0;
    }


    // Here we want to:
    //      * Get the attributes needed of the card - height, width, x position, y position.
    //      * Get how much the window has scrolled relative to the document.
    //      * Set the position and dimensions of flipper to be the same as the card that's been clicked.
    // -------------------------------------------------------------------------------------------------
    function setFlipper(theCard) {
        theDocumentX = theDocument.scrollTop(),
            theCardHeight = theCard.clientHeight,
            theCardWidth = theCard.clientWidth,
            theCardPosition = theCard.getBoundingClientRect();

        theFlipper.css({ 
            'top' : theCardPosition.top + theDocumentX,
            'left' : theCardPosition.left,
            'width' : theCardWidth,
            'height' : theCardHeight
        });

    };


    // Now we've got the proper position of the card, we want to copy it and place it outside of the
    // relatively positioned container - so it can be be absolutely positioned relative to the window, 
    // rather than the parent container.
    // -----------------------------------------------------------------------------------------------
    function setCardFree(theCardItself) {
        theFlipperFront.prepend( theCardItself.clone().addClass('cloned') );

    };


    // Need a function that can easily be called to show or hide the cards.
    // --------------------------------------------------------------------
    function switchCardVisibility(whichOne) {
        // Make the cloned card visible, and hide the original card.
        if ( whichOne == 'clone' ) {
            theCardItself.hide();
            theFlipperContainer.show();
        };

        // Make the original card visible, and hide the original card.
        if ( whichOne == 'original' ) {
            theCardItself.show();
            theFlipperContainer.hide();
            $('.cloned').remove(); // This line needs neatening up.
        };

    };


    // Add the classes that will animate the flipping of the card.
    // -----------------------------------------------------------
    function triggerFlip(openOrClose) {

        if ( openOrClose == 'open' ) {
            var cardEndPositionX = theDocument.scrollTop() + 20;
            switchCardVisibility('clone'); 
        }

        if ( openOrClose == 'close' ) {
            cardEndPositionX = theCardPosition.top + theDocumentX;

            console.log ( cardEndPositionX + 'close' );

            if ( ( cssTransformSupport == 1 && cssTransitionsSupport == 1 ) || ( cssTransformSupport == 2 && cssTransitionsSupport == 1 ) ) {
                setTimeout(function() {  
                    switchCardVisibility('original');

                }, timingDelay);
            }
            
            else  {                
                switchCardVisibility('original');
            }

        }

        theDocument.scrollTop(theDocument.scrollTop() + 0); // I don't know why this works, but it does. Seems to allow the CSS3 transition.

        theFlipper.toggleClass('flipped').css({ 'top' : cardEndPositionX });
    };


    function flipClose() {
        resetCheckIfACard();
        triggerFlip('close');
        curtainCall();
    };


    // The hero function - the one that calls all of the other functions together.
    // ---------------------------------------------------------------------------
    function thisIsAFunction(card) {

        // returns the element clicked as an object
        theCard = card.target; 
        
        // check if what's being clicked is actually a card, then make sure that it is. If an element
        // inside is clicked (eg <span>) we need to reselect the card again.
        checkIfACard(card);

        // the card DOM reference. Needs to run after checkIfACard.
        theCardItself = $(theCard); 

        // run the functions based on whether it is a card or not
        if ( isACard == 1 ) {
            curtainCall();
            setFlipper(theCard);
            setCardFree(theCardItself);
            triggerFlip('open');
        };

        return false;

    };


    $('#house-of-cards').click(thisIsAFunction);
    $('#card-close').click(flipClose);


});