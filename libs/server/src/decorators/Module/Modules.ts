import { Express, IRouterMatcher } from 'express';
import * as Types from './Module.types';

export default function Module({ base: baseURL }: Types.DecoratorOptions) {
  return <T extends Types.DefaultImplement>(Implement: T) =>
    class Endpoint extends Implement {
      constructor(...args: any[]) {
        const app = args[0] as Express;

        super();

        Object.getOwnPropertyNames(Implement.prototype).forEach((method) => {
          if (method !== 'constructor') {
            const {
              url: endpointURL,
              method: requestMethod,
              params = [],
            } = this[method]?.endpoint;

            const router: IRouterMatcher<any> = app[requestMethod]?.bind(app);

            router(
              `/${baseURL}/${endpointURL}/${params.join('/')}`,
              async (req, res) => {
                try {
                  await this[method]?.(req, res);
                } catch (err) {
                  console.error(`${Implement.name} Exception:`, err);

                  res.status(400).json({
                    implement: Implement.name,
                    err: `${err.toString()}`,
                  });
                }
              }
            );
          }
        });
      }
    };
}
