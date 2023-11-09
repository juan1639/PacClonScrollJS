import { settings } from './main.js';

// ============================================================================
//  Funciones varias
// ----------------------------------------------------------------------------

// --------------------------------------------------------------------------
function dibujaTodosPuntitos() {

    for (let i = 0; i < settings.objeto.array_puntitos.length; i ++) {
        
        let corr = 0;

        if (settings.objeto.array_puntitos[i].visible && settings.estado.actual != 3) {
            /* if (checkColision(settings.objeto.array_puntitos[i], settings.objeto.pacman, corr)) {
                settings.objeto.array_puntitos[i].visible = false;
                settings.objeto.contPuntitosComidos ++;
                settings.marcadores.puntos += settings.objeto.array_puntitos[i].sumaPtos
                settings.marcadores.scorePtos.innerHTML = `Puntos: ${settings.marcadores.puntos}`;
                playSonidos(settings.sonidos.wakawaka);
            } */

            settings.objeto.array_puntitos[i].dibuja();
        }

        if (i < 4) {
            if (settings.objeto.array_ptosGordos[i].visible && settings.estado.actual != 3) {

                /* if (checkColision(settings.objeto.array_ptosGordos[i], settings.objeto.pacman, corr)) {
                    settings.objeto.ptoGordo[i].visible = false;
                    settings.objeto.contPuntitosComidos ++;
                    settings.marcadores.puntos += objeto.ptoGordo[i].sumaPtos
                    settings.estadoFantasmas.azules = true;
                    playSonidos(settings.sonidos.eating_ghost);
                    playSonidos(settings.sonidos.azules);
                    settings.sonidos.azules.loop = true;

                    setTimeout(() => {
                        settings.estadoFantasmas.azules = false;
                        settings.estadoFantasmas.intermitentes = false;
                        settings.estadoFantasmas.ptosComeFantasmas = 100;
                        settings.sonidos.azules.loop = false;

                        settings.objeto.fantasma.forEach(fant => {
                            fant.comido = false;
                        });

                    }, settings.estadoFantasmas.duracionAzules);

                    setTimeout(() => {
                        settings.estadoFantasmas.intermitentes = true;
                    }, Math.floor(settings.estadoFantasmas.duracionAzules / 1.6));
                } */

                settings.objeto.array_ptosGordos[i].dibuja();
            }
        }
    }
}

// --------------------------------------------------------------------------
function checkColision(obj1, obj2, corr) {
    return obj1.x + corr < obj2.x + obj2.ancho - corr && 
            obj1.x + obj1.ancho - corr > obj2.x + corr &&
            obj1.y + corr < obj2.y + obj2.alto - corr && 
            obj1.y + obj1.alto - corr > obj2.y + corr;
}

// --------------------------------------------------------------------------
function comprobarNivelSuperado() {
    let puntitosMasGordos = settings.objeto.array_puntitos.length + settings.objeto.array_ptosGordos.length;

    if (objeto.contPuntitosComidos >= puntitosMasGordos) {
        return true;
    } else {
        return false;
    }
}

// --------------------------------------------------------------------------
function elNivelSuperado() {
    if (!estado.nivel_superado) return;

    marcadores.nivel ++;
    marcadores.scoreNivel.innerHTML = `Nivel: ${marcadores.nivel}`;
    estadoFantasmas.ptosComeFruta *= 2;
    objeto.fruta.comido = false;
    estadoFantasmas.duracionAzules -= marcadores.nivel * 1000;
    estado.nivel_superado = false;
    objeto.contPuntitosComidos = 0;
    estado.actual = 3;
    sonidos.presentacion.play();

    if (estadoFantasmas.duracionAzules < 2000) estadoFantasmas.duracionAzules = 2000;

    objeto.puntito.forEach(punto => {
        punto.visible = true;
    });

    objeto.ptoGordo.forEach(gordo => {
        gordo.visible = true;
    });

    setTimeout(() => {
        estado.actual = 1;
        objeto.pacman.revivirPacMan();

        objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
        objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
        objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
        objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
    }, 5000);
}

// ------------------------------------------------------------------------
function mostrarMarcadores() {
    if (estado.actual == 0) {

        const gradi = ctx.createLinearGradient(parseInt(resolucion[0] / 5) + 5, 
            parseInt(resolucion[1] / 4), parseInt(resolucion[0] / 5) + 5, parseInt(resolucion[1] / 1.5));
        gradi.addColorStop(0, 'orangered');
        gradi.addColorStop(1, 'yellow');

        ctx.font = '100px seriff';
        ctx.fillStyle = gradi;
        ctx.fillText('Preparado!', parseInt(resolucion[0] / 5) + 5, 
            parseInt(resolucion[1] / 2));
    }

    if (estado.actual == 3) {
        ctx.font = '100px seriff';
        ctx.fillStyle = 'yellow';
        ctx.fillText('Nivel Superado!', parseInt(resolucion[0] / 9) + 5, 
            parseInt(resolucion[1] / 2));
    }

    objeto.fantasma.forEach(fant => {
        if (fant.showPtos) {
            ctx.save();
            ctx.shadowColor = 'orange';
            ctx.shadowBlur = 10;
            ctx.font = '30px seriff';
            ctx.fillStyle = 'orangered';
            ctx.fillText(fant.showx2, fant.showX, fant.showY);
            ctx.restore();
        }
    });

    if (objeto.fruta.showPtos) {
        ctx.save();
        ctx.shadowColor = 'orange';
        ctx.shadowBlur = 10;
        ctx.font = '32px seriff';
        ctx.fillStyle = 'orangered';
        ctx.fillText(estadoFantasmas.ptosComeFruta, objeto.fruta.showX, objeto.fruta.showY);
        ctx.restore();
    }
}

// ------------------------------------------------------------------------
//  Funciones de SONIDOS
// ------------------------------------------------------------------------
function playSonidos(sonido) {
    sonido.play();
}

function playSonidosLoop(sonido, loop, volumen) {
    sonido.play();
    sonido.loop = loop;
    sonido.volume = volumen;
}

// ------------------------------------------------------------------------
function reescalaCanvas() {
    return;
}

// ------------------------------------------------------------------------
function borraCanvas() {
    // canvas.width = canvas.width;
    // canvas.height = canvas.height;
    settings.ctx.fillStyle = settings.colores.sueloColor;
    settings.ctx.fillRect(0, 0, settings.canvas.width, settings.canvas.height);
}

export {
    dibujaTodosPuntitos,
    borraCanvas,
    playSonidos,
    playSonidosLoop
};
