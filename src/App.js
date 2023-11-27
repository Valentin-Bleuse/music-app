
import './App.css';
import s from './App.module.scss'
import Canvas from './components/canvas/Canva';
import Picker from './components/picker/Picker';
import Search from './components/search/Search';
import Songs from './components/songs/Songs';
import useCustomStore from './customStore';


const App = () => {
  const songs = useCustomStore((state) => state.songs);
  console.log(songs)
  return (

    <div >
      <div className={s.songs}>
        {songs.map((song, key) => {
          return <Songs key={key} data={song} />;
        })}

      </div>
      <Picker />
      <Search />
      <Canvas />

    </div>
  );
}

export default App;
