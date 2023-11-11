import { settings } from './main.js';

// ============================================================================
//  Funciones varias
// ----------------------------------------------------------------------------
function dibujarFantasmas() {

    for (let i = 0; i < settings.constante.nro_fantasmas; i ++) {
        let corr = 9;

        if (checkColision(settings.objeto.fantasma[i], settings.objeto.pacman, corr) && settings.estado.actual == 1) {

            if (!settings.estadoFantasmas.azules) {

                settings.estado.actual = 2;  // Secuencia PacMan Dies...
                settings.estadoFantasmas.azules = false;
                settings.estadoFantasmas.ptosComeFantasmas = 100;
                playSonidos(settings.sonidos.pacman_dies);
                settings.sonidos.pacman_dies.volume = 0.6;
                settings.marcadores.vidas --;
                settings.marcadores.scoreVidas.innerHTML = `Vidas: ${settings.marcadores.vidas}`;

                if (settings.marcadores.vidas >= 0) {

                    setTimeout(() => {
                        settings.estado.actual = 1;
                        settings.objeto.pacman.revivirPacMan();

                        settings.objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
                        settings.objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
                        settings.objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
                        settings.objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
                    }, 3000);

                } else {

                    settings.estado.actual = 4;  // Game Over
                    settings.estado.gameover = true;
                    settings.marcadores.vidas = 0;
                    settings.marcadores.scoreVidas.innerHTML = `Vidas: ${settings.marcadores.vidas}`;
                    settings.marcadores.botonNewGame.style.display = 'flex';
                    settings.sonidos.sirena_fondo.loop = false;
                    playSonidos(settings.sonidos.game_over);
                }

            } else {

                //console.log('azules');
                if (!settings.objeto.fantasma[i].comido) {

                    playSonidos(settings.sonidos.eating_ghost);
                    settings.objeto.fantasma[i].comido = true;
                    settings.objeto.fantasma[i].showPtos = true;
                    settings.objeto.fantasma[i].showX = settings.objeto.fantasma[i].x 
                    settings.objeto.fantasma[i].showY = settings.objeto.fantasma[i].y

                    settings.estadoFantasmas.ptosComeFantasmas *= 2;
                    settings.marcadores.puntos += estadoFantasmas.ptosComeFantasmas;
                    settings.objeto.fantasma[i].showx2 = estadoFantasmas.ptosComeFantasmas;

                    setTimeout(() => {
                        settings.objeto.fantasma[i].showPtos = false;
                    }, 2000);

                }
            }
        }

        settings.objeto.fantasma[i].dibuja();
    }
}

// --------------------------------------------------------------------------
function dibujaTodosPuntitos() {

    for (let i = 0; i < settings.objeto.array_puntitos.length; i ++) {
        
        let corr = 0;

        if (settings.objeto.array_puntitos[i].visible && settings.estado.actual != 3) {

            if (checkColision(settings.objeto.array_puntitos[i], settings.objeto.pacman, corr)) {
                settings.objeto.array_puntitos[i].visible = false;
                settings.objeto.contPuntitosComidos ++;
                settings.marcadores.puntos += settings.objeto.array_puntitos[i].sumaPtos
                settings.marcadores.scorePtos.innerHTML = `Puntos: ${settings.marcadores.puntos}`;
                playSonidos(settings.sonidos.wakawaka);
            }

            settings.objeto.array_puntitos[i].dibuja();
        }

        if (i < 4) {
            if (settings.objeto.array_ptosGordos[i].visible && settings.estado.actual != 3) {

                if (checkColision(settings.objeto.array_ptosGordos[i], settings.objeto.pacman, corr)) {
                    settings.array_ptosGordos[i].visible = false;
                    settings.objeto.contPuntitosComidos ++;
                    settings.marcadores.puntos += objeto.array_ptosGordos[i].sumaPtos
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
                }

                settings.objeto.array_ptosGordos[i].dibuja();
            }
        }
    }
}

// --------------------------------------------------------------------------
function checkComerFruta() {
    let corr = 5;

    if (checkColision(settings.objeto.fruta, settings.objeto.pacman, corr) && settings.estado.actual == 1 && !settings.objeto.fruta.comido) {
        settings.objeto.fruta.comido = true;
        settings.objeto.fruta.showPtos = true;
        settings.objeto.fruta.showX = settings.objeto.fruta.x 
        settings.objeto.fruta.showY = settings.objeto.fruta.y
        playSonidos(settings.sonidos.eating_cherry);

        settings.marcadores.puntos += settings.estadoFantasmas.ptosComeFruta;

        setTimeout(() => {
            settings.objeto.fruta.showPtos = false;

            setTimeout(() => {
                settings.objeto.fruta.comido = false
                settings.objeto.fruta.x = 9 * settings.constante.bsx;
                settings.objeto.fruta.y = 11 * settings.constante.bsy;
            }, 9000);

        }, 3000);
    }
}

// --------------------------------------------------------------------------
function escalar_objetos(x, y) {

    let ofx;
    let ofy;

    if (settings.objeto.pacman) {
        ofx = x - settings.objeto.pacman.x;
        ofy = y - settings.objeto.pacman.y;

        return [settings.objeto.pacman.escalaXY[0] + ofx, settings.objeto.pacman.escalaXY[1] + ofy];

    }

    return [0, 0];
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

    if (settings.objeto.contPuntitosComidos >= puntitosMasGordos) {
        return true;
    } else {
        return false;
    }
}

// --------------------------------------------------------------------------
function elNivelSuperado() {
    if (!settings.estado.nivel_superado) return;

    settings.marcadores.nivel ++;
    settings.marcadores.scoreNivel.innerHTML = `Nivel: ${settings.marcadores.nivel}`;
    settings.estadoFantasmas.ptosComeFruta *= 2;
    settings.objeto.fruta.comido = false;
    settings.estadoFantasmas.duracionAzules -= settings.marcadores.nivel * 1000;
    settings.estado.nivel_superado = false;
    settings.objeto.contPuntitosComidos = 0;
    settings.estado.actual = 3;
    settings.sonidos.presentacion.play();

    if (settings.estadoFantasmas.duracionAzules < 2000) settings.estadoFantasmas.duracionAzules = 2000;

    settings.objeto.puntito.forEach(punto => {
        punto.visible = true;
    });

    settings.objeto.ptoGordo.forEach(gordo => {
        gordo.visible = true;
    });

    setTimeout(() => {
        settings.estado.actual = 1;
        settings.objeto.pacman.revivirPacMan();

        settings.objeto.fantasma[0].revivirFantasmas(3, 8, 0, 0);
        settings.objeto.fantasma[1].revivirFantasmas(5, 8, 1, 0);
        settings.objeto.fantasma[2].revivirFantasmas(9, 8, 2, 1);
        settings.objeto.fantasma[3].revivirFantasmas(11, 8, 3, 1);
    }, 5000);
}

// ------------------------------------------------------------------------
function mostrarMarcadores() {
    if (estado.actual == 0) {

        const gradi = ctx.createLinearGradient(Math.floor(resolucion[0] / 5) + Math.floor(resolucion[1] / 4), parseInt(resolucion[0] / 5) + 5, Math.floor(resolucion[1] / 1.5));
        gradi.addColorStop(0, 'orangered');
        gradi.addColorStop(1, 'yellow');

        ctx.font = '100px seriff';
        ctx.fillStyle = gradi;
        ctx.fillText('Preparado!', Math.floor(resolucion[0] / 5) + 5, 
            Math.floor(resolucion[1] / 2));
    }

    if (estado.actual == 3) {
        ctx.font = '100px seriff';
        ctx.fillStyle = 'yellow';
        ctx.fillText('Nivel Superado!', Math.floor(resolucion[0] / 9) + 5, 
            Math.floor(resolucion[1] / 2));
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
    dibujarFantasmas,
    dibujaTodosPuntitos,
    checkComerFruta,
    escalar_objetos,
    comprobarNivelSuperado,
    elNivelSuperado,
    mostrarMarcadores,
    borraCanvas,
    playSonidos,
    playSonidosLoop
};
