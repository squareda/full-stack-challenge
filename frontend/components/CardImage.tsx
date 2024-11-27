import React from "react";

const config = {
  imageDomain: "https://groupleavingcards.com/assets/design/",
};

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  customDesignPath?: string;
  id: string;
  alt: string;
  small?: boolean;
  query?: string;
  customisable?: boolean;
  animated?: boolean;
}

export const getImageUrl = (options: {
  designId?: string;
  customDesignPath?: string;
  format?: string;
  small?: boolean;
  customisable?: boolean;
}) => {
  if (options.customDesignPath) {
    return options.customDesignPath.startsWith("http")
      ? options.customDesignPath
      : `/api/uploads/${options.customDesignPath}`;
  }

  return `${config.imageDomain}/${options.designId}${
    options.small ? "_sm" : options.customisable ? "_preview" : ""
  }${options.format ? `.${options.format}` : ""}`;
};

/**
 * Render card image using best supported image format
 */
const CardImage: React.FC<Props> = ({
  id,
  alt,
  small,
  query,
  customDesignPath,
  customisable,
  animated,
  ...props
}) => {
  if (customDesignPath) {
    const src = getImageUrl({ customDesignPath });
    return <img {...props} src={src} alt={alt} />;
  }

  const base = getImageUrl({ designId: id, small, customisable });

  // webp gifs do not render properly on safari - frames are dropped
  const ua =
    typeof window !== "undefined" && window.navigator.userAgent.toLowerCase();
  const isSafari = ua && ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
  const isSafariGif = isSafari && animated;

  const q = query || "";
  return (
    <picture style={{ height: "100%" }}>
      {!animated && <source srcSet={`${base}.avif${q}`} type="image/avif" />}
      {!isSafariGif && <source srcSet={`${base}.webp${q}`} type="image/webp" />}
      <source
        srcSet={`${base}.${animated ? "gif" : "jpg"}${q}`}
        type={`image/${animated ? "gif" : "jpeg"}`}
      />
      <img
        {...props}
        src={`${base}.${animated ? "gif" : "jpg"}${q}`}
        alt={alt}
      />
    </picture>
  );
};

export default CardImage;
