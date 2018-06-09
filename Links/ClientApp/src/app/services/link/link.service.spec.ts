import { TestBed, inject } from '@angular/core/testing';

import { LinkServiceService } from './link-service.service';

describe('LinkServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkServiceService]
    });
  });

  it('should be created', inject([LinkServiceService], (service: LinkServiceService) => {
    expect(service).toBeTruthy();
  }));
});
