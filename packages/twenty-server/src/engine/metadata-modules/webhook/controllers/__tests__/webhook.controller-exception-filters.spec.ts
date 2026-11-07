import { EXCEPTION_FILTERS_METADATA } from '@nestjs/common/constants';

import { RestApiExceptionFilter } from 'src/engine/api/rest/rest-api-exception.filter';
import { AuthRestApiExceptionFilter } from 'src/engine/core-modules/auth/filters/auth-rest-api-exception.filter';
import { FlatEntityMapsRestApiExceptionFilter } from 'src/engine/metadata-modules/flat-entity/filters/flat-entity-maps-rest-api-exception.filter';
import { WebhookController } from 'src/engine/metadata-modules/webhook/controllers/webhook.controller';
import { PermissionsRestApiExceptionFilter } from 'src/engine/permissions/utils/permissions-rest-api-exception.filter';
import { WorkspaceMigrationRunnerRestApiExceptionFilter } from 'src/engine/workspace-manager/workspace-migration/filters/workspace-migration-runner-rest-api-exception.filter';

describe('WebhookController exception filters', () => {
  it('registers PermissionsRestApiExceptionFilter last so Nest tries it first', () => {
    const filters = Reflect.getMetadata(
      EXCEPTION_FILTERS_METADATA,
      WebhookController,
    ) as unknown[];

    expect(filters.at(-1)).toBe(PermissionsRestApiExceptionFilter);
    expect(filters).toEqual([
      RestApiExceptionFilter,
      FlatEntityMapsRestApiExceptionFilter,
      WorkspaceMigrationRunnerRestApiExceptionFilter,
      AuthRestApiExceptionFilter,
      PermissionsRestApiExceptionFilter,
    ]);
  });
});
