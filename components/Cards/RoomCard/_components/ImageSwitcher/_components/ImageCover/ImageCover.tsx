import { forwardRef } from 'react';

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
        className={className ?? 'shrink-0 p-4 w-76.5 h-52 rounded-2xl'}
        {...props}
      />
    );
  }
);

ImageCover.displayName = 'ImageCover';