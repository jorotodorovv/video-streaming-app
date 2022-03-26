import styles from './CircularImage.module.css'

const CircularImage = (props) => {
    return (
        <img className={styles.circular_image} src={props.image}
            height={props.height} width={props.width} />
    );
};

export default CircularImage;