import axios from 'axios';

let urlApiRickAndMorty ='https://rickandmortyapi.com/api/character';

export const getEpisodes = async()=>{
    const urlGetEpisodes=`${urlApiRickAndMorty}`;
    const resp = await axios.get(urlGetEpisodes);
    return resp.data;
};


export const getEpisodesUrl = async(url)=>{
    const urlGetEpisodes=`${url}`;
    const resp = await axios.get(urlGetEpisodes);
    return resp.data;
};

