import { TestBed } from '@angular/core/testing';

import { StoresListChannelService } from './stores-list-channel.service';

describe('StoresListChannelService', () => {
  let service: StoresListChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresListChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
