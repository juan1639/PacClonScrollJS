import { settings } from './main.js';
import { playSonidos, playSonidosLoop } from './functions.js';

// ----------------------------------------------------------------------------
function reset_teclasCursor() {
    settings.controles.izquierda = false;
    settings.controles.derecha = false;
    settings.controles.arriba = false;
    settings.controles.abajo = false;
} 

// ============================================================================
//  Control mediante Teclado
// ----------------------------------------------------------------------------
let eventos_keydown = document.addEventListener('keydown', (ev) => {

    const tecla = ev.key;
    console.log("Tecla: ", tecla);
    const volumen_sirenaFondo = 0.1;

    if (tecla === 'ArrowUp') {
        reset_teclasCursor();
        settings.controles.arriba = true;

    } else if (tecla === 'ArrowDown') {
        reset_teclasCursor();
        settings.controles.abajo = true;

    } if (tecla === 'ArrowLeft') {
        reset_teclasCursor();
        settings.controles.izquierda = true;

    } if (tecla === 'ArrowRight') {
        reset_teclasCursor();
        settings.controles.derecha = true;
    }

    if (tecla === 'Enter') {

        if (settings.estado.actual == -1) {
            settings.estado.actual = 0;
            settings.marcadores.botonNewGame.style.display = 'none';
            playSonidos(settings.sonidos.preparado);
            settings.objeto.pacman.valoresIniciales();
    
            setTimeout(() => {
                if (settings.estado.actual == 0) settings.estado.actual = 1;
                playSonidosLoop(settings.sonidos.sirena_fondo, true, 0.1);
            }, settings.constante.pausa_preparado);
    
        } else if (settings.estado.gameover) {
            settings.marcadores.botonNewGame.style.display = 'none';
            playSonidos(settings.sonidos.preparado);
            nuevaPartida();
    
            setTimeout(() => {
                settings.estado.actual = 1;
                playSonidosLoop(settings.sonidos.sirena_fondo, true, 0.1);
            }, settings.constante.pausa_preparado);
        }
    }
});

// ----------------------------------------------------------------------------
//  Control mediante botones
// ----------------------------------------------------------------------------
let eventos_click = document.addEventListener('click', (event) => {
    const volumen_sirenaFondo = 0.1;

    if (event.target.id === 'boton__newGame') {

        if (settings.estado.actual === -1) {
            settings.estado.actual = 0;
            settings.marcadores.botonNewGame.style.display = 'none';
            playSonidos(settings.sonidos.preparado);
            settings.objeto.pacman.valoresIniciales();

            setTimeout(() => {
                if (settings.estado.actual == 0) settings.estado.actual = 1;
                playSonidosLoop(settings.sonidos.sirena_fondo, true, 0.1);
            }, settings.constante.pausa_preparado);

        } else if (settings.estado.gameover) {

            settings.marcadores.botonNewGame.style.display = 'none';
            playSonidos(settings.sonidos.preparado);
            nuevaPartida();

            setTimeout(() => {
                settings.estado.actual = 1;
                playSonidosLoop(settings.sonidos.sirena_fondo, true, 0.1);
            }, settings.constante.pausa_preparado);
        }
    }

    if (event.target.id === 'boton__le' || event.target.parentElement.id === 'boton__le') {
        reset_teclasCursor();
        settings.controles.izquierda = true;

    } else if (event.target.id === 'boton__ri' || event.target.parentElement.id === 'boton__ri') {
        reset_teclasCursor();
        settings.controles.derecha = true;

    } else if (event.target.id === 'boton__up' || event.target.parentElement.id === 'boton__up') {
        reset_teclasCursor();
        settings.controles.arriba = true;

    } else if (event.target.id === 'boton__do' || event.target.parentElement.id === 'boton__do') {
        reset_teclasCursor();
        settings.controles.abajo = true;
    } 
});

// ----------------------------------------------------------------------------
//  Evento Change (Selector Zoom)
// ----------------------------------------------------------------------------
let eventos_change = document.addEventListener('change', (event) => {

    console.log(event);
    const opcion_elegida = event.target.selectedIndex;

    if (event.target.id === 'selector__zoom') {

        if (opcion_elegida === 1) {
            settings.escala.x /= 2;
            settings.escala.y /= 2;
            settings.ctx.scale(settings.escala.x, settings.escala.y);
        }

        if (opcion_elegida === 2) {
            settings.escala.x /= 1;
            settings.escala.y /= 1;
            settings.ctx.scale(settings.escala.x, settings.escala.y);
            //settings.ctx.scale(2, 2);
        }

        if (opcion_elegida === 3) {
            settings.escala.x *= 2;
            settings.escala.y *= 2;
            settings.ctx.scale(settings.escala.x, settings.escala.y);
            //settings.ctx.scale(4, 4);
        }
    }
});

export {
    eventos_click,
    eventos_keydown,
    eventos_change
};

