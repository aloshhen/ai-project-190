import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Award, Shield, Truck, Phone, Mail, MapPin, Clock, Menu, X, Star, Package, Send, CheckCircle, ShoppingBag, Heart, Zap } from 'lucide-react'

// Universal Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Ошибка сети. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Replace with your Web3Forms Access Key from https://web3forms.com

  const products = {
    fish: [
      { name: 'Скумбрия копчёная', price: '450₽/кг', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80', description: 'Горячего копчения с золотистой корочкой' },
      { name: 'Сёмга копчёная', price: '1200₽/кг', image: 'https://images.unsplash.com/photo-1580959375944-0b7b1b8b1e1f?w=800&q=80', description: 'Холодного копчения премиум класса' },
      { name: 'Форель копчёная', price: '950₽/кг', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&q=80', description: 'Нежное мясо с дымным ароматом' },
      { name: 'Окунь копчёный', price: '380₽/кг', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80', description: 'По традиционному рецепту на ольхе' }
    ],
    meat: [
      { name: 'Грудинка копчёная', price: '650₽/кг', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80', description: 'Сочная с идеальным балансом специй' },
      { name: 'Рёбрышки свиные', price: '550₽/кг', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', description: 'С хрустящей корочкой и нежной мякотью' },
      { name: 'Куриные крылья', price: '420₽/кг', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80', description: 'Пикантный маринад и дымная нотка' },
      { name: 'Колбаски домашние', price: '580₽/кг', image: 'https://images.unsplash.com/photo-1599904575706-d8e8e4b5dae3?w=800&q=80', description: 'Авторский рецепт с натуральными специями' }
    ]
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-2xl z-50 border-b border-slate-800/50">
        <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-2.5 rounded-2xl">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Мастерская<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400"> копчения</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-10">
            <button onClick={() => scrollToSection('products')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold">Продукция</button>
            <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold">Преимущества</button>
            <button onClick={() => scrollToSection('delivery')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold">Доставка</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold">Контакты</button>
          </div>

          <button className="hidden md:block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white px-7 py-3 rounded-xl font-bold transition-all">
              Заказать
            </div>
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col space-y-5">
                <button onClick={() => scrollToSection('products')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold text-left">Продукция</button>
                <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold text-left">Преимущества</button>
                <button onClick={() => scrollToSection('delivery')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold text-left">Доставка</button>
                <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-orange-400 transition-colors font-semibold text-left">Контакты</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80" 
            alt="Копчёные деликатесы" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950/30 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 font-semibold text-sm">Премиум качество с 2015 года</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                Деликатесы<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-orange-300">горячего копчения</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-slate-300 mb-6 font-bold">
                Традиционные рецепты × Натуральные ингредиенты
              </p>
              
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
                Используем только свежую рыбу и отборное мясо. Коптим на натуральной древесине без химических добавок и ускорителей. Каждый продукт — результат мастерства и любви к делу.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white px-10 py-5 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 shadow-2xl">
                    <ShoppingBag className="w-6 h-6" />
                    Смотреть каталог
                  </div>
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all backdrop-blur-sm border-2 border-white/10 hover:border-white/20"
                >
                  Связаться с нами
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-gradient-to-tr from-rose-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(255 255 255) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Почему <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">выбирают нас</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Мы не просто коптим продукты — мы создаём кулинарные шедевры, которые радуют тысячи клиентов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">100% натурально</h3>
                <p className="text-slate-400 leading-relaxed">
                  Без химии, консервантов и ускорителей. Только свежие продукты и натуральное дерево для копчения.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Мастерство</h3>
                <p className="text-slate-400 leading-relaxed">
                  Рецепты передаются из поколения в поколение. Точное соблюдение технологии и времени копчения.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Свежесть</h3>
                <p className="text-slate-400 leading-relaxed">
                  Готовим ежедневно малыми партиями. Каждый продукт максимально свежий, ароматный и вкусный.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Доставка</h3>
                <p className="text-slate-400 leading-relaxed">
                  Быстрая доставка по городу и области. Упаковка сохраняет свежесть и аромат продуктов.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 px-6 bg-slate-900 relative">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Наш <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">ассортимент</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Широкий выбор копчёной рыбы и мяса премиум качества
            </p>
          </div>

          {/* Fish Section */}
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-3 rounded-xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-white tracking-tight">Копчёная рыба</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.fish.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 text-white px-4 py-2 rounded-full font-black text-lg">
                            {product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-2xl font-black text-white mb-3">{product.name}</h4>
                      <p className="text-slate-400 leading-relaxed mb-5">{product.description}</p>
                      <button className="relative w-full group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur-lg opacity-50 group-hover/btn:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                          <Heart className="w-5 h-5" />
                          Заказать
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Meat Section */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-3 rounded-xl">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-black text-white tracking-tight">Копчёное мясо</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.meat.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full blur-md opacity-70"></div>
                          <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 text-white px-4 py-2 rounded-full font-black text-lg">
                            {product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-2xl font-black text-white mb-3">{product.name}</h4>
                      <p className="text-slate-400 leading-relaxed mb-5">{product.description}</p>
                      <button className="relative w-full group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl blur-lg opacity-50 group-hover/btn:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                          <Heart className="w-5 h-5" />
                          Заказать
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-28 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Доставка <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">и оплата</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Удобные условия для вашего комфорта
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-6">Условия доставки</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Бесплатно</strong> при заказе от 2000₽</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">По городу:</strong> 200₽, доставка в день заказа</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Область:</strong> 350₽, доставка на следующий день</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Самовывоз:</strong> бесплатно, готово через 2 часа</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 transition-all backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center">
                    <Package className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-6">Способы оплаты</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Наличными</strong> курьеру при получении</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Картой</strong> при получении (терминал у курьера)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Онлайн</strong> переводом на карту</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/20 p-1 rounded-lg mt-0.5">
                      <Star className="w-4 h-4 text-orange-400" />
                    </div>
                    <span><strong className="text-white">Для юр. лиц:</strong> безналичный расчёт</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-28 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
              Свяжитесь <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">с нами</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Оставьте заявку и мы перезвоним в течение 15 минут
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-4 rounded-2xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Телефон</h3>
                  <a href="tel:+79001234567" className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 font-bold hover:from-orange-300 hover:to-rose-300 transition-all">
                    +7 (900) 123-45-67
                  </a>
                  <p className="text-slate-400 text-sm mt-2">Ежедневно с 9:00 до 21:00</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-4 rounded-2xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Email</h3>
                  <a href="mailto:info@koptilnya.ru" className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 font-bold hover:from-orange-300 hover:to-rose-300 transition-all">
                    info@koptilnya.ru
                  </a>
                  <p className="text-slate-400 text-sm mt-2">Ответим в течение часа</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-5"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl blur-lg opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-4 rounded-2xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Адрес</h3>
                  <p className="text-2xl text-white font-bold">
                    ул. Производственная, 15
                  </p>
                  <p className="text-slate-400 text-sm mt-2">Самовывоз с 10:00 до 20:00</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-gradient-to-br from-orange-600 to-rose-600 p-2 rounded-xl">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white">Гарантия качества</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Если вам не понравится наша продукция — вернём деньги без вопросов. 
                    Мы уверены в качестве каждого продукта!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-rose-500/20 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-10 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3">Ваше имя</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Иван Иванов"
                          required
                          className="w-full px-5 py-4 bg-slate-950/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all backdrop-blur-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+7 (900) 123-45-67"
                          required
                          className="w-full px-5 py-4 bg-slate-950/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all backdrop-blur-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3">Email (необязательно)</label>
                        <input
                          type="email"
                          name="email"
                          placeholder="ivan@example.com"
                          className="w-full px-5 py-4 bg-slate-950/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all backdrop-blur-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3">Сообщение</label>
                        <textarea
                          name="message"
                          placeholder="Что вас интересует?"
                          rows="4"
                          required
                          className="w-full px-5 py-4 bg-slate-950/50 border-2 border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all resize-none backdrop-blur-sm"
                        ></textarea>
                      </div>
                      
                      {isError && (
                        <div className="text-rose-400 text-sm bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                          {errorMessage}
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full group/btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white px-8 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-lg">
                          {isSubmitting ? (
                            <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Отправка...
                            </>
                          ) : (
                            <>
                              <Send className="w-6 h-6" />
                              Отправить заявку
                            </>
                          )}
                        </div>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="text-center py-12"
                    >
                      <div className="relative mb-8 inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-2xl opacity-50"></div>
                        <div className="relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 w-24 h-24 rounded-full flex items-center justify-center border-2 border-green-500/30">
                          <CheckCircle className="w-12 h-12 text-green-400" />
                        </div>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-5">
                        Заявка отправлена!
                      </h3>
                      <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed text-lg">
                        Спасибо за обращение! Мы свяжемся с вами в ближайшее время для уточнения деталей заказа.
                      </p>
                      <button
                        onClick={resetForm}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-300 hover:to-rose-300 font-black transition-all text-lg"
                      >
                        Отправить ещё одну заявку
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-16 px-6 border-t border-slate-800/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 blur-xl opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-orange-600 to-rose-600 p-2.5 rounded-2xl">
                    <ChefHat className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-black text-white">Мастерская копчения</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Копчёная рыба и мясо по традиционным рецептам. Натуральные продукты без химии и консервантов с 2015 года.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-6">Навигация</h3>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('products')} className="block text-slate-400 hover:text-orange-400 transition-colors">Продукция</button>
                <button onClick={() => scrollToSection('features')} className="block text-slate-400 hover:text-orange-400 transition-colors">Преимущества</button>
                <button onClick={() => scrollToSection('delivery')} className="block text-slate-400 hover:text-orange-400 transition-colors">Доставка</button>
                <button onClick={() => scrollToSection('contact')} className="block text-slate-400 hover:text-orange-400 transition-colors">Контакты</button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-white mb-6">Контакты</h3>
              <div className="space-y-4 text-slate-400">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <a href="tel:+79001234567" className="hover:text-orange-400 transition-colors">+7 (900) 123-45-67</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <a href="mailto:info@koptilnya.ru" className="hover:text-orange-400 transition-colors">info@koptilnya.ru</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span>ул. Производственная, 15</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span>Ежедневно 9:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 text-center">
            <p className="text-slate-500 text-sm">
              © 2024 Мастерская копчения. Все права защищены. Копчение рыбы и мяса с 2015 года.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App