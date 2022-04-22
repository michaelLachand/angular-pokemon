import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../pokemon";
import {POKEMONS} from "../mock-pokemon-list";
import {Router} from "@angular/router";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})
export class ListPokemonComponent implements OnInit{

  pokemonList: Pokemon[];

  constructor(private router: Router,
              private ps: PokemonService) {
  }

  ngOnInit(){
    this.pokemonList = this.ps.getPokemonList();
  }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id]);
  }


}
