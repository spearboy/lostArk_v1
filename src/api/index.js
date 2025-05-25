import API from "./api";


export const fetchCharacter = (characterName) => {
    return API.get(
        `/armories/characters/${encodeURIComponent(characterName)}`
    );
};