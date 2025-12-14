import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useFavorites } from '@/hooks/useFavorites';
import { recipes } from '@/data/recipes';

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="ChefHat" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Вкусные Рецепты</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-foreground hover:text-primary transition-colors">Главная</a>
            <a href="/favorites" className="text-primary font-semibold">Избранное</a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/')}>
            <Icon name="Home" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative py-16 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Heart" size={64} className="mx-auto text-primary mb-4 animate-scale-in" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Избранные рецепты
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in">
            {favoriteRecipes.length > 0 
              ? `Сохранено ${favoriteRecipes.length} ${favoriteRecipes.length === 1 ? 'рецепт' : favoriteRecipes.length < 5 ? 'рецепта' : 'рецептов'}`
              : 'Здесь будут храниться ваши любимые рецепты'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe, index) => (
              <Card 
                key={recipe.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                    >
                      <Icon name="Heart" size={20} fill="currentColor" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {recipe.time}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{recipe.title}</CardTitle>
                    <Badge 
                      variant={recipe.difficulty === 'Легко' ? 'default' : recipe.difficulty === 'Средне' ? 'secondary' : 'destructive'}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{recipe.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.ingredients.slice(0, 3).map((ing, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {ing}
                      </Badge>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{recipe.ingredients.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                    Смотреть рецепт
                    <Icon name="ChefHat" size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-2xl font-bold mb-2">Пока нет избранных рецептов</h3>
            <p className="text-muted-foreground mb-6">
              Добавляйте рецепты в избранное, нажимая на иконку сердечка
            </p>
            <Button size="lg" onClick={() => navigate('/')}>
              <Icon name="Search" size={20} className="mr-2" />
              Найти рецепты
            </Button>
          </div>
        )}
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="ChefHat" size={32} className="text-primary" />
                <h4 className="text-xl font-bold">Вкусные Рецепты</h4>
              </div>
              <p className="text-muted-foreground">
                Ваш кулинарный помощник для создания вкусных блюд каждый день
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Навигация</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="/favorites" className="hover:text-primary transition-colors">Избранное</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Контакты</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@recipes.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Вкусные Рецепты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Favorites;
