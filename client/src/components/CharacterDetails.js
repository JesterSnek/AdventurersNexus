const CharacterDetails = ({ character }) => {
  return (
    <div className="character-details">
      <h4>{character.name}</h4>
      <p>
        <strong>Class: </strong>
        {character.characterClass.name}
      </p>
      <p>
        <strong>Background: </strong>
        {character.background.name}
      </p>
      <p>
        <strong>Race: </strong>
        {character.race.name}
      </p>
    </div>
  );
};

export default CharacterDetails;
