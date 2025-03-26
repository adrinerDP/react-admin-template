import { RouteProps } from 'react-router';
import { FC, LazyExoticComponent } from 'react';

export type RouteItem = Pick<RouteProps, 'path'> & {
  Page: LazyExoticComponent<FC>;
};
