// To debug this code, open wixDefaultCustomElement.js in Developer Tools.

const IMAGE_URL = 'https://wix.to/vUBXBKU';
const DEBUG_TEXT = 'Loading the code for Custom Element \'wix-default-custom-element\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';


const createCard = (img, title, description) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = IMAGE_URL;
    const div = document.createElement("div");
    const h2 = document.createElement("div");
    h2.textContent = title;
    const p = document.createElement("p");
    p.textContent = description;
    
    div.appendChild(h2, p);
    card.appendChild(img, div);
    slide.appendChild(card);

    return slide;
}



const createContainer = (data) => {
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "slider-container";
    for(let i = 0; i<data; i++) {
        sliderContainer.appendChild(createCard(null, data[i].title, data[i].description))
    }
    return sliderContainer;
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
    console.log(DEBUG_TEXT);
  }

  connectedCallback() {
    this.appendChild(createStyle());


    this.appendChild(createContainer([
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
    ]));
  }
}
customElements.define('my-custom-element', MyCustomElement);