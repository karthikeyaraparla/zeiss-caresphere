import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, TrendingUp, Eye, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { mockKnowledgeArticles } from '@/lib/mock-data';

const categories = ['All', 'Microscopy', 'Semiconductor', 'Ophthalmology', 'Research Systems', 'Industrial Metrology'];

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = mockKnowledgeArticles.filter(a =>
    (category === 'All' || a.category === category) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) ||
     a.tags.some(t => t.includes(search.toLowerCase())))
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Knowledge Base"
        subtitle="Technical guides, troubleshooting articles, and best practices"
        icon={<BookOpen className="size-5" />}
      />

      {/* Search */}
      <div className="max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search articles, guides, procedures..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 text-base"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <Badge
            key={cat}
            variant={category === cat ? 'default' : 'outline'}
            className="cursor-pointer px-3 py-1"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-sm">
        {[
          { label: 'Articles', value: mockKnowledgeArticles.length },
          { label: 'Categories', value: 5 },
          { label: 'Avg. Rating', value: '90%' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="pt-4 pb-3 text-center">
                <p className="text-xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Articles */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-6" />}
          title="No articles found"
          description="Try a different search term or category."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
            >
              <Card className="cursor-pointer hover:shadow-premium hover:border-primary/30 transition-all duration-200 h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <Badge variant="secondary" className="text-xs mb-2">{article.category}</Badge>
                      <h3 className="text-sm font-semibold text-foreground leading-snug mb-2">{article.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {article.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Eye className="size-3" /> {article.views.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><TrendingUp className="size-3" /> {article.helpful}% helpful</span>
                        <span>{article.author}</span>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
