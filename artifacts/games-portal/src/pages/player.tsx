import { useParams, Link } from "wouter";
import { games } from "../data/games";
import { ArrowLeft, Maximize2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useEffect } from "react";

export default function Player() {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === gameId);
  const { playLaunch, playClick } = useSoundEffects();

  useEffect(() => {
    if (game) playLaunch();
  }, [game?.id]);

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Arcade
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
      <header className="h-14 shrink-0 border-b border-white/10 bg-card flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full border-white/10 hover:bg-white/10 hover:text-primary"
              onClick={playClick}
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-lg">{game.title}</h1>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {game.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hidden sm:flex"
            onClick={() => { playClick(); window.open(game.url, "_blank"); }}
            data-testid="button-open-new-tab"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in new tab
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_10px_rgba(0,255,255,0.2)]"
            onClick={() => {
              playClick();
              const iframe = document.getElementById("game-iframe");
              if (iframe && iframe.requestFullscreen) {
                iframe.requestFullscreen();
              }
            }}
            data-testid="button-fullscreen"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            Fullscreen
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full relative bg-black">
        <iframe
          id="game-iframe"
          src={game.url}
          className="absolute inset-0 w-full h-full border-none"
          title={game.title}
          allow="autoplay; fullscreen; focus-without-user-activation *; sync-xhr"
          allowFullScreen
          loading="lazy"
        />
      </main>
    </div>
  );
}
