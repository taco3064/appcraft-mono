import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import LabelIcon from '@mui/icons-material/Label';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Typography from '@mui/material/Typography';
import { ExhibitorUtil } from '@appcraft/exhibitor';
import { useState } from 'react';

import * as Ctx from '../../../contexts';
import * as Hook from '../../../hooks';
import TypeItemDisplay, { TypeItemDisplayProps } from '../TypeItemDisplay';
import TypeItemMixed, { TypeItemMixedProps } from '../TypeItemMixed';
import TypeItemNaming from '../TypeItemNaming';
import TypeItemPure, { TypeItemPureProps } from '../TypeItemPure';
import { IconTipButton } from '../../../styles';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  collectionType,
  description,
  disabled = false,
  elementName,
  options,
  onDelete,
  onRename,
  onSubitemView,
}: Types.TypeItemProps) {
  const ct = Ctx.useLocalesContext();
  const basePath = Ctx.useBasePath();
  const render = Ctx.useSecondaryAction<string>('props');
  const [naming, setNaming] = useState(!options.propName);
  const { category, label, propPath } = Hook.useTypeItem(options);

  const [isState, selection] = Ctx.useSelection(
    'props',
    ExhibitorUtil.getPropPath([elementName as string, propPath]),
    propPath,
    options
  );

  const actions =
    !action && !onDelete && !render ? null : (
      <>
        {!naming && options.propName && action}

        {onRename && (
          <IconTipButton
            color={naming ? 'primary' : 'default'}
            title={ct('btn-rename-prop')}
            onClick={() => setNaming(true)}
          >
            {naming ? <LabelIcon /> : <LabelOutlinedIcon />}
          </IconTipButton>
        )}

        {!naming && onDelete && (
          <IconTipButton title={ct('btn-remove-prop')} onClick={onDelete}>
            <CloseIcon />
          </IconTipButton>
        )}

        {!naming &&
          render?.(ExhibitorUtil.getPropPath([basePath, 'props', propPath]))}
      </>
    );

  return (
    <>
      <Collapse in={naming}>
        <TypeItemNaming
          open={naming}
          propName={options.propName}
          selectable={Boolean(selection)}
          onClose={() => setNaming(false)}
          onRename={onRename}
        />
      </Collapse>

      <Collapse in={!naming}>
        <>
          {category === 'Display' && (
            <TypeItemDisplay
              action={actions}
              description={description}
              disabled={disabled || isState}
              label={label}
              options={options as TypeItemDisplayProps['options']}
              propPath={propPath}
              selection={selection}
              onClick={onSubitemView}
            />
          )}

          {category === 'Pure' && (
            <TypeItemPure
              action={actions}
              description={description}
              disabled={disabled || isState}
              label={label}
              options={options as TypeItemPureProps['options']}
              propPath={propPath}
              selection={selection}
            />
          )}

          {category === 'Mixed' && (
            <TypeItemMixed
              action={actions}
              disabled={disabled || isState || !options.propName}
              label={label}
              propPath={propPath}
              options={options as TypeItemMixedProps['options']}
              selection={selection}
              renderMatchedField={(matched, description, matchedAction) => (
                <TypeItem
                  {...{ collectionType, elementName, onDelete, onSubitemView }}
                  disabled={disabled || isState}
                  options={{ ...matched, propName: options.propName }}
                  action={matchedAction}
                  description={
                    <Typography variant="caption" color="text.secondary">
                      {description.replace(/import\s*\(.*?\)\s*;?\./g, '')}
                    </Typography>
                  }
                />
              )}
            />
          )}
        </>
      </Collapse>
    </>
  );
}
