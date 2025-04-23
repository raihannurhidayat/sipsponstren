import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { FieldsTemplateSchema } from "@/lib/validation/fields-template-validation";
import Image from "next/image";
import React, { RefObject, useEffect, useRef, useState } from "react";

interface TemplatePreviewProps {
  templatesFields: FieldsTemplateSchema;
  className?: string;
}

export default function TemplatePreview(props: TemplatePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as RefObject<HTMLElement>);

  const {
    logo,
    header1,
    header2,
    addressStreet,
    addressTelp,
    addressCode,
    content,
  } = props?.templatesFields;

  const [logoSrc, setLogoSrc] = useState(logo instanceof File ? "" : logo);

  useEffect(() => {
    const objectUrl = logo instanceof File ? URL.createObjectURL(logo) : "";

    if (objectUrl) setLogoSrc(objectUrl);
    if (logo === null) setLogoSrc("");

    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        props.className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        {/* template header start */}
        <div className="flex items-center pb-3 border-b-4 border-black ">
          {logoSrc && (
            <Image
              src={logoSrc}
              alt="Author photo"
              width={128}
              height={128}
              className="aspect-square object-cover"
            />
          )}

          <div className="flex flex-col items-center w-full">
            <p className="text-2xl font-bold">{header1}</p>
            <p className="text-xl font-bold">{header2}</p>
            <div className="text-center">
              <p className="text-xs italic">{addressStreet}</p>
              <p className="text-xs italic">{addressTelp}</p>
              <p className="text-xs italic">{addressCode}</p>
            </div>
          </div>
        </div>
        {/* template header end */}

        {/* content start */}
        <div  className="revert-tailwind">
          <div dangerouslySetInnerHTML={{ __html: content! }} />
        </div>

        {/* content end */}
      </div>
    </div>
  );
}
