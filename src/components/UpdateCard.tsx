interface Update {
  id?: string | number;
  title: string;
  content: string;
  date: string;
  image_url?: string;
  // Add these to match what the home page is sending
  category?: string;
  summary?: string;
  images?: string[];
}

interface UpdateCardProps {
  update: Update;
  navigateOnClick?: boolean; // Add this line with the '?'
}

export function UpdateCard({ update, navigateOnClick }: UpdateCardProps) {
  // ... the rest of the code remains the same
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all group cursor-pointer">
      {/* Your existing card code */}
      <div className="p-6">
        <p className="text-sm text-blue-400 mb-2">{update.date}</p>
        <h3 className="text-xl font-bold text-white mb-3 font-[var(--font-audiowide)]">{update.title}</h3>
        <p className="text-white/60 line-clamp-3 mb-4">{update.content || update.summary}</p>
      </div>
    </div>
  );
}