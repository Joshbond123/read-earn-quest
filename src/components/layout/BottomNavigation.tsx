import { Home, Wallet, User, TrendingUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: TrendingUp, label: 'Withdraw', path: '/withdraw' },
  { icon: Wallet, label: 'Wallet', path: '/wallet' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};