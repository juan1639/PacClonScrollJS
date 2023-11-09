import {settings} from './main.js';

// ===================================================================================
export class Laberinto {

    constructor(array) {
        
        this.array = array;
        
        //DIMENSIONES MATRIZ
        this.altoM  = this.array.length;
        this.anchoM = this.array[0].length;
        
        //TAMAÑO DE LOS TILES
        this.anchoT = settings.constante.bsx;
        this.altoT = settings.constante.bsy;
    }
    
    colision(x, y) {
        if (this.array[y][x] == 9) {
            return true;
        } else {
            return false;
        }     
    }
    
    tile(x, y) {
        let casillaX = parseInt(x / this.anchoT);       
        let casillaY = parseInt(y / this.altoT);

        return(this.array[casillaY][casillaX]);
    }
    
    dibuja() {
        for (let y = 0; y < this.altoM; y ++){
            for (let x = 0; x < this.anchoM; x ++){
                
                if (this.array[y][x] == 9) {
                    let bx = x * this.anchoT + 0;
                    let by = y * this.altoT + 0;

                    settings.ctx.fillStyle = settings.colores.paredColor;
                    settings.ctx.fillRect(bx, by, this.anchoT - 2, this.altoT - 2);
                    settings.ctx.fillStyle = settings.colores.paredColorOscuro;
                    settings.ctx.fillRect(bx + 2, by + 2, this.anchoT - 3, this.altoT - 3);
                    // ctx.drawImage(this.img, 0, 0, this.img.width - 1, this.img.height - 1, 
                    //     x * this.anchoT, y * this.altoT, this.anchoT, this.altoT);
                }         
            }
        }
    }
}
