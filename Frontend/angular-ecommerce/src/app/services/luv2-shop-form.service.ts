import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = "http://localhost:8080/api/countries";
  private statesUrl = "http://localhost:8080/api/states";

  constructor(
    private httpClint: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {

    return this.httpClint.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );

  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClint.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );

  }

  getCreditCartMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    // Build an array for "Month" dropdown list
    // - start at currant month an loop until

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);

  }

  getCreditCartYear(): Observable<number[]> {

    let data: number[] = []

    // Build an array for "Year" drop-down list
    // start at current year and loop for next 10 year

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear)
    }

    return of(data);

  }

}


interface GetResponseCountries {
  _embedded: {
    countries: Country[]
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[]
  }
}
