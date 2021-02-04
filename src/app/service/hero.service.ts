import { Injectable } from '@angular/core';
import { Hero } from '../model/hero';
import { Init } from './hero-init';

@Injectable({
  providedIn: 'root',
})
export class HeroService extends Init {
  constructor() {
    super();
    this.load();
  }

  getHeros() {
    let heroes = JSON.parse(localStorage.getItem('heroes') || '[]');
    return heroes;
  }

  addHero(newHero: Hero) {
    let heroes = JSON.parse(localStorage.getItem('heroes') || '[]');
    if (newHero.id === null) newHero.id = heroes.length + 1;
    heroes.push(newHero);
    localStorage.setItem('heroes', JSON.stringify(heroes));
  }

  deleteHero(id: number) {
    let heroes = JSON.parse(localStorage.getItem('heroes') || '[]');
    for (let i = 0; i < heroes.length; i++) {
      if (heroes[i].id == id) {
        heroes.splice(i, 1);
        console.log(heroes);
      }
    }
    localStorage.setItem('heroes', JSON.stringify(heroes));
  }

  updateHero(newHero: Hero) {
    let heroes = JSON.parse(localStorage.getItem('heroes') || '[]');
    let objIndex = heroes.findIndex((obj: Hero) => obj.id == newHero.id);
    heroes[objIndex] = newHero;
    localStorage.setItem('heroes', JSON.stringify(heroes));
  }
}
