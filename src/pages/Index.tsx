import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, BookOpen, TrendingUp, Shield, Users, Globe } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Coins,
      title: 'Earn Points',
      description: 'Get 10 points for every article you read'
    },
    {
      icon: TrendingUp,
      title: 'Convert to USDT',
      description: '1000 points = 1 USDT'
    },
    {
      icon: BookOpen,
      title: 'Quality News',
      description: 'Read latest news from trusted sources'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and reliable withdrawal system'
    },
    {
      icon: Users,
      title: 'Referral Bonus',
      description: 'Earn extra by referring friends'
    },
    {
      icon: Globe,
      title: 'Global Content',
      description: 'News from around the world'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-4 py-16 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">
            Read2Earn
          </h1>
          <p className="text-xl mb-2 opacity-90">
            Turn Your Reading Into Earnings
          </p>
          <p className="text-sm opacity-75 mb-8 max-w-md mx-auto">
            Join thousands of users earning money by reading news and staying informed
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="w-full max-w-xs bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              Start Earning Now
            </Button>
            <p className="text-xs opacity-75">
              Free to join • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 py-8 bg-card/50">
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
          <div>
            <div className="text-2xl font-bold text-primary">10+</div>
            <div className="text-xs text-muted-foreground">Points per article</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">$5</div>
            <div className="text-xs text-muted-foreground">Minimum withdrawal</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">50</div>
            <div className="text-xs text-muted-foreground">Daily articles</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-8 bg-muted/30">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-xl">Ready to Start Earning?</CardTitle>
            <CardDescription>
              Join our community and start earning money by reading news today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full"
              size="lg"
            >
              Create Free Account
            </Button>
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-primary"
                onClick={() => navigate('/auth')}
              >
                Sign in here
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
