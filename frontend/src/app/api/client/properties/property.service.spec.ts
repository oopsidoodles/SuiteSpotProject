import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { PropertyService } from './property.service';

describe('PropertyService', () => {

  let httpMock: HttpTestingController;
  let propertyService: PropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        PropertyService
      ]
    });

    propertyService = TestBed.get(PropertyService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PropertyService], (service: PropertyService) => {
    expect(service).toBeTruthy();
  }));

  it('should call http post with correct path when listing properties', (done) => {
    propertyService.queryProperties({}, { limit: 10, offset: 0 })
      .subscribe((resp) => {
        done();
      });

    const req = httpMock.expectOne((request) => {
      return request.method === 'POST' &&
        JSON.stringify(request.body) === '{}' &&
        request.url === 'http://localhost:3000/api/properties';
    });

    req.flush([]);

    httpMock.verify();
  });
});
