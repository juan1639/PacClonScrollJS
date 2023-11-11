import { settings } from './main.js';

import {
    canvasPacMan, 
    canvasPacManDo, 
    canvasPacManUp,
    canvasPacManLe, 
    canvasPacManRi
} from './dibujaCanvas.js';

// ============================================================================
export class PacMan {

    constructor() {

        this.x = 9 * settings.constante.bsx;
        this.y = 4 * settings.constante.bsy;

        this.ancho = settings.constante.bsx;
        this.alto = settings.constante.bsy;
        //this.radio = Math.floor(settings.constante.bsy / 2.2);
        this.radio = Math.floor(settings.constante.bsy / 2);

        this.escalaXY = [];

        this.color = 'yellow';

        this.direccion = {
            ri : [1, 0, 1, 0, 1, 6],
            le : [-1, 0, 0, 0, 7, 12],
            up : [0, -1, 0, 0, 13, 18],
            do : [0, 1, 0, 1, 19, 24]
        }

        this.pulsada = 'ri';
        this.orientacion = this.pulsada;
        this.diesAnima = 0;

        this.velX = 1;
        this.velY = 0;
        this.sumarAncho = 1;
        this.sumarAlto = 0;
    }

    dibuja() {

        let x = this.x;
        let y = this.y;

        /* if (settings.estado.actual == 2) {
            this.pacManDies(animaPacMan);
            return;
        } */

        if (settings.estado.actual === 1) this.actualiza();

        // ----------------------------------------------------------
        if (settings.escala.x === 1 && settings.escala.y === 1) {

            // Dibuja normal ...

        } else {

            this.escalaXY = this.dibuja_escala();
            x = this.escalaXY[0];
            y = this.escalaXY[1];
        }

        canvasPacMan(x, y, this.radio, this.color);

        if (this.velX == 1) {
            canvasPacManRi(x, y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velX == -1) {
            canvasPacManLe(x, y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velY == 1) {
            canvasPacManDo(x, y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velY == -1) {
            canvasPacManUp(x, y, this.radio, this.color, settings.objeto.animaPacMan);
        }

        // ctx.drawImage(pacmanImg, 0, 0, pacmanImg.width - 1, pacmanImg.height - 1, 
        //     this.x, this.y, this.ancho, this.alto);
    }

    dibuja_escala() {

        let x = Math.floor(settings.resolucion[0] / 2);
        let y = Math.floor(settings.resolucion[1] / 2);

        x /= settings.escala.x;
        y /= settings.escala.y;

        return [x - this.radio, y - this.radio];
    }

    actualiza() {

        if (settings.controles.izquierda) {
            this.pulsada = 'le';
        } else if (settings.controles.derecha) {
            this.pulsada = 'ri';
        } else if (settings.controles.arriba) {
            this.pulsada = 'up';
        } else if (settings.controles.abajo) {
            this.pulsada = 'do';
        }

        let x = 0;
        let y = 0;

        if (this.x % settings.constante.bsx == 0 && this.y % settings.constante.bsy == 0) {

            x = Math.floor(this.x / settings.constante.bsx) + this.direccion[this.pulsada][0];
            y = Math.floor(this.y / settings.constante.bsy) + this.direccion[this.pulsada][1];

            if (!(settings.objeto.laberinto.colision(x, y))) {
                this.velX = this.direccion[this.pulsada][0];
                this.velY = this.direccion[this.pulsada][1];
                this.sumarAncho = this.direccion[this.pulsada][2];
                this.sumarAlto = this.direccion[this.pulsada][3];
                this.orientacion = this.pulsada;
            }
        }

        x = Math.floor((this.x + this.velX + this.ancho * this.sumarAncho) / settings.constante.bsx);
        y = Math.floor((this.y + this.velY + this.alto * this.sumarAlto) / settings.constante.bsy);

        if (!(settings.objeto.laberinto.colision(x, y))) {
            this.x += this.velX * 2;
            this.y += this.velY * 2;

            if (this.x > settings.constante.nro_columnas * settings.constante.bsx && this.velX > 0) {
                this.x = -settings.constante.bsx;
            }

            if (this.x < -settings.constante.bsx && this.velX < 0) {
                this.x = settings.constante.nro_columnas * settings.constante.bsx;
            }
        }
    }

    pacManDies(animaPacMan) {
        /* canvasPacMan(this.x, this.y, this.radio, this.color);

        if (this.diesAnima == 0) {
            canvasPacManRi(this.x, this.y, this.radio, this.color, animaPacMan);
        } else if (this.diesAnima == 2) {
            canvasPacManLe(this.x, this.y, this.radio, this.color, animaPacMan);
        } else if (this.diesAnima == 1) {
            canvasPacManDo(this.x, this.y, this.radio, this.color, animaPacMan);
        } else if (this.diesAnima == 3) {
            canvasPacManUp(this.x, this.y, this.radio, this.color, animaPacMan);
        } */
    }

    revivirPacMan() {
        this.x = 9 * settings.constante.bsx;
        this.y = 4 * settings.constante.bsy;
        this.pulsada = 'ri';
        this.velX = 1;
        this.velY = 0;
        this.sumarAncho = 1;
        this.sumarAlto = 0;
    }

    secuenciaPresentacion() {

        this.x = this.x + this.velX;

        if ((this.x > settings.resolucion[0] && this.velX > 0) || (this.x < -99 && this.velX < 0)) 
            this.velX = -this.velX;

        canvasPacMan(this.x, this.y, this.radio, this.color);

        if (this.velX == 1) {
            canvasPacManRi(this.x, this.y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velX == -1) {
            canvasPacManLe(this.x, this.y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velY == 1) {
            canvasPacManDo(this.x, this.y, this.radio, this.color, settings.objeto.animaPacMan);
        } else if (this.velY == -1) {
            canvasPacManUp(this.x, this.y, this.radio, this.color, settings.objeto.animaPacMan);
        }

    }

    valoresIniciales() {
        this.x = 9 * settings.constante.bsx;
        this.velX = 1;
    }
}

