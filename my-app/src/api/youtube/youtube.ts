import VideoConfigurations from "./config";

interface Video {
    id: number,
    title: string,
    description: string,
    image: string,
    views: string,
    likes: string,
    token: string
}

interface VideoResponse {
    videos: Video[],
    token: string
}

interface VideoParameters {
    videosPerRequest: number;
}

const INITIAL_VIDEO_TOKEN = "default";

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

    public async getSubscriptions(accessToken: string) {
        let url = this.getUrl(this.config.paths.subs);

        url.searchParams.append("part", "snippet");
        url.searchParams.append("mine", "true");
        url.searchParams.append("access_token", accessToken);

        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            if (result && result.items.length) {
                return result.items;
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

    public async getPlaylistVideos(playlistId: string, pageToken: string | null = null) {
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

    public async getVideo(id: string, pageToken: string): Promise<Video> {
        let url = this.getUrl(this.config.paths.v, this.parameters.videosPerRequest);

        url.searchParams.append("id", id);
        url.searchParams.append("part", "snippet, statistics");

        let response = await this.request(url, pageToken);

        return response.videos[0];
    }

    public async getVideos(pageToken: string): Promise<VideoResponse> {
        let url = this.getUrl(this.config.paths.v, this.parameters.videosPerRequest);

        url.searchParams.append("part", "snippet, statistics");
        url.searchParams.append("chart", "mostPopular");

        if (pageToken) {
            url.searchParams.append("pageToken", pageToken);
        }

        return await this.request(url, pageToken);
    }

    private async request(url: URL, token: string): Promise<VideoResponse> {
        let response = await fetch(url.toString());

        if (response.ok) {
            let result = await response.json();

            let videos = this.map(result.items, token);

            return { videos, token: result.nextPageToken };
        }

        throw response.statusText;
    }

    private map(items: any[], pageToken: string): Video[] {
        return items
            .filter(v => v !== undefined)
            .map(v => {
                return {
                    id: v.id.videoId ?? v.id,
                    title: v.snippet.title,
                    description: v.snippet.description,
                    image: v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.medium,
                    views: (+v.statistics.viewCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                    likes: (+v.statistics.likeCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                    token: pageToken ?? INITIAL_VIDEO_TOKEN,
                };
            });
    }

    private getUrl(pathName: string, videosPerRequest: number | null = null): URL {
        const url = new URL(this.config.url + "/" + this.config.version);
        url.pathname += pathName;

        url.searchParams.append("key", this.config.key);

        if (videosPerRequest) {
            url.searchParams.append("maxResults", videosPerRequest.toString());
        }

        return url;
    }
}

export default YoutubeApi;