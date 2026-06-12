import { useState, useEffect, useRef, useCallback } from "react";
import { hindiSongs, Song } from "../data/music";
import { SkipBack, SkipForward, Play, Pause, Volume2, VolumeX, Music2, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  const currentSong: Song = hindiSongs[currentIndex];

  const loadPlayer = useCallback((videoId: string) => {
    if (!readyRef.current || !window.YT) return;
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
    } else {
      playerRef.current = new window.YT.Player("yt-player-container", {
        height: "1",
        width: "1",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
          mute: 0,
        },
        events: {
          onReady: (e: any) => {
            e.target.setVolume(60);
            e.target.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              goNext();
            }
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }
            if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            goNext();
          },
        },
      });
    }
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % hindiSongs.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + hindiSongs.length) % hindiSongs.length);
  }, []);

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      readyRef.current = true;
      setIsReady(true);
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      readyRef.current = true;
      setIsReady(true);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    loadPlayer(currentSong.youtubeId);
  }, [isReady, currentIndex]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted((m) => !m);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div id="yt-player-container" ref={containerRef} className="hidden" />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="rounded-2xl overflow-hidden border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.15)]"
        style={{ minWidth: 260 }}
      >
        <button
          onClick={() => setIsExpanded((e) => !e)}
          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Music2 size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Hindi Hits</span>
          </div>
          {isExpanded ? <ChevronDown size={14} className="text-muted-foreground" /> : <ChevronUp size={14} className="text-muted-foreground" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="mb-3">
                  <p className="text-sm font-bold text-foreground truncate leading-tight">{currentSong.title}</p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{currentSong.artist}</p>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <button
                    onClick={goPrev}
                    className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-prev-song"
                  >
                    <SkipBack size={16} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-shadow"
                    data-testid="button-play-pause"
                  >
                    {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button
                    onClick={goNext}
                    className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-next-song"
                  >
                    <SkipForward size={16} />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-toggle-mute"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>

                <div className="mt-3 flex gap-1">
                  {hindiSongs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                        i === currentIndex ? "bg-primary shadow-[0_0_6px_rgba(0,255,255,0.8)]" : "bg-white/15 hover:bg-white/30"
                      }`}
                      data-testid={`button-song-dot-${i}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
