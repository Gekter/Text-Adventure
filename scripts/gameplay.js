let slides = [];
let cur = 0;

var audio = document.getElementById('darkForest')
document.addEventListener('click', () => {
    audio.play();
})



window.onunload = () => {
    localStorage.setItem('saved_slide', cur);
    localStorage.setItem('isload', false)
}


if (localStorage.slides == null) {
    fetch('db.php?getSlides')
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            localStorage.setItem('slides', data);
        })
        .then(main)
        
} else {
    main();
}



function main() {
    slides = JSON.parse(localStorage.slides);
    if (localStorage.isload == 'true') {
        setSlideContent(+localStorage.saved_slide)
    } else {
        setSlideContent(0);
    }
    
    
}

function setSlideContent(id) {
    document.querySelector('#text h3').innerHTML = slides[id].text
    if (slides[id].image != '') {
        document.querySelector('body').style.backgroundImage = `url(../img/${slides[id].image})`
    }
    let htmlButtons = document.getElementById('buttons');
    htmlButtons.innerHTML = '';
    for (button of slides[id].buttons) {
        const b = document.createElement('button');
        b.classList.add("mt-1", "m-0", "w-100");
        b.value = button.id_next_slide;
        b.append(document.createElement('h4'));
        b.querySelector('h4').innerText = button.text;
        b.addEventListener('click', () => {
            setSlideContent(b.value-1)
        })
        htmlButtons.append(b);
    }
    cur = id;
}