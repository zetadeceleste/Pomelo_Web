let header = document.getElementById("header");
let headerLogo = document.getElementById("header-logo");
let headerMobileLogo = document.getElementById("header-mobile-logo");
let sectionPortada = document.getElementById("section-portada");
let menuButton = document.getElementById("menu-button");
let navElementsArray = document.getElementsByClassName("nav-element");
let navContacto = document.getElementById("nav-contacto");
let navServicios = document.getElementById('nav-servicios');
let navPortfolio = document.getElementById('nav-portfolio');
let navNosotros = document.getElementById('nav-nosotros');
let portadaContenido = document.getElementById("portada-contenido");
let sectionContacto = document.getElementById("section-contacto");
let sectionServicios = document.getElementById('section-servicios');
let sectionPortfolio = document.getElementById('section-portfolio');
let sectionNosotros = document.getElementById('section-nosotros');
let formButton = document.getElementById('form-button');
let form = document.getElementById('form');
let formNombre = document.getElementById('form-nombre');
let formEmail = document.getElementById('form-email');
let formPhone = document.getElementById('form-phone');
let formConsulta = document.getElementById('form-consulta');
let formSendMessage = document.getElementById('form-send-message');
let serviciosTitle = document.getElementById('servicios-title');
let portfolioTitle = document.getElementById('portfolio-title');
let nosotrosTitle = document.getElementById('nosotros-title');
let contactoTitle = document.getElementById('contacto-title');
let portfolioContent = document.getElementById('portfolio-content');
let introButton = document.getElementById('intro-button');
let containers = document.getElementsByClassName('container');
let huarpesLinks = document.getElementsByClassName('huarpes');
let faustoLinks = document.getElementsByClassName('fausto');

//------Portfolio-------//
if(window.innerWidth > 768){
    for(let container of containers){
        container.addEventListener("mouseover",()=>{
            container.firstElementChild.classList.add('inside-visible');
            
        });
        container.addEventListener("mouseout",()=>{
            container.firstElementChild.classList.remove('inside-visible');        
        });
    }
}
if(window.innerWidth <=768){
    for(let link of huarpesLinks){
        link.addEventListener("click",()=>{
            window.open("https://santiagobeloqui.github.io/huarpes/");
        });
    }
    for(let link of faustoLinks){
        link.addEventListener("click",()=>{
            window.open("https://pomelodev.github.io/faustoweb/");
        });
    }
}

//------Posiciones------//

let posSectionPortada = sectionPortada.getBoundingClientRect().bottom;
let posSectionContacto = sectionContacto.getBoundingClientRect().top;
let posSectionServicios = sectionServicios.getBoundingClientRect().top;
let posSectionPortfolio = sectionPortfolio.getBoundingClientRect().top;
let posSectionNosotros = sectionNosotros.getBoundingClientRect().top;
//---------Links Internos-----//
let addLink = function(link, posicion, margin){
    link.addEventListener("click", ()=>{
        window.scroll({
            top: posicion - margin,
            left: 0,
            behavior: 'smooth'
        });
        for(let element of navElementsArray){
            element.classList.remove("nav-element-nav-show");
        }
        header.classList.remove("header-nav-show");
        navContacto.classList.remove("nav-contacto-nav-show");
        portadaContenido.classList.remove("portada-contenido-nav-show");
        navMobileShow = false;
    });
};

addLink(navServicios, posSectionServicios, 80);
addLink(navPortfolio, posSectionPortfolio, 80);
addLink(navNosotros, posSectionNosotros, 80);
addLink(navContacto, posSectionContacto, 0);
addLink(introButton, posSectionContacto, 0);




//------Animación scroll------//

window.onscroll = ()=>{
    if (window.pageYOffset >= posSectionPortada){
        header.classList.add("header-fixed");
        headerLogo.classList.add("header-logo-fixed");
        sectionPortada.style.height ="100vh";
    }
    if (window.pageYOffset >= posSectionPortada && window.innerWidth <= 768){
        headerMobileLogo.style.visibility = "visible";
    }
    if (window.pageYOffset < posSectionPortada){
        header.classList.remove("header-fixed");
        headerLogo.classList.remove("header-logo-fixed");
        sectionPortada.style.height ="90vh";
    }
    if (window.pageYOffset < posSectionPortada && window.innerWidth <= 768){
        headerMobileLogo.style.visibility = "hidden";
    }
    if (window.pageYOffset >= posSectionContacto-10 && window.innerWidth > 768){
        headerLogo.classList.remove("header-logo-fixed");
    }
    if(window.pageYOffset < posSectionContacto-10 && window.pageYOffset > posSectionPortada){
        headerLogo.classList.add("header-logo-fixed");
    }
    if(window.pageYOffset > posSectionServicios - window.innerHeight * 0.50) {
        serviciosTitle.classList.add('title-visible');
    }
    if(window.pageYOffset > posSectionPortfolio - window.innerHeight * 0.50) {
        portfolioTitle.classList.add('title-visible');
    }
    if(window.pageYOffset > posSectionNosotros - window.innerHeight * 0.50) {
        nosotrosTitle.classList.add('title-visible');
    }
    if(window.pageYOffset > posSectionContacto - window.innerHeight * 0.50) {
        contactoTitle.classList.add('title-visible');
    }

};

//------Menu button------//
let navMobileShow = false;
menuButton.addEventListener("click", ()=>{
    if(navMobileShow == false){
        for(element of navElementsArray){
            element.classList.add("nav-element-nav-show");
        }
        header.classList.add("header-nav-show");
        navContacto.classList.add("nav-contacto-nav-show");
        sectionPortada.style.height ="100vh";
        portadaContenido.classList.add("portada-contenido-nav-show");
        navMobileShow = true;
    } else{
        for(let element of navElementsArray){
            element.classList.remove("nav-element-nav-show");
        }
        header.classList.remove("header-nav-show");
        navContacto.classList.remove("nav-contacto-nav-show");
        portadaContenido.classList.remove("portada-contenido-nav-show");
        navMobileShow = false;
    }
});

/*--------FORM-------*/
formButton.addEventListener("click", (event)=>{
    event.preventDefault();
    if(formNombre.value == "" | formEmail.value == "" | formPhone.value == "" |formConsulta.value == ""){
        let message = document.createTextNode("Completá todos los campos");
        while(formSendMessage.firstChild){
            formSendMessage.removeChild(formSendMessage.firstChild);
        }
        formSendMessage.appendChild(message);
    }else{
        fetch('http://localhost:3000/contact', {
            method:'POST',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'POST, GET',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre":formNombre.value,
                "email": formEmail.value,
                "phone": formPhone.value,
                "consulta":formConsulta.value 
            })
        }).then(response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed');
        }, networkError => console.log(networkError.message)
        ).then(jsonResponse =>{
            console.log(jsonResponse);
            form.reset();
            let message = document.createTextNode("¡Gracias por tu mensaje!");
            while(formSendMessage.firstChild){
                formSendMessage.removeChild(formSendMessage.firstChild);
            }
            formSendMessage.appendChild(message);
        });
    }
});

/*----LINKS REDES-----*/
let facebookIcon = document.getElementById("facebook-icon");
let linkedinIcon = document.getElementById('linkedin-icon');
let instagramIcon = document.getElementById('instagram-icon');
facebookIcon.addEventListener('click', ()=>{
    window.open('https://www.facebook.com/pomelodev/');
});
linkedinIcon.addEventListener('click', ()=>{
    window.open('https://www.linkedin.com/company/pomelodev/');
});