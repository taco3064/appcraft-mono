import _get from 'lodash/get';
import type * as Types from './useStateOverride.types';

const getOverridePropsType: Types.GetOverridePropsType = ({
  typeFile,
  typeName,
  propPath,
}) => {
  if (
    /^template\.todos$/.test(propPath) &&
    typeName === 'NodeState' &&
    typeFile.includes('/@appcraft/types/src/widgets/state')
  ) {
    return 'TODO_NAMING';
  }
};

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { propPath, typeName, typeFile }
) => {
  if (
    kind === 'display' &&
    /^template\.todos\..*$/.test(propPath) &&
    typeName === 'NodeState' &&
    typeFile.includes('/@appcraft/types/src/widgets/state')
  ) {
    return 'TODO_EDITOR';
  }
};

const useStateOverride: Types.StateOverrideHook = (
  widget,
  editedState,
  { overrideNamingProps, renderOverrideItem },
  override
) => ({
  overrideNamingProps(options) {
    const { category, path } = editedState || {};
    const $override = overrideNamingProps?.(options);

    if (!$override) {
      switch (getOverridePropsType(options)) {
        case 'TODO_NAMING': {
          const { TODO_NAMING: renderer } = override;

          const children = renderer(
            _get(widget, ['state', category, path] as string[])
          );

          return {
            select: true,
            children,
            disabled: Boolean(!Array.isArray(children) || !children.length),
          };
        }
        default:
      }
    }

    return $override;
  },
  renderOverrideItem(...args) {
    const [, options] = args;
    const { category, path } = editedState || {};
    const $override = renderOverrideItem?.(...args);

    if ($override || $override === false) {
      return $override;
    }

    return _get(override, getOverrideRenderType(...args) as string)?.(
      options,
      _get(widget, ['state', category, path] as string[])
    );
  },
});

export default useStateOverride;
