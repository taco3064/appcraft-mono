import * as Types from './Endpoint.types';

export default function Endpoint({
  url,
  method = 'get',
  params,
}: Types.DecoratorOptions) {
  return (
    _target: unknown,
    propertyKey: string,
    descriptor: Types.Descriptor
  ) => {
    Object.defineProperty(descriptor.value, 'endpoint', {
      get: () => ({
        url: url || propertyKey || '',
        method,
        params,
      }),
    });
  };
}
