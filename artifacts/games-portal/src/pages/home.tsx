import { useState } from "react";
import { games, GameCategory } from "../data/games";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Gamepad2, Play } from "lucide-react";
import { motion } from "framer-motion";

const categories: ("All" | GameCategory)[] = [
  "All",
  "Arcade",
  "Puzzle",
  "Strategy",
  "Idle",
  "Action",
  "Simulation"
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | GameCategory>("All");

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-background shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              <Gamepad2 size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">GameVault</span>
          </div>
          
          <div className="relative w-full max-w-sm hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="pl-9 bg-black/50 border-white/10 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-all rounded-full"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Mobile Search */}
        <div className="relative w-full mb-8 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games..."
            className="pl-9 bg-black/50 border-white/10 focus-visible:ring-primary rounded-full"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredGames.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredGames.map((game) => (
              <motion.div key={game.id} variants={item}>
                <Link href={`/play/${game.id}`}>
                  <div className="group relative rounded-xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] hover:-translate-y-1 cursor-pointer flex flex-col h-full">
                    <div className="aspect-video relative overflow-hidden bg-black/50">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                        <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur text-primary-foreground flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.6)]">
                          <Play size={24} className="ml-1" fill="currentColor" />
                        </div>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur hover:bg-black/80 text-xs font-semibold border-white/10">
                        {game.category}
                      </Badge>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{game.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">{game.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Gamepad2 className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No games found</h2>
            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
