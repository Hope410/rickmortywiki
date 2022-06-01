type LocationLink = {
  name: string;
  url: string;
};

export type CharacterModel = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationLink;
  location: LocationLink;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};
