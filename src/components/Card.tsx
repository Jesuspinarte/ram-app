import { useEffect, useState } from "react";
import { CharacterData, getEpisode } from "../api/api";
import "./Card.scss";

interface CardProps extends CharacterData {
  onRemove: (id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  status,
  location,
  species,
  image,
  episode,
  onRemove,
}) => {
  const [episodeName, setEpisodeName] = useState("");

  useEffect(() => {
    if (episode?.length > 0) {
      const getData = async () => {
        const newData = await getEpisode(episode[0]);
        setEpisodeName(newData.name);
      };

      getData();
    }
  }, [episode]);

  return (
    <article className="card">
      <div className="card-img-wrapper">
        <img className="card-img" src={image} />
      </div>
      <button className="card-rmv-btn" onClick={() => onRemove(id)}>
        X
      </button>
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <span className={`card-status--${status.toLocaleLowerCase()}`}>
          {status} - {species}
        </span>
        <div className="card-data">
          <span className="card-data-title">Last known location:</span>
          <p className="card-data-info">{location.name}</p>
        </div>
        <div className="card-data">
          <span className="card-data-title">First seen in:</span>
          <p className="card-data-info">{episodeName}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
