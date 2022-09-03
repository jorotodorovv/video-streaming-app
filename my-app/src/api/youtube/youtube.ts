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

class YoutubeApi {
    private config: VideoConfigurations;
    private parameters: VideoParameters;

    constructor(config: VideoConfigurations, parameters: VideoParameters) {
        this.config = config;
        this.parameters = parameters;
    }

    get timeQueryParam() {
        return this.config.params.timeQuery;
    }

    public async getChannel(channelName: string) {
        let url = this.getUrl(this.config.paths.ch);

        url.searchParams.append("part", "snippet");
        url.searchParams.append("forUsername", channelName);

        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            if (result && result.items.length) {
                return result.items[0];
            }
        }
    }

    public async getPlaylists(channelId: string) {
        let url = this.getUrl(this.config.paths.p);

        url.searchParams.append("channelId", channelId);

        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            if (result && result.items.length) {
                return result.items;
            }
        }
    }

    public async getPlaylistVideos(playlistId: string, pageToken: string = null) {
        let url = this.getUrl(this.config.paths.i, this.parameters.videosPerRequest);

        url.searchParams.append("playlistId", playlistId);
        url.searchParams.append("part", "snippet, contentDetails");

        if (pageToken) {
            url.searchParams.append("pageToken", pageToken);
        }

        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            if (result && result.items.length) {
                return { items: result.items, token: result.nextPageToken };
            }
        }
    }

    public async getVideo(id: string): Promise<Video> {
        let url = this.getUrl(this.config.paths.v);

        url.searchParams.append("id", id);
        url.searchParams.append("part", "snippet, statistics");

        let response = await this.request(url);

        return response.videos[0];
    }

    public async getVideos(pageToken: string = null): Promise<VideoResponse> {
        let url = this.getUrl(this.config.paths.v, this.parameters.videosPerRequest);

        url.searchParams.append("part", "snippet, statistics");
        url.searchParams.append("chart", "mostPopular");

        if (pageToken) {
            url.searchParams.append("pageToken", pageToken);
        }

        return await this.request(url);
    }

    private async request(url: URL): Promise<VideoResponse> {
        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            let videos = this.map(result.items);

            return { videos, token: result.nextPageToken };
        }

        throw response.statusText;
    }

    private map(items: any[]): Video[] {
        return items.filter(v => v !== undefined)
        .map(v => {
            let title: string = new Text(v.snippet.title);
            let description: string = new Text(v.snippet.description);

            return {
                id: v.id.videoId ?? v.id,
                title: title.substring(this.parameters.maxTitleLength),
                description: description.substring(this.parameters.maxDescriptionLength),
                image: v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.medium,
                views: (+v.statistics.viewCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                likes: (+v.statistics.likeCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
            };
        });
    }

    private getUrl(pathName: string, videosPerRequest: number | null = null): URL {
        const url = new URL(this.config.url);
        url.pathname += pathName;

        url.searchParams.append("key", this.config.key);

        if (videosPerRequest) {
            url.searchParams.append("maxResults", videosPerRequest.toString());
        }

        return url;
    }
}

export default YoutubeApi;