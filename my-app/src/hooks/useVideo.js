import { useReducer } from "react";

const actionTypes = {
    collection: "COLLECTION",
    video: "VIDEO",
    seconds: "SECONDS",
};

const useVideo = (state) => {
    const videoReducer = (state, id, video) => {
        let player = { ...state, ...state.videos };

        if (video) {
            player.playbackVideoID = id;
            player.videos[id] = { video };
        }

        return player;
    };

    const secondsReducer = (state, id, seconds) => {
        let player = { ...state, ...state.videos };

        if (seconds > 1) {
            player.videos[id].seconds = seconds;
        }

        return player;
    };

    const collectionReducer = (state, videos, token) => {
        let player = { ...state, ...state.videos };

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

    const playerReducer = (state, action) => {
        switch (action.type) {
            case actionTypes.collection:
                return collectionReducer(state, action.videos, action.token);
            case actionTypes.video:
                return videoReducer(state, action.id, action.video);
            case actionTypes.seconds:
                return secondsReducer(state, action.id, action.seconds);

        }
    }

    return useReducer(playerReducer, state);
};

export { actionTypes };
export default useVideo;