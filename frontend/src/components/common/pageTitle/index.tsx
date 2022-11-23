import React, { FC } from 'react';
import 'components/common/pageTitle/pageTitle.css'

export const PageTitle: FC<any> = React.memo(({ children, ...rest }) => {
  return <h3 className={'page-title'} {...rest}>{children}</h3>;
});