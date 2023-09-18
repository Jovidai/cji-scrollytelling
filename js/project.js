// using d3 for convenience, and storing a selected elements
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
var media = document.getElementById('media');
var caption = document.getElementById('caption');

// initialize the scrollama
var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() {
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {

    // sticky the graphic
    if (response.index === 0) {
        graphic.classed('is-fixed', true);
    }

    // fade in current step
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    const backdrops = [
        { 'src': './assets/images/CJI-Population-1.jpg',
        
        },
        { 'src': './assets/images/CJI-Population-2.jpg',
        
        },
        { 'src': './assets/images/CJI-Population-3.jpg',
        
        },
        { 'src': './assets/images/CJI-Population-4.jpg',
       
        },
        { 'src': './assets/images/CJI-Population-5.jpg',
       
        },
        { 'src': './assets/images/CJI-Population-6.jpg',
       
        },
    ]
    media.src = backdrops[response.index].src;
    media.alt = backdrops[response.index].alt;
    caption.textContent = backdrops[response.index].caption;
}

function handleStepExit(response) {
    // if (response.index === 0) {
    //     graphic.classed('is-fixed', false);
    // }

    window.onscroll = function() {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
            graphic.classed('is-fixed', false);
        }
      }
}

// optional to view precise percent progress on callback
function handleProgress(response) {
    console.log(response)
}

// kick-off code to run once on load
function init() {
    // 1. call a resize on load to update width/height/position of elements
    handleResize();

    // 2. setup the scrollama instance
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            container: '#scroll', // our outermost scrollytelling element
            graphic: '.scroll__graphic', // the graphic
            text: '.scroll__text', // the step container
            step: '.scroll__text .step', // the step elements
            offset: 0.5, // set the trigger to be 1/2 way down screen
            // debug: true, // display the trigger offset for testing
            progress: false
        })
        // .onStepProgress(handleProgress)
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)

    // setup resize event
    window.addEventListener('resize', handleResize);
}

// start it up
init();
