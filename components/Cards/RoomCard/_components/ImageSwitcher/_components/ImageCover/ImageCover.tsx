import { forwardRef } from 'react';
import cn from "classnames";
import s from "./style.module.scss";

interface ImageCoverProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
}

export const ImageCover = forwardRef<HTMLDivElement, ImageCoverProps>(
  ({ url, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className={cn(s.image_cover, className)}
        {...props}
      />
    );
  }
);

ImageCover.displayName = 'ImageCover';
