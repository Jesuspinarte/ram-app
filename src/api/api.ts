export type Status = "Alive" | "Dead" | "unknown";

export interface CharacterData {
  id: number;
  name: string;
  status: Status;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  episode: string[];
}

interface CharacterResponse {
  results: CharacterData[];
}

export interface EpisodeData {
  name: string;
}

export const getCharacters = async (): Promise<CharacterData[]> => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data: CharacterResponse = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEpisode = async (url: string): Promise<EpisodeData> => {
  try {
    const reponse = await fetch(url);
    const data = await reponse.json();

    return data;
  } catch (error) {
    console.error(error);
    return {
      name: "",
    };
  }
};
