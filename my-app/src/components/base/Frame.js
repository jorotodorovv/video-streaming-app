const Frame = (props) => {
    return <iframe 
    width={props.width} 
    height={props.height} 
    src={props.src} 
    frameBorder="0" 
    allowFullScreen/>
};

export default Frame;