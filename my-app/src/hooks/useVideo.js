import { useReducer } from "react";

const collectionReducer = (state, { videos, token }) => {
    let player = { ...state, videos: {...state.videos} };

    if (token) {
        player.token = token;
    }

    if (videos) {
        for (let video of videos) {
            player.videos[video.id] = { video };
        }
    }

    return player;
}

const playerReducer = (state, args) => {
    let player = { ...state };

    player = videoReducer(player, args);
    player = playbackReducer(player, args);
    player = secondsReducer(player, args);

    return player;
}

const videoReducer = (state, { id, video }) => {
    let player = { ...state, videos: {...state.videos} };

    if (video) {
        player.videos[id] = { video };
    }

    return player;
};

const playbackReducer = (state, { id }) => {
    let player = { ...state, playbackVideoID: id };

    return player;
};

const secondsReducer = (state, { id, seconds }) => {
    let player = { ...state, videos: {...state.videos} };

    if (seconds > 1) {
        player.videos[id].seconds = seconds;
    }

    return player;
};

const actions = {
    collection: collectionReducer,
    video: videoReducer,
    seconds: secondsReducer,
    playback: playbackReducer,
    player: playerReducer,
};

const useVideo = (state) => {
    const reducer = (state, action) => {
        return action.reducer(state, { ...action });
    }

    return useReducer(reducer, state);
};

export { actions };

export default useVideo;