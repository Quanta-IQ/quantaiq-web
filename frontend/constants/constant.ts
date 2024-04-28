
export const DOCUMENT_TYPES = [
    "text/html",
    "application/pdf",
    "text/plain",
  ] as const;
  
  export type DocumentType = (typeof DOCUMENT_TYPES)[number];
  
  export const IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ] as const;
  
  export type ImageType = (typeof IMAGE_TYPES)[number];