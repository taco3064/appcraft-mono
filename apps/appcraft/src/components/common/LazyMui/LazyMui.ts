import { lazy } from 'react';
import type { Mui } from './LazyMui.types';

const LazyMui: Mui = [
  {
    category: 'data-display',
    widgets: [
      {
        typeFile: './node_modules/@mui/material/Avatar/Avatar.d.ts',
        typeName: 'Avatar',
        component: lazy(() => import('@mui/material/Avatar')),
      },
      {
        typeFile: './node_modules/@mui/material/AvatarGroup/AvatarGroup.d.ts',
        typeName: 'AvatarGroup',
        component: lazy(() => import('@mui/material/AvatarGroup')),
      },
      {
        typeFile: './node_modules/@mui/material/ImageList/ImageList.d.ts',
        typeName: 'ImageList',
        component: lazy(() => import('@mui/material/ImageList')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ImageListItem/ImageListItem.d.ts',
        typeName: 'ImageListItem',
        component: lazy(() => import('@mui/material/ImageListItem')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ImageListItemBar/ImageListItemBar.d.ts',
        typeName: 'ImageListItemBar',
        component: lazy(() => import('@mui/material/ImageListItemBar')),
      },
      {
        typeFile: './node_modules/@mui/material/List/List.d.ts',
        typeName: 'List',
        component: lazy(() => import('@mui/material/List')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ListSubheader/ListSubheader.d.ts',
        typeName: 'ListSubheader',
        component: lazy(() => import('@mui/material/ListSubheader')),
      },
      {
        typeFile: './node_modules/@mui/material/ListItem/ListItem.d.ts',
        typeName: 'ListItem',
        component: lazy(() => import('@mui/material/ListItem')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ListItemButton/ListItemButton.d.ts',
        typeName: 'ListItemButton',
        component: lazy(() => import('@mui/material/ListItemButton')),
      },
      {
        typeFile: './node_modules/@mui/material/ListItemIcon/ListItemIcon.d.ts',
        typeName: 'ListItemIcon',
        component: lazy(() => import('@mui/material/ListItemIcon')),
      },
      {
        typeFile: './node_modules/@mui/material/ListItemText/ListItemText.d.ts',
        typeName: 'ListItemText',
        component: lazy(() => import('@mui/material/ListItemText')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ListItemSecondaryAction/ListItemSecondaryAction.d.ts',
        typeName: 'ListItemSecondaryAction',
        component: lazy(() => import('@mui/material/ListItemSecondaryAction')),
      },
    ],
  },
  {
    category: 'input',
    widgets: [
      {
        typeFile: './node_modules/@mui/material/Checkbox/Checkbox.d.ts',
        typeName: 'Checkbox',
        component: lazy(() => import('@mui/material/Checkbox')),
      },
      {
        typeFile:
          './node_modules/@mui/material/FormControlLabel/FormControlLabel.d.ts',
        typeName: 'FormControlLabel',
        component: lazy(() => import('@mui/material/FormControlLabel')),
      },
      {
        typeFile: './node_modules/@mui/material/FormGroup/FormGroup.d.ts',
        typeName: 'FormGroup',
        component: lazy(() => import('@mui/material/FormGroup')),
      },
      {
        typeFile:
          './node_modules/@mui/material/InputAdornment/InputAdornment.d.ts',
        typeName: 'InputAdornment',
        component: lazy(() => import('@mui/material/InputAdornment')),
      },
      {
        typeFile: './node_modules/@mui/material/MenuItem/MenuItem.d.ts',
        typeName: 'MenuItem',
        component: lazy(() => import('@mui/material/MenuItem')),
      },
      {
        typeFile: './node_modules/@mui/material/Radio/Radio.d.ts',
        typeName: 'Radio',
        component: lazy(() => import('@mui/material/Radio')),
      },
      {
        typeFile: './node_modules/@mui/material/RadioGroup/RadioGroup.d.ts',
        typeName: 'RadioGroup',
        component: lazy(() => import('@mui/material/RadioGroup')),
      },
      {
        typeFile: './node_modules/@mui/material/Slider/Slider.d.ts',
        typeName: 'Slider',
        component: lazy(() => import('@mui/material/Slider')),
      },
      {
        typeFile: './node_modules/@mui/material/Switch/Switch.d.ts',
        typeName: 'Switch',
        component: lazy(() => import('@mui/material/Switch')),
      },
      {
        typeFile: './node_modules/@mui/material/TextField/TextField.d.ts',
        typeName: 'TextField',
        component: lazy(() => import('@mui/material/TextField')),
      },
      {
        typeFile: './node_modules/@mui/material/ToggleButton/ToggleButton.d.ts',
        typeName: 'ToggleButton',
        component: lazy(() => import('@mui/material/ToggleButton')),
      },
      {
        typeFile:
          './node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.d.ts',
        typeName: 'ToggleButtonGroup',
        component: lazy(() => import('@mui/material/ToggleButtonGroup')),
      },
    ],
  },
  {
    category: 'layout',
    widgets: [
      {
        typeFile: './node_modules/@mui/material/Accordion/Accordion.d.ts',
        typeName: 'Accordion',
        component: lazy(() => import('@mui/material/Accordion')),
      },
      {
        typeFile:
          './node_modules/@mui/material/AccordionActions/AccordionActions.d.ts',
        typeName: 'AccordionActions',
        component: lazy(() => import('@mui/material/AccordionActions')),
      },
      {
        typeFile:
          './node_modules/@mui/material/AccordionDetails/AccordionDetails.d.ts',
        typeName: 'AccordionDetails',
        component: lazy(() => import('@mui/material/AccordionDetails')),
      },
      {
        typeFile:
          './node_modules/@mui/material/AccordionSummary/AccordionSummary.d.ts',
        typeName: 'AccordionSummary',
        component: lazy(() => import('@mui/material/AccordionSummary')),
      },
      {
        typeFile: './node_modules/@mui/material/Card/Card.d.ts',
        typeName: 'Card',
        component: lazy(() => import('@mui/material/Card')),
      },
      {
        typeFile: './node_modules/@mui/material/CardActions/CardActions.d.ts',
        typeName: 'CardActions',
        component: lazy(() => import('@mui/material/CardActions')),
      },
      {
        typeFile: './node_modules/@mui/material/CardContent/CardContent.d.ts',
        typeName: 'CardContent',
        component: lazy(() => import('@mui/material/CardContent')),
      },
      {
        typeFile: './node_modules/@mui/material/CardHeader/CardHeader.d.ts',
        typeName: 'CardHeader',
        component: lazy(() => import('@mui/material/CardHeader')),
      },
      {
        typeFile: './node_modules/@mui/material/CardMedia/CardMedia.d.ts',
        typeName: 'CardMedia',
        component: lazy(() => import('@mui/material/CardMedia')),
      },
      {
        typeFile: './node_modules/@mui/material/Collapse/Collapse.d.ts',
        typeName: 'Collapse',
        component: lazy(() => import('@mui/material/Collapse')),
      },
      {
        typeFile: './node_modules/@mui/material/Container/Container.d.ts',
        typeName: 'Container',
        component: lazy(() => import('@mui/material/Container')),
      },
      {
        typeFile: './node_modules/@mui/material/Grid/Grid.d.ts',
        typeName: 'Grid',
        component: lazy(() => import('@mui/material/Grid')),
      },
      {
        typeFile: './node_modules/@mui/material/Paper/Paper.d.ts',
        typeName: 'Paper',
        component: lazy(() => import('@mui/material/Paper')),
      },
    ],
  },
  {
    category: 'navigation',
    widgets: [
      {
        typeFile: './node_modules/@mui/material/Pagination/Pagination.d.ts',
        typeName: 'Pagination',
        component: lazy(() => import('@mui/material/Pagination')),
      },
      {
        typeFile:
          './node_modules/@mui/material/PaginationItem/PaginationItem.d.ts',
        typeName: 'PaginationItem',
        component: lazy(() => import('@mui/material/PaginationItem')),
      },
      {
        typeFile: './node_modules/@mui/material/Step/Step.d.ts',
        typeName: 'Step',
        component: lazy(() => import('@mui/material/Step')),
      },
      {
        typeFile: './node_modules/@mui/material/StepButton/StepButton.d.ts',
        typeName: 'StepButton',
        component: lazy(() => import('@mui/material/StepButton')),
      },
      {
        typeFile:
          './node_modules/@mui/material/StepConnector/StepConnector.d.ts',
        typeName: 'StepConnector',
        component: lazy(() => import('@mui/material/StepConnector')),
      },
      {
        typeFile: './node_modules/@mui/material/StepContent/StepContent.d.ts',
        typeName: 'StepContent',
        component: lazy(() => import('@mui/material/StepContent')),
      },
      {
        typeFile: './node_modules/@mui/material/StepIcon/StepIcon.d.ts',
        typeName: 'StepIcon',
        component: lazy(() => import('@mui/material/StepIcon')),
      },
      {
        typeFile: './node_modules/@mui/material/StepLabel/StepLabel.d.ts',
        typeName: 'StepLabel',
        component: lazy(() => import('@mui/material/StepLabel')),
      },
      {
        typeFile: './node_modules/@mui/material/Stepper/Stepper.d.ts',
        typeName: 'Stepper',
        component: lazy(() => import('@mui/material/Stepper')),
      },
      {
        typeFile: './node_modules/@mui/material/Tabs/Tabs.d.ts',
        typeName: 'Tabs',
        component: lazy(() => import('@mui/material/Tabs')),
      },
      {
        typeFile: './node_modules/@mui/material/Tab/Tab.d.ts',
        typeName: 'Tab',
        component: lazy(() => import('@mui/material/Tab')),
      },
      {
        typeFile:
          './node_modules/@mui/material/TabScrollButton/TabScrollButton.d.ts',
        typeName: 'TabScrollButton',
        component: lazy(() => import('@mui/material/TabScrollButton')),
      },
    ],
  },
  {
    category: 'tool',
    widgets: [
      {
        typeFile: './node_modules/@mui/material/AppBar/AppBar.d.ts',
        typeName: 'AppBar',
        component: lazy(() => import('@mui/material/AppBar')),
      },
      {
        typeFile: './node_modules/@mui/material/Badge/Badge.d.ts',
        typeName: 'Badge',
        component: lazy(() => import('@mui/material/Badge')),
      },
      {
        typeFile: './node_modules/@mui/material/Button/Button.d.ts',
        typeName: 'Button',
        component: lazy(() => import('@mui/material/Button')),
      },
      {
        typeFile: './node_modules/@mui/material/ButtonGroup/ButtonGroup.d.ts',
        typeName: 'ButtonGroup',
        component: lazy(() => import('@mui/material/ButtonGroup')),
      },
      {
        typeFile: './node_modules/@mui/material/Chip/Chip.d.ts',
        typeName: 'Chip',
        component: lazy(() => import('@mui/material/Chip')),
      },
      {
        typeFile: './node_modules/@mui/material/Divider/Divider.d.ts',
        typeName: 'Divider',
        component: lazy(() => import('@mui/material/Divider')),
      },
      {
        typeFile: './node_modules/@mui/material/Fab/Fab.d.ts',
        typeName: 'Fab',
        component: lazy(() => import('@mui/material/Fab')),
      },
      {
        typeFile: './node_modules/@mui/material/Icon/Icon.d.ts',
        typeName: 'Icon',
        component: lazy(() => import('@mui/material/Icon')),
      },
      {
        typeFile: './node_modules/@mui/material/IconButton/IconButton.d.ts',
        typeName: 'IconButton',
        component: lazy(() => import('@mui/material/IconButton')),
      },
      {
        typeFile: './node_modules/@mui/material/Toolbar/Toolbar.d.ts',
        typeName: 'Toolbar',
        component: lazy(() => import('@mui/material/Toolbar')),
      },
      {
        typeFile: './node_modules/@mui/material/Tooltip/Tooltip.d.ts',
        typeName: 'Tooltip',
        component: lazy(() => import('@mui/material/Tooltip')),
      },
      {
        typeFile: './node_modules/@mui/material/Typography/Typography.d.ts',
        typeName: 'Typography',
        component: lazy(() => import('@mui/material/Typography')),
      },
    ],
  },
];

export default LazyMui;
