import React, { CSSProperties, ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { makeGamePath } from 'ui/constants/paths';
import { GridItem } from 'ui/elements/grid';
import type { Platform } from '@sns/contracts/product';

interface Props {
  platforms: Platform[];
  id: string;
  setShowPlatforms(v: boolean): void;
  style?: CSSProperties;
  children: ReactNode;
}

export default function Item({
  id,
  platforms,
  style,
  setShowPlatforms,
  children,
}: Props) {
  const hasManyPlatforms = platforms.length > 1;

  const GridItemComponent = useCallback(
    ({ className, ...props }: Record<string, any>) => {
      if (hasManyPlatforms) {
        return (
          <button
            type="button"
            className={cx(className, 'appearance-none text-left')}
            style={{ alignItems: 'unset' }}
            {...props}
            onClick={() => setShowPlatforms(true)}
          />
        );
      }
      return (
        <Link
          {...props}
          className={className}
          to={makeGamePath({ productId: id })}
        />
      );
    },
    [hasManyPlatforms, id, setShowPlatforms],
  );

  return (
    <GridItem component={GridItemComponent} style={style}>
      {children}
    </GridItem>
  );
}
