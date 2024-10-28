import React, { useState } from 'react';
import { Copy, Facebook, Linkedin, X } from 'lucide-react';

import styles from './VideoShare.module.css';

const VideoShare = ({ onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
        }
    };

    const shareToSocial = (platform) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`,
            linkedin: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}`,
        };


        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.menu} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Share</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className={styles.linkSection}>
                    <input
                        type="text"
                        value={window.location.href}
                        readOnly
                        className={styles.linkInput}
                    />
                    <button
                        className={styles.copyButton}
                        onClick={handleCopyLink}
                    >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className={styles.socialButtons}>
                    <button
                        className={`${styles.socialButton} ${styles.facebook}`}
                        onClick={() => shareToSocial('facebook')}
                    >
                        <Facebook className="w-5 h-5" />
                    </button>
                    <button
                        className={`${styles.socialButton} ${styles.twitter}`}
                        onClick={() => shareToSocial('twitter')}
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <button
                        className={`${styles.socialButton} ${styles.linkedin}`}
                        onClick={() => shareToSocial('linkedin')}
                    >
                        <Linkedin className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoShare;