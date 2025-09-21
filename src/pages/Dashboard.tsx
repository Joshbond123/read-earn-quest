import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Coins, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Newspaper,
  ChevronRight,
  Award,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Profile {
  points: number;
  articles_read_today: number;
  total_articles_read: number;
  plan_type: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  image_url: string;
  published_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchArticles();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('points, articles_read_today, total_articles_read, plan_type')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to load profile data',
        variant: 'destructive',
      });
    }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, summary, category, image_url, published_at')
        .order('published_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const usdtEquivalent = profile ? (profile.points / 1000).toFixed(2) : '0.00';
  const maxDailyArticles = profile?.plan_type === 'premium' ? 100 : 50;

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Read2Earn
          </h1>
          <p className="text-muted-foreground">Earn money by reading news</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Points
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-primary">
                {profile?.points || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                ≈ ${usdtEquivalent} USDT
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">
                {profile?.articles_read_today || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                of {maxDailyArticles} articles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/withdraw')}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
              <h3 className="font-semibold">Withdraw</h3>
              <p className="text-xs text-muted-foreground">Cash out earnings</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/profile')}>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Upgrade</h3>
              <p className="text-xs text-muted-foreground">Premium plan</p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Articles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest News</h2>
            <Badge variant="secondary" className="text-xs">
              {articles.length} articles
            </Badge>
          </div>

          {articles.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No articles available</h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for new articles to read and earn points.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => (
                <Card 
                  key={article.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/article/${article.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {article.image_url && (
                        <img
                          src={article.image_url}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Coins className="h-3 w-3 mr-1" />
                            +10 points
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;