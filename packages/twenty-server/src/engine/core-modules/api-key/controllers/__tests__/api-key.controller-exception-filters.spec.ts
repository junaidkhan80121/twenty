import { EXCEPTION_FILTERS_METADATA } from '@nestjs/common/constants';

import { RestApiExceptionFilter } from 'src/engine/api/rest/rest-api-exception.filter';
import { AuthRestApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-rest-api-exception.filter';
import { ApiKeyController } from 'src/engine/core-modules/api-key/controllers/api-key.controller';
import { PermissionsRestApiExceptionFilter } from 'src/engine/permissions/utils/permissions-rest-api-exception.filter';

describe('ApiKeyController exception filters', () => {
  it('registers PermissionsRestApiExceptionFilter last so Nest tries it first', () => {
    const filters = Reflect.getMetadata(
      EXCEPTION_FILTERS_METADATA,
      ApiKeyController,
    ) as unknown[];

    expect(filters.at(-1)).toBe(PermissionsRestApiExceptionFilter);
    expect(filters).toEqual([
      RestApiExceptionFilter,
      AuthRestApiExceptionFilter,
      PermissionsRestApiExceptionFilter,
    ]);
  });
});
