import styles from './CircularImage.module.css'

const CircularImage = (props) => {
    let classes = [props.className, styles.circular_image].join(' ');

    return (
        <img className={classes} src={props.image}
            height={props.height} width={props.width} />
    );
};

export default CircularImage;