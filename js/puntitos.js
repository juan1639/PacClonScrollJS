import { settings } from './main.js';

// ============================================================================
export class Puntitos {

    constructor(x, y) {
        
        this.x = x * settings.constante.bsx + parseInt(settings.constante.bsx / 2);
        this.y = y * settings.constante.bsy + parseInt(settings.constante.bsy / 2);

        this.radio = 4;
        this.ancho = this.radio * 2;
        this.alto = this.radio * 2;

        this.color = 'white';
        this.visible = true;
        this.sumaPtos = 10;

        this.dibuja();
    }

    dibuja() {
        settings.ctx.beginPath();
        settings.ctx.arc(this.x , this.y , this.radio, 0, Math.PI * 2);
        settings.ctx.fillStyle = this.color;
        settings.ctx.fill();
        settings.ctx.closePath();
    }
}

// ============================================================================
export class PtosGordos {   
    constructor(x, y) {
        this.x = x * settings.constante.bsx + parseInt(settings.constante.bsx / 2);
        this.y = y * settings.constante.bsy + parseInt(settings.constante.bsy / 2);

        this.radio = 4.0;
        this.ancho = this.radio * 2;
        this.alto = this.radio * 2;

        this.color = 'lightblue';
        this.visible = true;
        this.sumaPtos = 50;

        this.dibuja();
    }

    dibuja() {
        this.radio += 0.4;
        if (this.radio >= 15.0) this.radio = 4.0;

        settings.ctx.save();
        settings.ctx.beginPath();
        settings.ctx.shadowColor = this.color;
        settings.ctx.shadowBlur = 20;
        settings.ctx.arc(this.x , this.y , Math.floor(this.radio), 0, Math.PI * 2);
        settings.ctx.fillStyle = this.color;
        settings.ctx.fill();
        settings.ctx.closePath();
        settings.ctx.restore();
    }
}
