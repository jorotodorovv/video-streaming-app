import { useReducer } from "react";

const useVideo = (state) => {
    const initReducer = (state, config) => {
        return { ...state, config, token: config.initialToken };
    };

    const videoReducer = (state, id, seconds, video) => {
        let player = { ...state };
        let playerVideos = { ...player.videos };

        if (video) {
            player.playbackVideoID = id;
            playerVideos[id] = { video };
        }

        if (seconds > 1) {
            playerVideos[id].seconds = seconds;
        }

        player.videos = playerVideos;

        return player;
    };

    const collectionReducer = (state, videos, token) => {
        let player = { ...state };
        let playerVideos = { ...player.videos };

        if (token) {
            player.token = token;
        }

        if (videos) {
            for (let video of videos) {
                playerVideos[video.id] = { video };
            }
        }

        player.videos = playerVideos;

        return player;
    }

    const playerReducer = (state, action) => {
        switch (action.type) {
            case "INIT":
                return initReducer(state, action.config);
            case "HOME":
                return collectionReducer(state, action.videos, action.token);
            case "VIDEO":
                return videoReducer(state, action.id, action.seconds, action.video, action.showPlayback);
        }
    }

    return useReducer(playerReducer, state);
};

export default useVideo;