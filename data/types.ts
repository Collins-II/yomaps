export type Track = {
  id: number;
  title: string;
  artist: string;
  src: string; // public MP3/stream URL
  cover?: string;
  duration?: number; // seconds (optional; will auto-read when loaded)
};

export type YTStat = {
  videoId: string;
  title?: string;
  channelTitle?: string;
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
};