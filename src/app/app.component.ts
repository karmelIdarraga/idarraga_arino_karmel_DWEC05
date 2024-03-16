import { Component } from '@angular/core';
import { Configuracion } from './modelos/Configuracion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public nombre:string="";
  public apellido:string="";
  public rango:number=0;
  public intentos:number=0;
  public random: number=0;
  public intentosRestantes:number=0;
  public apuesta:number=-1;
  public juegoListo:boolean=false;

  public apuestas: Array<number>=[];
  public acierto:boolean = false;

  constructor(){
    this.nombre = Configuracion.nombre;
    this.apellido = Configuracion.apellido;
    this.rango = Configuracion.rango;
    this.intentos = Configuracion.intentos;
  }

  recogerDatos(): void {
    if (this.nombre != ''){
      Configuracion.nombre = this.nombre;
    }else{
      alert('El nombre no puede estar vacio.');
      return;
    }
    if (this.apellido !=''){
      Configuracion.apellido = this.apellido;
    }else{
      alert('El apellido no puede estar vacio.');
      return;
    }
    if (this.rango > 0 && Number.isInteger(this.rango)){
      Configuracion.rango = this.rango;
    }else{
      alert('El rango debe ser un número entero superior a 0.');
      return;
    }
    if (this.intentos > 0 && Number.isInteger(this.intentos)){
      Configuracion.intentos = this.intentos;
    }else{
      alert('El número de intentos debe ser un número entero superior a 0.');
      return;
    }
    this.comenzarjuego();
    console.log(Configuracion);
  }

  comenzarjuego():void{
    this.juegoListo = true;
    this.intentosRestantes = this.intentos;
    this.apuestas = [];
    this.generarNumero();
  }

  reiniciarJuego():void{
    this.juegoListo = false;
    this.acierto = false;
    this.intentosRestantes = this.intentos;
  }

  generarNumero(): void{
    this.random = Math.floor(Math.random()*(this.rango-1));
    console.log ('Numero generado: ' + this.random);
  }

  jugar():void{
    if (this.intentosRestantes>0 && !this.acierto){
      if (this.apuesta >= 0 && this.apuesta<= this.rango && Number.isInteger(this.apuesta)){
        this.apuestas.push(this.apuesta);
        if (this.apuesta == this.random){
          this.acierto = true;
        }else{
          this.intentosRestantes --;
        }
      } else{
        alert ('El número a adiviar tiene que ser un número entero entre 0 y ' + this.rango);
      }
    }else{
      
      if (confirm('El juego ha terminado. ¿Quiere jugar otra partida?')){
        this.reiniciarJuego();
      }
      
    }
    
  }

}
