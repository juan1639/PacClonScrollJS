// ============================================================================
//  PacClon (responsive) | main.js ... By Juan Eguia
// 
// ----------------------------------------------------------------------------
//  import --> clases
// ----------------------------------------------------------------------------
import {Settings} from './settings.js';
import {Laberinto} from './laberinto.js';
import {Puntitos, PtosGordos} from './puntitos.js';
//import {Fruta} from './fruta.js';
import {PacMan} from './pacman.js';
import {Fantasma} from './fantasma.js';

// ----------------------------------------------------------------------------
//  import --> funciones varias
// ----------------------------------------------------------------------------
import {
    eventos_keydown,
    eventos_click
} from './controles.js';

// ----------------------------------------------------------------------------
//  import --> funciones varias
// ----------------------------------------------------------------------------
import {
    borraCanvas,
    dibujaTodosPuntitos,
    dibujarFantasmas
} from './functions.js';

// ----------------------------------------------------------------------------
//  import --> funciones dibujado en Canvas
// ----------------------------------------------------------------------------
/* import {
    
} from './dibujaCanvas.js'; */

// ----------------------------------------------------------------------------
let settings;

// ================================================================================
// Funcion Inicialiadora
// --------------------------------------------------------------------------------
window.onload = () => {

    // INSTANCIAR Settings -------------------------------------------
    settings = new Settings();

    settings.canvas.width = settings.resolucion[0];
    settings.canvas.height = settings.resolucion[1] - settings.constante.bsy;
    settings.ctx.scale(settings.escala.x, settings.escala.y);

    // sonidos.presentacion.play();
    // sonidos.presentacion.volume = 0.6;

    // INSTANCIAR (Laberinto) ----------------------------------------
    settings.objeto.laberinto = new Laberinto(settings.array_laberinto);

    // INSTANCIAR TODOS los Puntitos ---------------------------------
    let contador = 0;
    let contador_gordos = 0;
    let instanciar;

    for (let y = 0; y < settings.array_laberinto.length; y ++) {
        for (let x = 0; x < settings.array_laberinto[0].length; x ++) {
            
            if (settings.array_laberinto[y][x] == 1) {
                //settings.objeto.puntito[contador] = new Puntitos(x, y);
                instanciar = new Puntitos(x, y);
                settings.objeto.array_puntitos.push(instanciar);
                contador ++;
                //console.log(array_puntitos.length);
            }

            if (settings.array_laberinto[y][x] == 5) {
                //settings.objeto.ptoGordo[contador_gordos] = new PtosGordos(x, y);
                instanciar = new PtosGordos(x, y);
                settings.objeto.array_ptosGordos.push(instanciar);
                contador_gordos ++;
            }        
        }
    }

    // INSTANCIAR FRUTA ----------------------------------------------
    //objeto.fruta = new Fruta();

    // INSTANCIAR PAC-MAN --------------------------------------------
    settings.objeto.pacman = new PacMan();

    // INSTANCIAR (FANTASMAS) ----------------------------------------
    settings.objeto.fantasma[0] = new Fantasma(3 * settings.constante.bsx, 8 * settings.constante.bsy, 0, 0);
    settings.objeto.fantasma[1] = new Fantasma(5 * settings.constante.bsx, 8 * settings.constante.bsy, 1, 0);
    settings.objeto.fantasma[2] = new Fantasma(9 * settings.constante.bsx, 8 * settings.constante.bsy, 2, 1);
    settings.objeto.fantasma[3] = new Fantasma(11 * settings.constante.bsx, 8 * settings.constante.bsy, 3, 1);

    // --- Ejecutamos BUCLE PRINCIPAL (Intervalo cada 1000/FPS) ------
    setInterval(function() {
        bucle_principal();
    }, 1000 / settings.constante.fps);

    /* setInterval(function() {
        if (objeto.animaPacMan) {
            objeto.animaPacMan = false;
        } else {
            objeto.animaPacMan = true;
        }

        objeto.pacman.diesAnima ++;
        if (objeto.pacman.diesAnima > 3) objeto.pacman.diesAnima = 0;
        
    }, 150); */

    /* setInterval(function () {
        if (estado.actual != 0) {
            estado.nivel_superado = comprobarNivelSuperado();
            // console.log(estado.nivel_superado, estadoFantasmas.duracionAzules);
        }
    }, 200); */
}

// ========================================================================
function bucle_principal() {
    borraCanvas();

    if (settings.estado.actual == -1) {
        laPresentacion(settings.objeto.animaPacMan);
    }

    if (settings.estado.actual != -1) {
        settings.objeto.laberinto.dibuja();
        dibujaTodosPuntitos();
        //objeto.fruta.dibuja();
        settings.objeto.pacman.dibuja();
        dibujarFantasmas();

        //checkComerFruta();
        //elNivelSuperado();
        //elGameOver();
        //mostrarMarcadores();
    }
}

export { settings };
