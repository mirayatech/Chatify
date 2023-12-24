import { useState } from "react";
import { SiAdobeacrobatreader } from "react-icons/si";

import { FILE_ICON } from "../../library";
import { FileImage } from "./Style";

type FileIconProps = {
  extension: string;
  className?: string;
};

export const FileIcon = ({ extension, className }: FileIconProps) => {
  const [isError, setIsError] = useState(false);

  if (isError)
    return (
      <SiAdobeacrobatreader
        style={{
          fontSize: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );

  return (
    <FileImage
      className={className || ""}
      onError={() => setIsError(true)}
      src={FILE_ICON(extension)}
    />
  );
};
