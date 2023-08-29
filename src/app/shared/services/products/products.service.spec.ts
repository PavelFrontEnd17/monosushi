import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Storage} from "@angular/fire/storage";

describe('ProductsService', () => {
  let service: ProductsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be getted', () => {
    spyOn(service, 'get').and.callThrough()

  });
});
