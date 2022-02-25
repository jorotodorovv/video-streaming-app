const API_URL = "https://www.googleapis.com";
const API_KEY = "AIzaSyB4aoIu0cWWAPQMzaFFIe0fJVInHRJES6M";

const VIDEOS_PATH_NAME = "youtube/v3/videos";

interface VideoConfigurations {
    videosPerRequest: number,
    maxTitleLength: number,
    maxDescriptionLength: number
}

class YoutubeVideosApi {
    private url: URL;
    private config: VideoConfigurations;
    constructor(config: VideoConfigurations) {
        this.url = this.getUrl(config.videosPerRequest)
        this.config = config;
    }

    public async getVideos(pageToken) {
        if (pageToken) {
            this.url.searchParams.append("pageToken", pageToken);
        }

        let response = await fetch(this.url.toString());

        if (response.ok) {
            return await response.json();
        }
    }

    private getUrl(videosPerRequest: number): URL {
        const url = new URL(API_URL);
        url.pathname = VIDEOS_PATH_NAME;

        url.searchParams.append("key", API_KEY);
        url.searchParams.append("part", "snippet");
        url.searchParams.append("maxResults", videosPerRequest.toString());
        url.searchParams.append("chart", "mostPopular");

        return url;
    }
}

export default YoutubeVideosApi;