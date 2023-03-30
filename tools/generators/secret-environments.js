const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

module.exports = (...names) => {
  const client = new SecretManagerServiceClient();

  return Promise.all(
    names.map(async (name) => {
      const [{ payload }] = await client.accessSecretVersion({
        name: `projects/461485822488/secrets/${name}/versions/latest`,
      });

      return [name, payload.data.toString()];
    })
  ).then((envs) => Object.fromEntries(envs));
};
