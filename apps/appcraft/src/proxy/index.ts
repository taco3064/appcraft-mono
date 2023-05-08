import { lazy } from 'react';

export const Inputs = {
  Checkbox: lazy(() => import('@mui/material/Checkbox')),
  Fab: lazy(() => import('@mui/material/Fab')),
  FormControlLabel: lazy(() => import('@mui/material/FormControlLabel')),
  FormGroup: lazy(() => import('@mui/material/FormGroup')),
  InputAdornment: lazy(() => import('@mui/material/InputAdornment')),
  Radio: lazy(() => import('@mui/material/Radio')),
  RadioGroup: lazy(() => import('@mui/material/RadioGroup')),
  Slider: lazy(() => import('@mui/material/Slider')),
  Switch: lazy(() => import('@mui/material/Switch')),
  TextField: lazy(() => import('@mui/material/TextField')),
  ToggleButton: lazy(() => import('@mui/material/ToggleButton')),
  ToggleButtonGroup: lazy(() => import('@mui/material/ToggleButtonGroup')),
};

export const Layouts = {
  Accordion: lazy(() => import('@mui/material/Accordion')),
  AccordionActions: lazy(() => import('@mui/material/AccordionActions')),
  AccordionDetails: lazy(() => import('@mui/material/AccordionDetails')),
  AccordionSummary: lazy(() => import('@mui/material/AccordionSummary')),
  Card: lazy(() => import('@mui/material/Card')),
  CardActions: lazy(() => import('@mui/material/CardActions')),
  CardContent: lazy(() => import('@mui/material/CardContent')),
  CardHeader: lazy(() => import('@mui/material/CardHeader')),
  CardMedia: lazy(() => import('@mui/material/CardMedia')),
  Collapse: lazy(() => import('@mui/material/Collapse')),
  Container: lazy(() => import('@mui/material/Container')),
  Grid: lazy(() => import('@mui/material/Grid')),
  Paper: lazy(() => import('@mui/material/Paper')),
};

export const DataDisplay = {
  Avatar: lazy(() => import('@mui/material/Avatar')),
  AvatarGroup: lazy(() => import('@mui/material/AvatarGroup')),
  ImageList: lazy(() => import('@mui/material/ImageList')),
  ImageListItem: lazy(() => import('@mui/material/ImageListItem')),
  ImageListItemBar: lazy(() => import('@mui/material/ImageListItemBar')),
  List: lazy(() => import('@mui/material/List')),
  ListItem: lazy(() => import('@mui/material/ListItem')),
  ListItemButton: lazy(() => import('@mui/material/ListItemButton')),
  ListItemIcon: lazy(() => import('@mui/material/ListItemIcon')),
  ListItemSecondaryAction: lazy(
    () => import('@mui/material/ListItemSecondaryAction')
  ),
  ListItemText: lazy(() => import('@mui/material/ListItemText')),
  ListSubheader: lazy(() => import('@mui/material/ListSubheader')),
};

export const Toolbars = {
  AppBar: lazy(() => import('@mui/material/AppBar')),
  Badge: lazy(() => import('@mui/material/Badge')),
  Button: lazy(() => import('@mui/material/Button')),
  ButtonGroup: lazy(() => import('@mui/material/ButtonGroup')),
  Chip: lazy(() => import('@mui/material/Chip')),
  Divider: lazy(() => import('@mui/material/Divider')),
  Icon: lazy(() => import('@mui/material/Icon')),
  IconButton: lazy(() => import('@mui/material/IconButton')),
  Toolbar: lazy(() => import('@mui/material/Toolbar')),
  Tooltip: lazy(() => import('@mui/material/Tooltip')),
  Typography: lazy(() => import('@mui/material/Typography')),
};

export const Navigation = {
  Pagination: lazy(() => import('@mui/material/Pagination')),
  PaginationItem: lazy(() => import('@mui/material/PaginationItem')),
  Step: lazy(() => import('@mui/material/Step')),
  StepButton: lazy(() => import('@mui/material/StepButton')),
  StepConnector: lazy(() => import('@mui/material/StepConnector')),
  StepContent: lazy(() => import('@mui/material/StepContent')),
  StepIcon: lazy(() => import('@mui/material/StepIcon')),
  StepLabel: lazy(() => import('@mui/material/StepLabel')),
  Stepper: lazy(() => import('@mui/material/Stepper')),
  Tab: lazy(() => import('@mui/material/Tab')),
  TabScrollButton: lazy(() => import('@mui/material/TabScrollButton')),
  Tabs: lazy(() => import('@mui/material/Tabs')),
};
