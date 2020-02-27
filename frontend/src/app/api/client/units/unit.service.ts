import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIConfig } from '../api.config';

import {Unit} from './unit.model';
import {Property} from '../properties/property.model';

const PROPERTIES_PATH = `${APIConfig.BASE_API_PATH}/api/properties`;

@Injectable()
export class UnitService {

  constructor(
    private http: HttpClient
  ) { }

  public queryUnits(
    property: Property,
    query: any = {},
    params: { limit: number; offset: number } = { limit: 1000, offset: 0 } // gets everything
  ): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${PROPERTIES_PATH}/${property._id}/units?limit=${params.limit}&offset=${params.offset}`);
  }

  public postForm(unit: Unit, form: string): Observable<object> {
    return this.http.post<object>(`${PROPERTIES_PATH}/${unit.propertyId}/units/${unit._id}/form`, {content: form});
  }
}
