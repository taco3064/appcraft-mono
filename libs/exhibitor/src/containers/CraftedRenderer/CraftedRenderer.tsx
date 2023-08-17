import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import { LazyWidget } from '@appcraft/widgets';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Suspense } from 'react';
import { useTheme } from '@mui/material/styles';

import * as Hook from '../../hooks';
import type * as Types from './CraftedRenderer.types';

const ResponsiveGridLayout = WidthProvider(Responsive);

function RendererContent({
  elevation,
  fetchData,
  options,
  onLayoutChange,
  ...props
}: Types.RendererContentProps) {
  const theme = useTheme();
  const responsiveProps = Hook.useResponsiveProps(options);
  const [isPrepared, handleState] = Hook.useRendererState(options, fetchData);

  const render = Hook.useRender(
    props,
    handleState,
    (Widget, { key, props }) => <Widget key={key} {...props} />
  );

  if (!Array.isArray(options)) {
    return ((isPrepared && render(options, { state: { id: options.id } })) ||
      null) as JSX.Element;
  }

  return (
    <ResponsiveGridLayout
      {...responsiveProps}
      {...(onLayoutChange && {
        isDraggable: true,
        isResizable: true,
        resizeHandles: ['se'],
        resizeHandle: (
          <ArrowForwardIosIcon
            className="react-resizable-handle"
            sx={{
              position: 'absolute',
              cursor: 'nwse-resize',
              bottom: 0,
              right: 0,
              transform: 'rotate(45deg)',
              color: theme.palette.action.disabled,

              '&:hover': {
                color: theme.palette.action.active,
              },
            }}
          />
        ),
        onLayoutChange,
      })}
      autoSize
      rowHeight={Number.parseInt(theme.spacing(6).replace(/px$/, ''), 10)}
      style={{ position: 'relative', minHeight: theme.spacing(6) }}
    >
      {options.map(({ id, template }) => {
        const widget = fetchData.get(template?.id);

        return (
          <Paper key={id} elevation={elevation}>
            {id}
            {isPrepared &&
              widget &&
              render(widget, { state: { id: template.id } })}
          </Paper>
        );
      })}
    </ResponsiveGridLayout>
  );
}

export default function CraftedRenderer({
  elevation,
  options,
  onFetchData,
  onFetchWrapper,
  onLayoutChange,
  onOutputCollect,
}: Types.CraftedRendererProps) {
  const LazyRenderer = Hook.useLazyRenderer<Types.LazyRendererProps>(
    options as Parameters<typeof Hook.useLazyRenderer>[0],
    onFetchWrapper,
    (props) => <RendererContent {...(props as Types.RendererContentProps)} />
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      {options && (
        <LazyRenderer
          {...{ elevation, onFetchData, onLayoutChange, onOutputCollect }}
          options={options}
          onFetchTodoWrapper={onFetchWrapper}
          onLazyRetrieve={(type) => LazyWidget[type]}
        />
      )}
    </Suspense>
  );
}
