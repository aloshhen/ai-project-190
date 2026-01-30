import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChefHat, Award, Shield, Truck, Phone, Mail, MapPin, Clock, Menu, X, ChevronRight, Star, Package, Send, CheckCircle } from 'lucide-react'

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
      { name: 'Скумбрия копчёная', price: '450₽/кг', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80', description: 'Горячего копчения, нежная и ароматная' },
      { name: 'Сёмга копчёная', price: '1200₽/кг', image: 'https://images.unsplash.com/photo-1580959375944-0b7b1b8b1e1f?w=800&q=80', description: 'Холодного копчения, премиум качество' },
      { name: 'Форель копчёная', price: '950₽/кг', image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800&q=80', description: 'Золотистая корочка, изысканный вкус' },
      { name: 'Окунь копчёный', price: '380₽/кг', image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800&q=80', description: 'Традиционный рецепт, натуральное дерево' }
    ],
    meat: [
      { name: 'Грудинка копчёная', price: '650₽/кг', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80', description: 'Сочная, с пряными травами' },
      { name: 'Рёбрышки свиные', price: '550₽/кг', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', description: 'Горячего копчения, с хрустящей корочкой' },
      { name: 'Куриные крылья', price: '420₽/кг', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800&q=80', description: 'Пикантный маринад, дымная нотка' },
      { name: 'Колбаски домашние', price: '580₽/кг', image: 'https://images.unsplash.com/photo-1599904575706-d8e8e4b5dae3?w=800&q=80', description: 'Авторский рецепт, натуральные специи' }
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-amber-200 shadow-sm">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-2 rounded-xl">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900">Коптильня</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold">Продукция</button>
            <button onClick={() => scrollToSection('process')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold">Технология</button>
            <button onClick={() => scrollToSection('delivery')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold">Доставка</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold">Контакты</button>
          </div>

          <button className="hidden md:block bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-600/30">
            Заказать
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-900">
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
              className="md:hidden bg-white border-t border-amber-200"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-left">Продукция</button>
                <button onClick={() => scrollToSection('process')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-left">Технология</button>
                <button onClick={() => scrollToSection('delivery')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-left">Доставка</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-amber-600 transition-colors font-semibold text-left">Контакты</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80" 
            alt="Копчёные продукты" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
                Копчёные<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">деликатесы</span>
              </h1>
              <p className="text-2xl md:text-3xl text-amber-300 mb-6 font-bold">
                Рыба и мясо по традиционным рецептам
              </p>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
                Используем только натуральное дерево и проверенные технологии копчения. 
                Без химии и консервантов — только вкус и традиции.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('products')}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-amber-600/40"
                >
                  Смотреть ассортимент
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-xl text-lg font-bold transition-all backdrop-blur-sm border-2 border-white/30 hover:border-white/50"
                >
                  Связаться с нами
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-4">
            Почему <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">выбирают нас?</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Качество, проверенное временем и тысячами довольных клиентов
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% натурально</h3>
              <p className="text-gray-600 leading-relaxed">
                Только свежие продукты, без химических добавок и консервантов. Копчение на натуральном дереве.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Традиции</h3>
              <p className="text-gray-600 leading-relaxed">
                Рецепты передаются из поколения в поколение. Соблюдаем технологию и время копчения.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Свежесть</h3>
              <p className="text-gray-600 leading-relaxed">
                Готовим ежедневно небольшими партиями. Продукция всегда свежая, ароматная и вкусная.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-amber-600 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Доставка</h3>
              <p className="text-gray-600 leading-relaxed">
                Быстрая доставка по городу и области. Упаковка сохраняет свежесть и аромат продуктов.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-4">
            Наш <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">ассортимент</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Широкий выбор копчёной рыбы и мяса на любой вкус
          </p>

          {/* Fish Section */}
          <div className="mb-20">
            <h3 className="text-4xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <Package className="w-10 h-10 text-amber-600" />
              Копчёная рыба
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.fish.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-amber-400"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      {product.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                    <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                      Заказать
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Meat Section */}
          <div>
            <h3 className="text-4xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <Package className="w-10 h-10 text-amber-600" />
              Копчёное мясо
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.meat.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-amber-400"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                      {product.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                    <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg">
                      Заказать
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 px-6 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1920&q=80" 
            alt="Процесс копчения"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white text-center mb-4">
            Технология <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">копчения</span>
          </h2>
          <p className="text-xl text-amber-200 text-center mb-16 max-w-2xl mx-auto">
            Каждый этап контролируется мастерами с многолетним опытом
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400 transition-all"
            >
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-white font-black text-3xl shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Подготовка</h3>
              <p className="text-amber-100 leading-relaxed text-center">
                Отбор свежих продуктов, маринование по авторским рецептам с натуральными специями и травами.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400 transition-all"
            >
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-white font-black text-3xl shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Копчение</h3>
              <p className="text-amber-100 leading-relaxed text-center">
                Процесс копчения на натуральных опилках ольхи, яблони и вишни при строго контролируемой температуре.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/30 hover:border-amber-400 transition-all"
            >
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto text-white font-black text-3xl shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Упаковка</h3>
              <p className="text-amber-100 leading-relaxed text-center">
                Вакуумная упаковка сразу после копчения для сохранения свежести, аромата и всех полезных свойств.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-4">
            Доставка <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">и оплата</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Удобные условия для вашего комфорта
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200"
            >
              <Truck className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Условия доставки</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Бесплатно</strong> при заказе от 2000₽</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>По городу:</strong> 200₽, доставка в день заказа</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Область:</strong> 350₽, доставка на следующий день</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Самовывоз:</strong> бесплатно, готово через 2 часа</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200"
            >
              <Package className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Способы оплаты</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Наличными</strong> курьеру при получении</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Картой</strong> при получении (терминал у курьера)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Онлайн</strong> переводом на карту</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                  <span><strong>Для юр. лиц:</strong> безналичный расчёт</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 text-center mb-4">
            Свяжитесь <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">с нами</span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Оставьте заявку и мы перезвоним в течение 15 минут
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Телефон</h3>
                  <a href="tel:+79001234567" className="text-lg text-amber-600 hover:text-amber-700 transition-colors font-semibold">
                    +7 (900) 123-45-67
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@koptilnya.ru" className="text-lg text-amber-600 hover:text-amber-700 transition-colors font-semibold">
                    info@koptilnya.ru
                  </a>
                  <p className="text-gray-600 text-sm mt-1">Ответим в течение часа</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3 rounded-xl shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Адрес</h3>
                  <p className="text-lg text-gray-700 font-semibold">
                    ул. Производственная, 15
                  </p>
                  <p className="text-gray-600 text-sm mt-1">Самовывоз с 10:00 до 20:00</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-2xl border-2 border-amber-300 mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-600" />
                  Гарантия качества
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Если вам не понравится наша продукция — вернём деньги без вопросов. 
                  Мы уверены в качестве каждого продукта!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-amber-200">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ваше имя</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Иван Иванов"
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+7 (900) 123-45-67"
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email (необязательно)</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="ivan@example.com"
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Сообщение</label>
                      <textarea
                        name="message"
                        placeholder="Что вас интересует?"
                        rows="4"
                        required
                        className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      ></textarea>
                    </div>
                    
                    {isError && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                        {errorMessage}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Отправить заявку
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="text-center py-8"
                  >
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Заявка отправлена!
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                      Спасибо за обращение! Мы свяжемся с вами в ближайшее время для уточнения деталей заказа.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-amber-600 hover:text-amber-700 font-bold transition-colors text-lg"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900 py-12 px-6 border-t-4 border-amber-600">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-2 rounded-xl">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black text-white">Коптильня</span>
              </div>
              <p className="text-amber-200 leading-relaxed">
                Копчёная рыба и мясо по традиционным рецептам. Натуральные продукты без химии и консервантов.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Навигация</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('products')} className="block text-amber-200 hover:text-amber-400 transition-colors">Продукция</button>
                <button onClick={() => scrollToSection('process')} className="block text-amber-200 hover:text-amber-400 transition-colors">Технология</button>
                <button onClick={() => scrollToSection('delivery')} className="block text-amber-200 hover:text-amber-400 transition-colors">Доставка</button>
                <button onClick={() => scrollToSection('contact')} className="block text-amber-200 hover:text-amber-400 transition-colors">Контакты</button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Контакты</h3>
              <div className="space-y-3 text-amber-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+79001234567" className="hover:text-amber-400 transition-colors">+7 (900) 123-45-67</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:info@koptilnya.ru" className="hover:text-amber-400 transition-colors">info@koptilnya.ru</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>ул. Производственная, 15</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-700/50 pt-8 text-center">
            <p className="text-amber-300 text-sm">
              © 2024 Коптильня. Все права защищены. Копчение рыбы и мяса с 2015 года.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App