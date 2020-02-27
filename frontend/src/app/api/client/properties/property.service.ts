import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIConfig } from '../api.config';

import {Property} from './property.model';

const PROPERTIES_PATH = `${APIConfig.BASE_API_PATH}/api/properties`;

@Injectable()
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  public queryProperties(
    query: any = {},
    params: { limit: number; offset: number } = { limit: 1000, offset: 0 } // gets everything
  ): Observable<Property[]> {
    return this.http.get<Property[]>(`${PROPERTIES_PATH}?limit=${params.limit}&offset=${params.offset}`);
  }
}
