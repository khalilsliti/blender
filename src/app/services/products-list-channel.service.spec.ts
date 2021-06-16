import { TestBed } from '@angular/core/testing';

import { ProductsListChannelService } from './products-list-channel.service';

describe('ProductsListChannelService', () => {
  let service: ProductsListChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsListChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
