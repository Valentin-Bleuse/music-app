import s from "./Picker.module.scss";
import Scene from "../../webgl/Scene";
const Picker = () => {
    const pickVisualiser = (index) => {
        Scene.changeVisualizer(index);
    };
    return (

        <div className={s.picker}>
            <div onClick={() => pickVisualiser(0)}>CUbe</div>
            <div onClick={() => pickVisualiser(1)}>Line</div>
            <div onClick={() => pickVisualiser(2)}>Logo</div>
            <div onClick={() => pickVisualiser(3)}>truc</div>
            <div onClick={() => pickVisualiser(4)}>Cover</div>
        </div>
    );

}
export default Picker;