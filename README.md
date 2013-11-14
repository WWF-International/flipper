# Card flippy thing

Currently being used on http://wwf.org.uk/adoptions/gift-catalogue. So any bugs, let us know!

## Aim
To have a gallery of images / grid of content that when clicked, make an image flip and turn around, revealing [something] on the back of it.

## Caveats
* Known bugs in Webkit - transition is very janky and flickery
* Not tested in Internet Explorer 10
* Works in Internet Explorer 9 - just without the transition

## Requirements / dependancies
* jQuery 1.10.2 (as that's the only version this has been tested with)
* modernizr - tests for CSS 3D transforms, CSS transforms, CSS transitions.
* WWF-LESS modules (coming soon)
* LESS compiler - to turn the LESS into CSS.

## To do
* Make the jQuery cleaner, less hacky [almost there]
* Allow either different backs or the same back for every card.
* ???
* Save the world