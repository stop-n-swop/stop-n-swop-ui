import React, { CSSProperties, memo, ReactNode } from 'react';
import grasstl from 'ui/assets/tiles/grass-t-l.png';
import grasst from 'ui/assets/tiles/grass-t.png';
import grasstr from 'ui/assets/tiles/grass-t-r.png';
import grassl from 'ui/assets/tiles/grass-l.png';
import grass from 'ui/assets/tiles/grass.png';
import grassr from 'ui/assets/tiles/grass-r.png';
import grassbl from 'ui/assets/tiles/grass-b-l.png';
import grassb from 'ui/assets/tiles/grass-b.png';
import grassbr from 'ui/assets/tiles/grass-b-r.png';

interface Props {
  edges:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'x'
    | 'y'
    | 'all'
    | 'none';
  width?: number | string;
  height?: number;
  style?: CSSProperties;
  className?: string;
}

function Grass({ edges, className, height = 1, style, width = 1 }: Props) {
  let top: ReactNode;
  let middle: ReactNode;
  let bottom: ReactNode;

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
                backgroundImage: `url(${grasstl})`,
                height: 16,
                width: 16,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grasst})`,
                height: 16,
                flexGrow: 1,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grasstr})`,
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
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${grasst})`,
                height: 16,
                flexGrow: 1,
              }}
            />
          </div>
        );
        break;
      case 'top-left':
        top = (
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${grasstl})`,
                height: 16,
                width: 16,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grasst})`,
                height: 16,
                flexGrow: 1,
              }}
            />
          </div>
        );
        break;
      case 'top-right':
        top = (
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${grasst})`,
                height: 16,
                flexGrow: 1,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grasstr})`,
                height: 16,
                width: 16,
              }}
            />
          </div>
        );
        break;
      default:
        break;
    }
  })();

  // bottom row
  (() => {
    switch (edges) {
      case 'x':
      case 'right':
      case 'top':
      case 'left':
      case 'none':
      case 'top-left':
      case 'top-right':
        bottom = null;
        break;
      case 'all':
        bottom = (
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${grassbl})`,
                height: 16,
                width: 16,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grassb})`,
                height: 16,
                flexGrow: 1,
              }}
            />
            <div
              style={{
                backgroundImage: `url(${grassbr})`,
                height: 16,
                width: 16,
              }}
            />
          </div>
        );
        break;
      case 'y':
      case 'bottom':
        bottom = (
          <div className="flex">
            <div
              style={{
                backgroundImage: `url(${grassb})`,
                height: 16,
                flexGrow: 1,
              }}
            />
          </div>
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
    let offsetY = 0;

    if (top) {
      offsetY += 1;
    }
    if (bottom) {
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
      case 'top-left':
        left = (
          <div
            style={{
              backgroundImage: `url(${grassl})`,
              height: 16 * (height - offsetY),
              width: 16,
            }}
          />
        );
        break;
      default:
        left = null;
        break;
    }

    switch (edges) {
      case 'all':
      case 'right':
      case 'x':
      case 'top-right':
        right = (
          <div
            style={{
              backgroundImage: `url(${grassr})`,
              height: 16 * (height - offsetY),
              width: 16,
            }}
          />
        );
        break;
      default:
        right = null;
        break;
    }

    const center = (
      <div
        style={{
          backgroundImage: `url(${grass})`,
          height: 16 * (height - offsetY),
          flexGrow: 1,
        }}
      />
    );

    middle = (
      <div className="flex">
        {left}
        {center}
        {right}
      </div>
    );
  })();

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: typeof width === 'string' ? width : width * 16,
        ...style,
      }}
    >
      {top}
      {middle}
      {bottom}
    </div>
  );
}

export default memo(Grass);
