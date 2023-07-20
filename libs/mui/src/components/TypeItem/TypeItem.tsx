import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import LabelIcon from '@mui/icons-material/Label';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import * as Common from '../common';
import * as Hook from '../../hooks';
import { IconTipButton } from '../../styles';
import type * as Types from './TypeItem.types';

export default function TypeItem({
  action,
  collectionType,
  description,
  disabled = false,
  options,
  onDelete,
  onRename,
  onSubitemView,
}: Types.TypeItemProps) {
  const ct = Hook.useFixedT();
  const [naming, setNaming] = useState(!options.propName);

  const { category, label, propPath } = Hook.useTypeItem(
    collectionType,
    options
  );

  const [isState, selection] = Hook.useStateSelection(propPath, (props) => (
    <Common.TypeItemSelection {...props} />
  ));

  const actions =
    !action && !onDelete ? null : (
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
      </>
    );

  return (
    <>
      <Collapse in={naming}>
        <Common.TypeItemNaming
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
            <Common.TypeItemDisplay
              action={actions}
              description={description}
              disabled={disabled || isState}
              label={label}
              options={options as Common.TypeItemDisplayProps['options']}
              propPath={propPath}
              selection={selection}
              onClick={onSubitemView}
            />
          )}

          {category === 'Pure' && (
            <Common.TypeItemPure
              action={actions}
              description={description}
              disabled={disabled || isState}
              label={label}
              options={options as Common.TypeItemPureProps['options']}
              propPath={propPath}
              selection={selection}
            />
          )}

          {category === 'Mixed' && (
            <Common.TypeItemMixed
              action={actions}
              disabled={disabled || isState || !options.propName}
              label={label}
              propPath={propPath}
              options={options as Common.TypeItemMixedProps['options']}
              selection={selection}
              renderMatchedField={(matched, description, matchedAction) => (
                <TypeItem
                  {...{ collectionType, onDelete, onSubitemView }}
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
