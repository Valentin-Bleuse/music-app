import s from './Search.module.scss';
import fetchJsonp from "fetch-jsonp";
import { useEffect, useState, useCallback } from 'react';
import useCustomStore from '../../customStore';
import { useDropzone } from 'react-dropzone';
import audioController
    from '../../utils/audioController';

const Search = () => {
    const [artist, setArtist] = useState("");
    const setSongs = useCustomStore(state => state.setSongs);

    const onDrop = useCallback(
        (audio) => {
            console.log("dropped", audio);
            const src = URL.createObjectURL(audio[0]);

            const audioObject = {
                title: audio[0].name,
                album: {
                    cover_small: "",
                },
                preview: src,
            };

            setSongs([audioObject]);
            console.log(audioObject);
        },
        [setSongs]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true, accept: { "audio/mepg": [".mp3"], }, });

    useEffect(() => {
        audioController.setup();
    }
        , []);

    const onKeyDown = (e) => {
        console.log(e);
        if (e.keyCode === 13 && e.target.value !== '') {
            getSongs();
        }

    };
    const getSongs = async () => {
        let response = await fetchJsonp(
            `https://api.deezer.com/search?q=${artist}&output=jsonp`
        );

        response = await response.json(response);

        console.log(response.data);

        const data = response.data.slice(0, 10);

        audioController.ctx.resume();
        setSongs(data);
        setArtist('');

        console.log(getInputProps);
    };



    return <div className={s.searchWrapper}{...getRootProps()}>
        <input type="text" className={s.searchInput} onChange={(e) => setArtist(e.target.value)} onKeyDown={onKeyDown}

        />
        {isDragActive && <input {...getInputProps()} />}

    </div>
}

export default Search;