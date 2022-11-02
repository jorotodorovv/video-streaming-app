import VideoConfigurations, { ProviderParams } from "../config";

interface Video {
    videoId: string,
    title: string,
    description: string,
    image: string,
    views: string,
    likes: string
}

interface VideoResponse {
    videos: Video[],
    token: string
}

class YoutubeApi {
    private config: VideoConfigurations;

    constructor(config: VideoConfigurations, parameters?: ProviderParams) {
        this.config = config;
        this.params = parameters;
    }

    private set params(parameters: ProviderParams) {
        if (parameters) {
            this.config.params = parameters;
        }
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
        let url = this.getUrl(this.config.paths.i);

        url.searchParams.append("playlistId", playlistId);
        url.searchParams.append("part", "snippet, contentDetails");

        this.setToken(url, pageToken);

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

    public async getVideos(pageToken: string | null = null): Promise<VideoResponse> {
        let url = this.getUrl(this.config.paths.v);

        url.searchParams.append("part", "snippet, statistics");
        url.searchParams.append("chart", "mostPopular");

        this.setToken(url, pageToken);

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
        return items
            .filter(v => v !== undefined)
            .map(v => {
                return {
                    videoId: v.id.videoId ?? v.id,
                    title: v.snippet.title,
                    description: v.snippet.description,
                    image: (v.snippet.thumbnails.maxres ?? v.snippet.thumbnails.medium).url,
                    views: (+v.statistics.viewCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                    likes: (+v.statistics.likeCount).toLocaleString("en-US", { minimumIntegerDigits: 3 }),
                };
            });
    }

    private getUrl(pathName: string): URL {
        const url = new URL(this.config.url + "/" + this.config.version);
        url.pathname += pathName;

        url.searchParams.append("key", this.config.key);
        url.searchParams.append("maxResults", this.config.params.videosPerRequest.toString());

        return url;
    }

    private setToken(url: URL, pageToken: string) {
        if (pageToken && pageToken != this.config.query.initialToken) {
            url.searchParams.append("pageToken", pageToken);
        }
    }
}

export {
    Video,
    VideoResponse,
};

export default YoutubeApi;