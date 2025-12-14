import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFavorites } from '@/hooks/useFavorites';
import { recipes } from '@/data/recipes';

const Index = () => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = difficultyFilter === 'all' || recipe.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ['Основные блюда', 'Десерты', 'Салаты', 'Супы', 'Закуски'];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="ChefHat" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Вкусные Рецепты</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-primary font-semibold">Главная</a>
            <a href="#recipes" className="text-foreground hover:text-primary transition-colors">Рецепты</a>
            <a href="#categories" className="text-foreground hover:text-primary transition-colors">Категории</a>
            <a href="#tips" className="text-foreground hover:text-primary transition-colors">Советы</a>
            <a href="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }} className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <Icon name="Heart" size={18} />
              Избранное
            </a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptLTIyIDBjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0yMiAyMmMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6bS0yMiAwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMjIgMjJjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0tMjIgMGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative text-center space-y-6 px-4 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Создавайте кулинарные шедевры
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Тысячи проверенных рецептов для любого случая. От простых ужинов до праздничных блюд.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Исследовать рецепты
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section id="recipes" className="container mx-auto px-4 py-16">
        <div className="mb-8 space-y-4">
          <h3 className="text-3xl font-bold">Найди свой рецепт</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по названию, ингредиентам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Сложность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сложность</SelectItem>
                <SelectItem value="Легко">Легко</SelectItem>
                <SelectItem value="Средне">Средне</SelectItem>
                <SelectItem value="Сложно">Сложно</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
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
                    className={`rounded-full shadow-lg transition-all ${
                      isFavorite(recipe.id) 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-card/90 hover:bg-card'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={20} 
                      fill={isFavorite(recipe.id) ? 'currentColor' : 'none'}
                    />
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

        {filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-2xl font-bold mb-2">Ничего не найдено</h4>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>

      <section id="categories" className="bg-secondary/50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Категории рецептов</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant="outline"
                className="h-auto py-6 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon name="Utensils" size={32} />
                <span className="font-semibold">{category}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section id="tips" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold mb-8 text-center">Полезные советы</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'Thermometer', title: 'Температурный режим', tip: 'Всегда разогревайте духовку заранее для равномерного приготовления' },
            { icon: 'Timer', title: 'Правильный тайминг', tip: 'Используйте таймер, чтобы не передержать блюдо' },
            { icon: 'Sparkles', title: 'Свежие ингредиенты', tip: 'Качество продуктов — залог вкусного блюда' }
          ].map((item, index) => (
            <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <Icon name={item.icon} size={48} className="mx-auto text-primary mb-4" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.tip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-card border-t border-border py-12">
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
                <li><a href="#" className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#recipes" className="hover:text-primary transition-colors">Рецепты</a></li>
                <li><a href="#categories" className="hover:text-primary transition-colors">Категории</a></li>
                <li><a href="#tips" className="hover:text-primary transition-colors">Советы</a></li>
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

export default Index;