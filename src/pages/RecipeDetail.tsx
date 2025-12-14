import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно';
  time: string;
  category: string;
  servings: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tips: string[];
  nutrition: { calories: string; protein: string; carbs: string; fat: string };
}

const recipesData: Record<number, Recipe> = {
  1: {
    id: 1,
    title: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом, яйцами и пармезаном',
    image: 'https://cdn.poehali.dev/projects/5c54ec9d-f353-466c-af15-0987e3f6900c/files/a6ba2e11-c745-440f-9073-818a72dcb717.jpg',
    difficulty: 'Средне',
    time: '30 мин',
    category: 'Основные блюда',
    servings: 4,
    ingredients: [
      { name: 'Спагетти', amount: '400 г' },
      { name: 'Бекон', amount: '200 г' },
      { name: 'Яйца', amount: '4 шт' },
      { name: 'Пармезан', amount: '100 г' },
      { name: 'Чеснок', amount: '2 зубчика' },
      { name: 'Соль', amount: 'по вкусу' },
      { name: 'Черный перец', amount: 'по вкусу' }
    ],
    steps: [
      'Отварите спагетти в подсоленной воде согласно инструкции на упаковке до состояния al dente',
      'Нарежьте бекон небольшими кусочками и обжарьте на сковороде до хрустящей корочки',
      'Добавьте измельченный чеснок к бекону и обжаривайте 1 минуту',
      'В отдельной миске взбейте яйца с тертым пармезаном и черным перцем',
      'Слейте воду с пасты, оставив немного жидкости от варки',
      'Быстро смешайте горячую пасту с яичной смесью, постоянно помешивая',
      'Добавьте бекон с чесноком, перемешайте. При необходимости добавьте воду от варки',
      'Подавайте немедленно, посыпав дополнительным пармезаном'
    ],
    tips: [
      'Используйте свежие яйца комнатной температуры для более кремовой текстуры',
      'Не перегревайте яичную смесь, иначе она свернется',
      'Традиционно используется гуанчале, но можно заменить на бекон или панчетту'
    ],
    nutrition: {
      calories: '650 ккал',
      protein: '28 г',
      carbs: '75 г',
      fat: '24 г'
    }
  },
  2: {
    id: 2,
    title: 'Шоколадный торт',
    description: 'Нежный многослойный торт с шоколадным кремом и ягодами',
    image: 'https://cdn.poehali.dev/projects/5c54ec9d-f353-466c-af15-0987e3f6900c/files/2e74020d-ade9-4215-9e32-91a098aa2f44.jpg',
    difficulty: 'Сложно',
    time: '2 часа',
    category: 'Десерты',
    servings: 8,
    ingredients: [
      { name: 'Мука', amount: '300 г' },
      { name: 'Какао-порошок', amount: '80 г' },
      { name: 'Яйца', amount: '6 шт' },
      { name: 'Сахар', amount: '250 г' },
      { name: 'Сливочное масло', amount: '200 г' },
      { name: 'Разрыхлитель', amount: '2 ч.л.' },
      { name: 'Молоко', amount: '200 мл' },
      { name: 'Темный шоколад', amount: '300 г' },
      { name: 'Сливки 33%', amount: '400 мл' },
      { name: 'Свежие ягоды', amount: '200 г' }
    ],
    steps: [
      'Разогрейте духовку до 180°C. Подготовьте две формы диаметром 20 см',
      'Взбейте яйца с сахаром до пышной массы (около 5-7 минут)',
      'Просейте муку, какао и разрыхлитель, аккуратно добавьте к яичной массе',
      'Растопите масло, смешайте с молоком и добавьте в тесто',
      'Разделите тесто между формами и выпекайте 25-30 минут',
      'Для крема: растопите шоколад, взбейте сливки до устойчивых пиков',
      'Смешайте теплый шоколад со взбитыми сливками аккуратными движениями',
      'Остывшие коржи разрежьте пополам, пропитайте сиропом',
      'Соберите торт, смазывая каждый слой кремом',
      'Украсьте торт оставшимся кремом и свежими ягодами',
      'Охладите в холодильнике минимум 2 часа перед подачей'
    ],
    tips: [
      'Используйте качественный темный шоколад с содержанием какао не менее 70%',
      'Коржи получатся более влажными, если пропитать их кофейным сиропом',
      'Торт можно приготовить за день до подачи - он станет еще вкуснее'
    ],
    nutrition: {
      calories: '520 ккал',
      protein: '8 г',
      carbs: '62 г',
      fat: '28 г'
    }
  },
  3: {
    id: 3,
    title: 'Салат Цезарь',
    description: 'Свежий салат с курицей, сухариками и соусом Цезарь',
    image: 'https://cdn.poehali.dev/projects/5c54ec9d-f353-466c-af15-0987e3f6900c/files/435521f0-8e96-49dd-aac4-68f8bb924ff6.jpg',
    difficulty: 'Легко',
    time: '20 мин',
    category: 'Салаты',
    servings: 2,
    ingredients: [
      { name: 'Салат Романо', amount: '1 кочан' },
      { name: 'Куриное филе', amount: '300 г' },
      { name: 'Пармезан', amount: '80 г' },
      { name: 'Белый хлеб', amount: '150 г' },
      { name: 'Чеснок', amount: '3 зубчика' },
      { name: 'Оливковое масло', amount: '100 мл' },
      { name: 'Майонез', amount: '100 г' },
      { name: 'Анчоусы', amount: '4 шт' },
      { name: 'Лимонный сок', amount: '2 ст.л.' },
      { name: 'Горчица', amount: '1 ч.л.' }
    ],
    steps: [
      'Обжарьте куриное филе с солью и перцем до готовности, нарежьте полосками',
      'Нарежьте хлеб кубиками, смешайте с оливковым маслом и измельченным чесноком',
      'Обжарьте хлебные кубики в духовке при 180°C до золотистого цвета (10 минут)',
      'Для соуса: смешайте майонез, измельченные анчоусы, лимонный сок, горчицу',
      'Добавьте тертый пармезан (половину) и измельченный чеснок в соус',
      'Порвите салат руками на крупные кусочки',
      'Смешайте салат с соусом Цезарь',
      'Добавьте курицу, сухарики и оставшийся пармезан',
      'Аккуратно перемешайте и сразу подавайте'
    ],
    tips: [
      'Салат Романо можно заменить на айсберг или листовой салат',
      'Для вегетарианского варианта замените курицу на тофу или нут',
      'Соус лучше готовить непосредственно перед подачей'
    ],
    nutrition: {
      calories: '420 ккал',
      protein: '32 г',
      carbs: '28 г',
      fat: '22 г'
    }
  }
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipesData[Number(id)];

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon name="ChefHat" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Рецепт не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться к рецептам</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <Icon name="ArrowLeft" size={20} />
            Назад к рецептам
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Share2" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Heart" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                {recipe.category}
              </Badge>
              <Badge 
                variant={recipe.difficulty === 'Легко' ? 'default' : recipe.difficulty === 'Средне' ? 'secondary' : 'destructive'}
              >
                {recipe.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
              {recipe.title}
            </h1>
            <p className="text-xl text-white/90 animate-fade-in">
              {recipe.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Icon name="Clock" size={24} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Время</p>
                <p className="font-semibold">{recipe.time}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Icon name="Users" size={24} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Порции</p>
                <p className="font-semibold">{recipe.servings} персоны</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Icon name="Flame" size={24} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Калории</p>
                <p className="font-semibold">{recipe.nutrition.calories}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Icon name="ChefHat" size={24} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Уровень</p>
                <p className="font-semibold">{recipe.difficulty}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} className="text-primary" />
                  Ингредиенты
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-muted-foreground ml-2">{ingredient.amount}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <h3 className="text-xl font-bold mb-4">Пищевая ценность</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Белки</p>
                    <p className="font-semibold">{recipe.nutrition.protein}</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Жиры</p>
                    <p className="font-semibold">{recipe.nutrition.fat}</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Углеводы</p>
                    <p className="font-semibold">{recipe.nutrition.carbs}</p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Калории</p>
                    <p className="font-semibold">{recipe.nutrition.calories}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="ListOrdered" size={24} className="text-primary" />
                  Пошаговое приготовление
                </h2>
                <div className="space-y-6">
                  {recipe.steps.map((step, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-foreground leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="bg-accent/50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Lightbulb" size={24} className="text-primary" />
                    Полезные советы
                  </h3>
                  <ul className="space-y-3">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="Star" size={18} className="text-primary mt-1 flex-shrink-0" />
                        <p className="text-foreground">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1">
            <Icon name="Printer" size={20} className="mr-2" />
            Распечатать рецепт
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            <Icon name="Download" size={20} className="mr-2" />
            Скачать PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
