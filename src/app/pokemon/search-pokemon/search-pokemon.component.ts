import { Component, OnInit } from '@angular/core';
import {Pokemon} from "../pokemon";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: [
  ]
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(
      private router: Router,
      private ps: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
        debounceTime(300), // durée entre chaque frappe de recherche
        distinctUntilChanged(), // élimine les meme recherches ("ab"..."ab"..)
        switchMap((term) => this.ps.searchPokemonList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
