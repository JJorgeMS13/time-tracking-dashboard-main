const main = document.getElementById('main');
const btnDaily = document.getElementById('btn_daily');
const btnWeekly = document.getElementById('btn_weekly');
const btnMonthly = document.getElementById('btn_monthly');

async function getData() {
   return fetch('./data.json').then((request) => {
        if (!request.ok) {
            throw new Error(`Error en la solicitud: ${request.status}`);
        }
        return request.json();
    }).catch((error) => {
        console.log(error);
        return null;
    });
}
function createElement() {
    const elementArticle = document.createElement('article');
    const divInfo = document.createElement('div');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    const elementos = {
        elementArticle: elementArticle,
        divInfo: divInfo,
        h3: h3,
        img: img,
        h2: h2,
        p: p
    }

    return elementos;
}
function construirCards(plantilla, timeframes, clase) {
    
    const articulos = document.querySelectorAll('article');

    if (articulos.length < 7) {
        const { elementArticle, divInfo, h3, img, h2, p }  = createElement();
        
        /* agregar id */
        h2.id = `${clase}__h2`;
        p.id = `${clase}__p`;

        elementArticle.classList.add(clase);
        h3.textContent = plantilla;
        h2.textContent = `${timeframes.current} hrs`;
        img.src = './images/icon-ellipsis.svg';
        img.alt = 'Imagen de icono para las tarjetas';
        p.textContent = `Last Daily - ${timeframes.previous} hrs`;
        divInfo.classList.add('card__info');
        divInfo.appendChild(h3);
        divInfo.appendChild(img);
        divInfo.appendChild(h2);
        divInfo.appendChild(p);
    
        elementArticle.appendChild(divInfo);
        elementArticle.classList.add('card');
        main.appendChild(elementArticle);   
    }else {
        const h2Update = document.getElementById(`${clase}__h2`);
        const pUpdate = document.getElementById(`${clase}__p`);
        
        h2Update.textContent = `${timeframes.current} hrs`;
        pUpdate.textContent = `Last Daily - ${timeframes.previous} hrs`;
    }
}

function btnContructor(btn) {
    //Objeto con los periodos que tenemos disponible en nuestro Fetch
    const periodos = {
        'Daily': 'daily',
        'Weekly': 'weekly',
        'Monthly': 'monthly'
    };

    const periodo = periodos[btn];

    getData().then((datos) => {
        datos.forEach(element => {
            const { title, timeframes } = element;
            
            const actividades = {
                'Work': 'work',
                'Play': 'play',
                'Study': 'study',
                'Exercise': 'exercise',
                'Social': 'social',
                'Self Care': 'self_care'
            };

            if (actividades[title]) {
                construirCards(title, timeframes[periodo], actividades[title])
            }
            
        });
    });
}
function activarBtn(btn) {
    //Lista de botones del DOM
    const botones = {
        'Daily': btnDaily,
        'Weekly': btnWeekly,
        'Monthly': btnMonthly
    };
    //Limpiamos los botones si es que tienen la clase activada.
    Object.values(botones).forEach( boton => boton.classList.remove('btn_active'));
    //Verificamos si nuestro boton existe.
    if (botones[btn]) {
        //activamos el boton que se le dio click.
        botones[btn].classList.add('btn_active');
    }
}

btnDaily.classList.toggle('btn_active');
btnContructor('Daily');


const handleClick = (e) => {
    //Se mapea el id del boton con el valor a pasar para obtenes los datos
    const mapeoBotones = {
        'btn_daily': 'Daily',
        'btn_weekly': 'Weekly',
        'btn_monthly': 'Monthly'
    };

    //Obtengo el id del boton clikeado.
    const key = e.target.id;
    //Obtengo su valor para ejecutar la funcion con ese parametro
    const valor = mapeoBotones[key];

    if (mapeoBotones[key]) {
        //Activo el boton clickeado
        activarBtn(valor);
        // Obtengo los valores para agregarselos a mi Dom
        btnContructor(valor);
    }
}

btnDaily.addEventListener('click', handleClick);
btnWeekly.addEventListener('click', handleClick);
btnMonthly.addEventListener('click', handleClick);