import { useEffect, useRef } from 'react';
import Scene from '../../webgl/Scene';
import s from './Canvas.module.scss';
const Canvas = () => {
    const canvasRef = useRef()
    useEffect(() => {
        Scene.setup(canvasRef.current);

    }, []);
    console.log(Scene);
    return <canvas ref={canvasRef} className={s.canvas} />

};

export default Canvas;