import React, { CSSProperties, memo, ReactNode } from 'react';
import watertl from 'ui/assets/tiles/water-t-l.png';
import watert from 'ui/assets/tiles/water-t.png';
import watert2 from 'ui/assets/tiles/water-t-2.png';
import watertr from 'ui/assets/tiles/water-t-r.png';
import waterl from 'ui/assets/tiles/water-l.png';
import water from 'ui/assets/tiles/water.png';
import water2 from 'ui/assets/tiles/water-2.png';
import waterr from 'ui/assets/tiles/water-r.png';

interface Props {
  edges: 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y' | 'all' | 'none';
  open?: boolean;
  width?: number | string;
  height?: number;
  style?: CSSProperties;
  className?: string;
}

function Water({
  edges,
  open = false,
  className,
  height = 1,
  style,
  width = 1,
}: Props) {
  let top: ReactNode;
  let middle: ReactNode;

  // Top row
  (() => {
    switch (edges) {
      case 'x':
      case 'right':
      case 'bottom':
      case 'left':
      case 'none':
        top = null;
        break;
      case 'all':
        top = (
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${watertl})`,
                height: 16,
                width: 16,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${watert})`,
                height: 16,
                width: 16 * (Number(width) - 2),
              }}
            />
            <div
              style={{
                backgroundImage: `url(${watertr})`,
                height: 16,
                width: 16,
              }}
            />
          </div>
        );
        break;
      case 'y':
      case 'top':
        top = (
          <div
            style={{
              backgroundImage: `url(${open ? watert2 : watert})`,
              height: 16,
              width: typeof width === 'string' ? width : 16 * width,
            }}
          />
        );
        break;
      default:
        break;
    }
  })();

  // middle row
  (() => {
    let left: ReactNode;
    let right: ReactNode;
    let offsetX = 0;
    let offsetY = 0;

    if (top) {
      offsetY += 1;
    }

    if (offsetY >= height) {
      middle = null;
      return;
    }

    switch (edges) {
      case 'all':
      case 'left':
      case 'x':
        left = (
          <div
            style={{
              backgroundImage: `url(${waterl})`,
              height: 16 * (height - offsetY),
              width: 16,
            }}
          />
        );
        offsetX += 1;
        break;
      default:
        left = null;
        break;
    }

    switch (edges) {
      case 'all':
      case 'right':
      case 'x':
        right = (
          <div
            style={{
              backgroundImage: `url(${waterr})`,
              height: 16 * (height - offsetY),
              width: 16,
            }}
          />
        );
        offsetX += 1;
        break;
      default:
        right = null;
        break;
    }

    const center = (
      <div
        style={{
          backgroundImage: `url(${open ? water2 : water})`,
          height: 16 * (height - offsetY),
          width: typeof width === 'string' ? width : 16 * (width - offsetX),
        }}
      />
    );

    if (left || right) {
      middle = (
        <div className="flex">
          {left}
          {center}
          {right}
        </div>
      );
    } else {
      middle = center;
    }
  })();

  return (
    <div className={className} style={style}>
      {top}
      {middle}
    </div>
  );
}

export default memo(Water);
