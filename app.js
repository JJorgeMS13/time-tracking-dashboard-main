const main = document.getElementById('main');
const btnDaily = document.getElementById('btn_daily');
const btnWeekly = document.getElementById('btn_weekly');
const btnMonthly = document.getElementById('btn_monthly');

async function getData() {
   return fetch('./data.json').then((request) => {
        if (!request.ok) {
            console.log('Fallo');
            throw new Error(`Error en la solicitud: ${request.status}`);
        }
        return request.json();
    }).catch((error) => {
        console.log(error);
        return null;
    });
}
function construirCards(plantilla, timeframes, clase) {
    
    const articulos = document.querySelectorAll('article');

    if (articulos.length < 7) {
        const elementArticle = document.createElement('article');
        const divInfo = document.createElement('div');
        const h3 = document.createElement('h3');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');

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
    if (btn === 'Daily') {
        getData().then((datos) => {        
            datos.forEach(element => {        
                if (element.title === 'Work') {
                    construirCards('Work', element.timeframes.daily, 'work');
                }
                if (element.title === 'Play') {
                    construirCards('Play', element.timeframes.daily, 'play');
                }
                if (element.title === 'Study') {
                    construirCards('Study', element.timeframes.daily, 'study');
                }
                if (element.title === 'Exercise') {
                    construirCards('Exercise', element.timeframes.daily, 'exercise');
                }
                if (element.title === 'Social') {
                    construirCards('Social', element.timeframes.daily, 'social');
                }
                if (element.title === 'Self Care') {
                    construirCards('Self Care', element.timeframes.daily, 'self_care');
                }
                
            });
        });
    }
    if (btn === 'Weekly') {        
        getData().then((datos) => {        
            datos.forEach(element => {        
                if (element.title === 'Work') {
                    construirCards('Work', element.timeframes.weekly, 'work');
                }
                if (element.title === 'Play') {
                    construirCards('Play', element.timeframes.weekly, 'play');
                }
                if (element.title === 'Study') {
                    construirCards('Study', element.timeframes.weekly, 'study');
                }
                if (element.title === 'Exercise') {
                    construirCards('Exercise', element.timeframes.weekly, 'exercise');
                }
                if (element.title === 'Social') {
                    construirCards('Social', element.timeframes.weekly, 'social');
                }
                if (element.title === 'Self Care') {
                    construirCards('Self Care', element.timeframes.weekly, 'self_care');
                }
                
            });
        });
    }
    if (btn === 'Monthly') {        
        getData().then((datos) => {        
            datos.forEach(element => {  
                if (element.title === 'Work') {
                    construirCards('Work', element.timeframes.monthly, 'work');
                }
                if (element.title === 'Play') {
                    construirCards('Play', element.timeframes.monthly, 'play');
                }
                if (element.title === 'Study') {
                    construirCards('Study', element.timeframes.monthly, 'study');
                }
                if (element.title === 'Exercise') {
                    construirCards('Exercise', element.timeframes.monthly, 'exercise');
                }
                if (element.title === 'Social') {
                    construirCards('Social', element.timeframes.monthly, 'social');
                }
                if (element.title === 'Self Care') {
                    construirCards('Self Care', element.timeframes.monthly, 'self_care');
                }
                
            });
        });
    }   
}
function activarBtn(btn) {
    switch (btn) {
        case 'Daily':
            btnDaily.classList.add('btn_active');
            btnWeekly.classList.remove('btn_active');
            btnMonthly.classList.remove('btn_active');
            break;
        case 'Weekly':
            btnWeekly.classList.add('btn_active');
            btnDaily.classList.remove('btn_active');
            btnMonthly.classList.remove('btn_active');
            break;          
        case 'Monthly':
            btnWeekly.classList.remove('btn_active');
            btnDaily.classList.remove('btn_active');
            btnMonthly.classList.add('btn_active');
            break;    
        default:
            btnDaily.classList.toggle('btn_active');
            break;
    }
}

btnDaily.classList.toggle('btn_active');
btnContructor('Daily');


const handleClick = (e) => {
    if (e.target.id === 'btn_daily') {
        activarBtn('Daily');
        btnContructor('Daily');
    } else if (e.target.id === 'btn_weekly') {
        activarBtn('Weekly');
        btnContructor('Weekly');
    } else if(e.target.id === 'btn_monthly') {
        activarBtn('Monthly');
        btnContructor('Monthly');
    }
}
btnDaily.addEventListener('click', handleClick);
btnWeekly.addEventListener('click', handleClick);
btnMonthly.addEventListener('click', handleClick);