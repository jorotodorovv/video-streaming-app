import Text from "../helpers/basic/Text.ts";

const BASE_URL = "https://www.youtube.com";

const API_URL = "https://www.googleapis.com";
const API_KEY = "AIzaSyB4aoIu0cWWAPQMzaFFIe0fJVInHRJES6M";

const VERSION_PATH = "youtube/v3";
const VIDEOS_PATH_NAME = "videos";

const INITIAL_TOKEN_VALUE = "INITIAL_TOKEN";

interface VideoConfigurations {
    videosPerRequest: number,
    maxTitleLength: number,
    maxDescriptionLength: number
}

interface Video {
    id: number,
    title: string,
    description: string
    image: string
}

interface VideoResponse {
    videos: Video[],
    token: string
}

class YoutubeEmbeded {
    private id: string;
    private hasAutoplay: boolean;
    private player;
    constructor(id: string, hasAutoplay: boolean = true) {
        this.id = id;
        this.hasAutoplay = hasAutoplay;

        this.load();
    }

    public exportUrl(seconds: number = 0) {
        let autoplay: number = this.hasAutoplay ? 1 : 0;

        return `${BASE_URL}/embed/${this.id}?autoplay=${autoplay}&fs=0&start=${seconds}&modestbranding=1&rel=0`;
    }

    private load = () => {
        if (!window["YT"]) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else {
            this.loadVideo();
        }
    }

    private loadVideo = () => {
        this.player = new window["YT"].Player(this.id, {
            videoId: this.id
        });
    };
}

class YoutubeVideosApi {
    private config: VideoConfigurations;
    constructor(config: VideoConfigurations) {
        this.config = config;
    }

    public async getVideo(id: string) {
        let url = this.getUrl(this.config.videosPerRequest);

        url.searchParams.append("id", id);

        let response: Response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            let videos = this.map(result.items);

            return videos[0];
        }
    }

    public async getVideos(pageToken: string): Promise<VideoResponse> {
        if (!pageToken) return;

        let url = this.getUrl(this.config.videosPerRequest);

        if (pageToken && pageToken !== INITIAL_TOKEN_VALUE) {
            url.searchParams.append("pageToken", pageToken);
        }

        url.searchParams.append("chart", "mostPopular");

        let response: Response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            let videos = this.map(result.items);

            return { videos, token: result.nextPageToken };
        }
    }

    private map(items: any[]): Video[] {
        return items.map(v => {
            let title: string = new Text(v.snippet.title);
            let description: string = new Text(v.snippet.description);

            return {
                id: v.id,
                title: title.substring(this.config.maxTitleLength),
                description: description.substring(this.config.maxDescriptionLength),
                image: v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.medium,
                views: (+v.statistics.viewCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                likes: (+v.statistics.likeCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
            };
        });
    }

    private getUrl(videosPerRequest: number): URL {
        const url = new URL(API_URL);
        url.pathname = VERSION_PATH + "/" + VIDEOS_PATH_NAME;

        url.searchParams.append("key", API_KEY);
        url.searchParams.append("part", "snippet, statistics");
        url.searchParams.append("maxResults", videosPerRequest.toString());

        return url;
    }
}

export { INITIAL_TOKEN_VALUE, YoutubeEmbeded };
export default YoutubeVideosApi;