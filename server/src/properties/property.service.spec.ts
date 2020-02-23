import 'jasmine';

import { PropertyService } from './property.service';

describe('PropertyService', () => {

  let mockDao: any;

  beforeEach(() => {
    mockDao = {
      query: jasmine.createSpy('query')
    }
  });

  it('should call query on DAO when listProperties from service is called', async () => {
    const service = new PropertyService(mockDao);

    const query = { name: 'test property' };

    service.listProperties(query, 0, 15);

    expect(mockDao.query).toHaveBeenCalledWith(query, 0, 15);
  });

});
