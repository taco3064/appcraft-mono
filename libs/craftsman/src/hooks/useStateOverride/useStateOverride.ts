import _get from 'lodash/get';
import type * as Types from './useStateOverride.types';

const getOverrideMixedType: Types.GetOverrideMixedType = ({
  typeFile,
  typeName,
  propPath,
}) => {
  if (
    typeFile.includes('/@appcraft/types/src/widgets/state') &&
    typeName === 'PropsState' &&
    /^defaultValue$/.test(propPath)
  ) {
    return 'DEFAULT_STATE_VALUE';
  }
};

const getOverrideNamingType: Types.GetOverrideNamingType = ({
  typeFile,
  typeName,
  propPath,
}) => {
  if (
    typeFile.includes('/@appcraft/types/src/widgets/state') &&
    typeName === 'NodeState' &&
    /^template\.todos$/.test(propPath)
  ) {
    return 'TODO_NAMING';
  }
};

const getOverrideRenderType: Types.GetOverrideRenderType = (
  kind,
  { propPath, typeName, typeFile }
) => {
  if (
    typeFile.includes('/@appcraft/types/src/widgets/state') &&
    typeName === 'NodeState' &&
    kind === 'display' &&
    /^template\.todos\..*$/.test(propPath)
  ) {
    return 'TODO_EDITOR';
  }
};

export const useStateOverride: Types.StateOverrideHook = (
  widget,
  editedState,
  { overrideMixedOptions, overrideNamingProps, renderOverrideItem },
  override
) => ({
  overrideMixedOptions(options) {
    const { category, path } = editedState || {};
    const $override = overrideMixedOptions?.(options);

    if ($override) {
      return $override;
    }

    return _get(override, getOverrideMixedType(options) as string)?.(
      options,
      _get(widget, ['state', category, path] as string[])
    );
  },
  overrideNamingProps(options) {
    const { category, path } = editedState || {};
    const $override = overrideNamingProps?.(options);

    if (!$override) {
      switch (getOverrideNamingType(options)) {
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
