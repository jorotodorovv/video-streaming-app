import { useReducer } from "react";

const useVideo = (state) => {
    const videoHandler = (state, id, seconds, video, showPlayback) => {
        if (!id) return;

        let player = { ...state };

        if (showPlayback) {
            player.playbackVideoId = id;
        }

        if (!player.videos[id] && video) {
            player.videos[id] = { video };
        }

        if (seconds > 1) {
            player.videos[id].seconds = seconds;
        }

        return player;
    };

    const homeHandler = (state, videos, token) => {
        let player = { ...state };

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
            case "HOME":
                return homeHandler(state, action.videos, action.token);
            case "VIDEO":
                return videoHandler(state, action.id, action.seconds, action.video, action.showPlayback);
        }
    }

    return useReducer(playerReducer, state);
};

export default useVideo;