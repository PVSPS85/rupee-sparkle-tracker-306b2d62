import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Search, ExternalLink, GraduationCap, TrendingUp, PiggyBank, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  category: 'basics' | 'banking' | 'trading' | 'savings';
}

const categories = [
  { id: 'all', label: 'All', icon: GraduationCap },
  { id: 'basics', label: 'Basics', icon: GraduationCap },
  { id: 'banking', label: 'Banking', icon: Landmark },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
];

const curatedVideos: Video[] = [
  {
    id: 'HQzoZfc3GwQ',
    title: 'Beginners Guide to Personal Finance',
    channel: 'Graham Stephan',
    thumbnail: 'https://img.youtube.com/vi/HQzoZfc3GwQ/mqdefault.jpg',
    category: 'basics',
  },
  {
    id: 'p7HKvqRI_Bo',
    title: 'How The Stock Market Works',
    channel: 'ClearValue Tax',
    thumbnail: 'https://img.youtube.com/vi/p7HKvqRI_Bo/mqdefault.jpg',
    category: 'trading',
  },
  {
    id: 'PHe0bXAIuk0',
    title: 'How The Economic Machine Works',
    channel: 'Ray Dalio',
    thumbnail: 'https://img.youtube.com/vi/PHe0bXAIuk0/mqdefault.jpg',
    category: 'banking',
  },
  {
    id: '8YFSdgY5O_0',
    title: '50/30/20 Budget Rule Explained',
    channel: 'Two Cents',
    thumbnail: 'https://img.youtube.com/vi/8YFSdgY5O_0/mqdefault.jpg',
    category: 'basics',
  },
  {
    id: 'jj1s6Yx-3M0',
    title: 'How to Save Money (7 Money Saving Tips)',
    channel: 'Practical Wisdom',
    thumbnail: 'https://img.youtube.com/vi/jj1s6Yx-3M0/mqdefault.jpg',
    category: 'savings',
  },
  {
    id: 'Xn7KWR9EOGQ',
    title: 'Trading for Beginners - Full Course',
    channel: 'Rayner Teo',
    thumbnail: 'https://img.youtube.com/vi/Xn7KWR9EOGQ/mqdefault.jpg',
    category: 'trading',
  },
  {
    id: 'qIw-yFC-HNU',
    title: 'How Banks Create Money',
    channel: 'Economics Explained',
    thumbnail: 'https://img.youtube.com/vi/qIw-yFC-HNU/mqdefault.jpg',
    category: 'banking',
  },
  {
    id: 'eikbQPldhPY',
    title: 'Money Management Tips for Students',
    channel: 'Thomas Frank',
    thumbnail: 'https://img.youtube.com/vi/eikbQPldhPY/mqdefault.jpg',
    category: 'savings',
  },
];

export const LearningHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const filteredVideos = curatedVideos.filter(video => {
    if (selectedCategory !== 'all' && video.category !== selectedCategory) return false;
    if (searchQuery && !video.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleYouTubeSearch = () => {
    if (searchQuery.trim()) {
      const query = encodeURIComponent(`${searchQuery} finance budget money`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleYouTubeSearch();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('video-scroll-container');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <Card className="glass-card border-border/50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-display">Learning Hub</CardTitle>
              <p className="text-sm text-muted-foreground">Master your finances with expert videos</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search videos..."
                className="pl-9 bg-muted/50 border-border/50"
              />
            </div>
            <Button 
              variant="neonOutline" 
              size="icon"
              onClick={handleYouTubeSearch}
              title="Search on YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                    : 'bg-muted/50 text-muted-foreground border border-transparent hover:border-border/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {category.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Video Modal */}
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <span className="text-lg">✕</span>
            </button>
          </motion.div>
        )}

        {/* Video Grid with Scroll */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border/50 flex items-center justify-center hover:bg-muted transition-colors hidden sm:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div
            id="video-scroll-container"
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[280px] group cursor-pointer"
                onClick={() => setPlayingVideo(video.id)}
              >
                <div className="relative rounded-xl overflow-hidden mb-2">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <Badge 
                    className="absolute top-2 right-2 bg-background/80 text-foreground text-[10px] capitalize"
                  >
                    {video.category}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-neon-cyan transition-colors">
                  {video.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
              </motion.div>
            ))}

            {/* Search More Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: filteredVideos.length * 0.05 }}
              className="flex-shrink-0 w-[280px] cursor-pointer"
              onClick={handleYouTubeSearch}
            >
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-2 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors">
                <Search className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Search more on YouTube</span>
              </div>
            </motion.div>
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background/90 border border-border/50 flex items-center justify-center hover:bg-muted transition-colors hidden sm:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['Stock Market Basics', 'Mutual Funds India', 'SIP Investment', 'Tax Saving Tips', 'Credit Score'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  const query = encodeURIComponent(term);
                  window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                }}
                className="px-3 py-1 text-xs rounded-full bg-muted/50 hover:bg-neon-cyan/10 hover:text-neon-cyan border border-border/50 hover:border-neon-cyan/30 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
