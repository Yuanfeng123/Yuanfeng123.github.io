// To debug this code, open wixDefaultCustomElement.js in Developer Tools.
// 'https://wix.to/vUBXBKU'
const IMAGE_URL = "https://www.runoob.com/wp-content/uploads/2015/05/cpp-inheritance-2020-12-15-1.png";
const DEBUG_TEXT = 'Loading the code for Custom Element \'wix-default-custom-element\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';


const createCard = (imgURL, title, description) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = IMAGE_URL;
    const divI = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = title;
    const p = document.createElement("p");
    p.textContent = description;

    divI.appendChild(h2);
    divI.appendChild(p);
    card.appendChild(img);
    card.appendChild(divI)
    slide.appendChild(card);

    return slide;
}

const createSlides = (data) => {
    const res = [];
    for(let i = 0; i<data.length; i++) {
        res.push(createCard(null, data[i].title, data[i].description));
    }
    return res;
}

const createContainer = (data) => {
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";
    for(let i = 0; i<data.length; i++) {
        sliderContainer.appendChild(data[i])
    }
    console.log(sliderContainer)
    return sliderContainer;
}


const createLeftArr = () => {
    const temp = document.createElement("button");
    temp.textContent = "<";
    temp.className = "arrow-left";
    return temp;
}

const createRightArr = () => {
    const temp = document.createElement("button");
    temp.textContent = ">";
    temp.className = "arrow-right";
    return temp;
}



const createStyle = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    my-custom-element {
        width: 100vw;
        position: relative;
        height: 25em;
        margin: 2em 0;
    }
    
    my-custom-element .slider-container {
        background:#eee;
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        align-items: center;
        width: 200%;
        height: 100%;
        overflow: hidden;
    }
    
    my-custom-element .slide {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 1em;
    }
    
    
    my-custom-element .slide .card {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.2);
    }
    
    my-custom-element .card div {
        padding: 1em 1.5em;
    }
    
    my-custom-element .slide img {
        height: 14em;
        width: 100%;
        object-fit: cover;
    }
    
    my-custom-element .slide h2 {
        margin: 0.2em 0;
    }
    
    my-custom-element .slide p {
        font-size: 0.9em;
        color: #8b8b8b;
    }
    
    my-custom-element .arrow-left,
    .arrow-right {
        background: #000;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        position: absolute;
        top: 50%;
        transform: translateX(-50%);
        font-size: 1em;
        cursor: pointer;
        transition: 0.3s;
    }
    
    my-custom-element .arrow-left:hover,
    .arrow-right:hover {
        background: #fff;
        color: #000;
    }
    
    my-custom-element .arrow-left {
        left: 1em;
    }
    
    my-custom-element .arrow-right {
        right: 1em;
    }
    `;
  return styleElement;
};

class MyCustomElement extends HTMLElement {
  constructor() {
    super();
    this.slides = createSlides([
        {
            "title": "card 1",
            "description": "card 1"
        },
        {
            "title": "card 2",
            "description": "card 2"
        },
        {
            "title": "card 3",
            "description": "card 3"
        },
        {
            "title": "card 4",
            "description": "card 4"
        },
        {
            "title": "card 5",
            "description": "card 5"
        },
        {
            "title": "card 6",
            "description": "card 6"
        },
        {
            "title": "card 7",
            "description": "card 7"
        },
        {
            "title": "card 8",
            "description": "card 8"
        },
        {
            "title": "card 9",
            "description": "card 9"
        }
    ]);

    this.container = createContainer(this.slides);

    this.arrLeft = createLeftArr();
    this.arrRight = createRightArr();

    console.log(DEBUG_TEXT);
  }

  connectedCallback() {
    this.appendChild(createStyle());

    this.appendChild(this.container);
    this.appendChild(this.arrLeft);
    this.appendChild(this.arrRight);

    let offset = 0;
    let slideIncrement = 0;
    let slideDecrement = this.slides.length - 1;
    
    this.arrRight.addEventListener("click", ()=>{
        this.arrRight.disabled = true;
        offset = this.slides[0].offsetWith;
        this.container.style.transition = "left ease-in-out 100ms";
        this.container.style.left = -offset + "px";

        setTimeout(()=>{
            this.container.style.transition = "none";
            this.slides[slideIncrement].style.order = this.slides.length - 1;
            this.container.style.left = 0;
            slideIncrement++;
            slideDecrement = slideIncrement - 1;
            if(slideIncrement === this.slides.length) {
                slideIncrement = 0;
                this.slides.forEach(slide=>{
                    slide.style.order = "initial";
                })
            }
            this.arrRight.disabled = false;
        }, 100)
    })

    this.arrLeft.addEventListener("click", ()=>{
        this.arrRight.disabled = true;
        offset = this.slides[0].offsetWith;
        this.container.style.transition = "none";

        if(slideDecrement < 0) {
            this.slides.forEach(slide=>{
                slide.style.order = "initial";
            });

            slideDecrement = slides.length - 1;
        }

        this.slides[slideDecrement].style.order = "-1";
        this.container.style.left = -offset + "px";

        setTimeout(()=>{
            this.container.style.transition = "left ease-in-out 100ms";
            this.container.style.left = 0;
        }, 1);

        setTimeout(()=>{
            slideDecrement--;
            slideIncrement = slideDecrement + 1;
            this.arrRight.disabled = false;
        }, 100)

        
    })
  }
}
customElements.define('my-custom-element', MyCustomElement);