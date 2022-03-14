import Text from "../../helpers/basic/Text.ts";
import VideoConfigurations from "./config.ts";

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

interface VideoParameters {
    videosPerRequest: number;
    maxTitleLength: number;
    maxDescriptionLength: number;
}

class YoutubeVideosApi {
    private config: VideoConfigurations;
    private parameters: VideoParameters;

    constructor(config: VideoConfigurations, parameters: VideoParameters) {
        this.config = config;
        this.parameters = parameters;
    }

    public async getVideo(id: string): Promise<Video> {
        let url = this.getUrl(this.parameters.videosPerRequest);
        url.searchParams.append("id", id);

        let response = await this.request(url);

        return response.videos[0];
    }

    public async getVideos(pageToken: string): Promise<VideoResponse> {
        if (pageToken) {
            let url = this.getUrl(this.parameters.videosPerRequest);

            if (pageToken && pageToken !== this.config.initialToken) {
                url.searchParams.append("pageToken", pageToken);
            }

            url.searchParams.append("chart", "mostPopular");

            return await this.request(url);
        }
    }

    private async request(url: URL): Promise<VideoResponse> {
        let response: Response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            let videos = this.map(result.items);

            return { videos, token: result.nextPageToken };
        }

        throw response.statusText;
    }

    private map(items: any[]): Video[] {
        return items.map(v => {
            let title: string = new Text(v.snippet.title);
            let description: string = new Text(v.snippet.description);

            return {
                id: v.id,
                title: title.substring(this.parameters.maxTitleLength),
                description: description.substring(this.parameters.maxDescriptionLength),
                image: v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.medium,
                views: (+v.statistics.viewCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                likes: (+v.statistics.likeCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
            };
        });
    }

    private getUrl(videosPerRequest: number): URL {
        const url = new URL(this.config.url);
        url.pathname += this.config.paths.v;

        url.searchParams.append("key", this.config.key);
        url.searchParams.append("part", "snippet, statistics");
        url.searchParams.append("maxResults", videosPerRequest.toString());

        return url;
    }
}

export default YoutubeVideosApi;