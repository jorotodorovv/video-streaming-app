import { useCallback, useEffect, useState } from 'react';

import YoutubeRouter from '../routers/YoutubeRouter';

import YoutubeApi from '../../api/youtube/youtube.ts';
import ProviderConfigurations from '../../api/youtube/config.ts';
import VideoProvider from '../../context/video-context';
import WebTorrent from 'webtorrent';

const TorrentProvider = () => {
    const client = new WebTorrent();

    let dependencies = { client };

    return (
        <VideoProvider>
            <TorrentRouter index={"/torrent"} dependencies={dependencies} />
        </VideoProvider>
    );
};

export default TorrentProvider;