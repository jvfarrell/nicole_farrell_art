export interface Artwork {
    id?: string;
    title?: string;
    description?: string;
    price?: number;
    dateCreated?: Date;
    categoryMaterial?: string;
    dimensions?: string;
    filename?: string;
    imageUrl?: string;
  }

export interface ArtworkUpload {
    title?: string;
    description?: string;
    price?: number;
    dateCreated?: Date;
    categoryMaterial?: string;
    dimensions?: string;
    filename?: string;
  }

