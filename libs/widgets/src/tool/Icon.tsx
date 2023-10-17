import FacebookIcon from '@mui/icons-material/Facebook';
import MuiIcon from '@mui/material/Icon';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import type { ComponentProps } from 'react';

export interface IconProps
  extends Pick<
    ComponentProps<typeof MuiIcon>,
    'baseClassName' | 'color' | 'fontSize'
  > {
  children: string;
}

export const Icon = ({ baseClassName, children, ...props }: IconProps) => {
  switch (children) {
    case 'facebook':
      return <FacebookIcon {...props} />;
    case 'git_hub':
      return <GitHubIcon {...props} />;
    case 'instagram':
      return <InstagramIcon {...props} />;
    case 'linked_in':
      return <LinkedInIcon {...props} />;
    case 'twitter':
      return <TwitterIcon {...props} />;
    default:
      return (
        <MuiIcon {...props} baseClassName={baseClassName}>
          {children}
        </MuiIcon>
      );
  }
};
