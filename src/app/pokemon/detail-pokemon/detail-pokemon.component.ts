import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pokemon} from "../pokemon";
import {POKEMONS} from "../mock-pokemon-list";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ps: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if(pokemonId){
      this.ps.getPokemonById(+pokemonId)
          .subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.ps.deletePokemonById(pokemon.id)
        .subscribe(()=> this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigate(['/'])
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
