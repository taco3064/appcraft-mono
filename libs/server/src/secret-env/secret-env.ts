import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import type * as Types from './secret-env.types';

const client = new SecretManagerServiceClient();
const envs = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'MONGODB_CONNECTION'];

export default Promise.all(
  envs.map(async (name) => {
    const [version] = await client.accessSecretVersion({
      name: `projects/461485822488/secrets/${name}/versions/latest`,
    });

    return [name, version.payload.data.toString()];
  })
).then((configs) => Object.fromEntries(configs) as Types.SecretEnvironment);
