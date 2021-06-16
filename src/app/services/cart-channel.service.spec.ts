import { TestBed } from '@angular/core/testing';

import { CartChannelService } from './cart-channel.service';

describe('CartChannelService', () => {
  let service: CartChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
