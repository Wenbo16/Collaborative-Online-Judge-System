import { TestBed, inject } from '@angular/core/testing';

import { PostListService } from './post-list.service';

describe('PostListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostListService]
    });
  });

  it('should ...', inject([PostListService], (service: PostListService) => {
    expect(service).toBeTruthy();
  }));
});
