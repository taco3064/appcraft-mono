import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export default function getSecretEnvironments(...names: readonly string[]) {
  const client = new SecretManagerServiceClient();

  return Promise.all(
    names.map(async (name) => {
      const [{ payload }] = await client.accessSecretVersion({
        name: `projects/461485822488/secrets/${name}/versions/latest`,
      });

      return [name, payload.data.toString()];
    })
  ).then<Record<(typeof names)[number], string>>((envs) =>
    Object.fromEntries(envs)
  );
}
