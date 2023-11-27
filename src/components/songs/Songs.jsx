import s from './Songs.module.scss';
import audioController from '../../utils/audioController';
import Scene from '../../webgl/Scene';

const Songs = ({ data }) => {

    const pickSong = () => {
        audioController.updateSong(data.preview);
        Scene.cover.updateCover(data.album.cover_xl);
    }
    return (
        <div className={s.song} onClick={pickSong} >
            <img src={data.album.cover_small} alt="" />
            <span className={s.title}>{data.title}</span>
        </div>
    )
};
export default Songs;