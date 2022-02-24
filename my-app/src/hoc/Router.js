import { Routes, Route } from 'react-router-dom'
import Home from '../containers/Home/Home'
import Video from '../containers/Video/Video'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/videos/:id' element={<Video />} />
        </Routes>
    );
};

export default Router;