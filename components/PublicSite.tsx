import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext'; // Updated to use Context
import { Project } from '../types';
import { ProjectDetail } from './ProjectDetail';
import { Reveal } from './ui/Reveal';
import { Menu, Phone, ArrowUpRight } from 'lucide-react';

export const PublicSite: React.FC = () => {
  const { projects } = useData(); // Fetch from "Backend"
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Collect all promos for the hero section
  const heroPromos = useMemo(() => {
    const allPromos = projects.flatMap(p => p.promos);
    return allPromos.slice(0, 3);
  }, [projects]);

  return (
    <div className="min-h-screen font-sans bg-white text-primary relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-12 md:py-6 flex justify-between items-center bg-white/90 backdrop-blur-md transition-all border-b border-sand">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-tr-xl rounded-bl-xl" />
          <span className="font-bold text-xl tracking-tight uppercase text-primary">Хорошо!<span className="text-secondary font-light ml-1">ГК</span></span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-primary">
          <a href="#projects" className="hover:text-accent transition-colors">Проекты</a>
          <a href="#about" className="hover:text-accent transition-colors">О компании</a>
          <a href="#contacts" className="hover:text-accent transition-colors">Контакты</a>
        </nav>

        <div className="flex items-center gap-6">
          <a href="/admin" className="text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors">
            Вход для сотрудников
          </a>
          <a href="tel:+78000000000" className="hidden md:flex items-center font-bold text-primary hover:text-accent transition-colors">
            <Phone className="w-4 h-4 mr-2 text-accent" />
            8 800 000-00-00
          </a>
          <button className="md:hidden p-2 text-primary">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[#fdfbf9]">
             <img src="/images/placeholder-hero.svg" className="w-full h-full object-cover opacity-20 grayscale-[20%]" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full flex flex-col h-full justify-center pb-32">
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-6 text-primary leading-[1.1]">
              Искусство<br/>
              <span className="italic font-serif text-accent">жить красиво</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-secondary font-light max-w-xl mb-8">
              Создаем пространства, вдохновленные эстетикой, комфортом и теплом. Дома, в которые хочется возвращаться.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <a href="#projects" className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Выбрать проект
            </a>
          </Reveal>
        </div>

        {/* Hero Offers */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md border-t border-sand">
          <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {heroPromos.map((promo, idx) => (
                 <div key={idx} onClick={() => setSelectedProject(projects.find(p => p.promos.includes(promo)) || null)} className="flex items-center gap-4 group cursor-pointer animate-slide-up" style={{ animationDelay: `${600 + idx * 100}ms` }}>
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <img src={promo.image} alt="offer" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Спецпредложение</div>
                      <div className="font-bold text-primary leading-tight group-hover:text-accent transition-colors">{promo.title}</div>
                      <div className="text-xs text-secondary mt-1">{promo.description.slice(0, 40)}...</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - More compact */}
      <section id="projects" className="py-24 px-4 md:px-12 bg-white relative z-10">
        <Reveal>
          <div className="flex justify-between items-end mb-8 max-w-[1600px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-primary">Наши проекты</h2>
            <span className="hidden md:block text-secondary">Астрахань</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 100}>
              <div 
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative block overflow-hidden rounded-xl h-[300px]"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 ease-out"
                  style={{ backgroundImage: `url(${project.heroImage})` }}
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-medium mb-1 tracking-wide">{project.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                         {project.tags.slice(0, 2).map((tag, i) => (
                           <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/20 backdrop-blur-md rounded-full">
                             {tag}
                           </span>
                         ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-beige px-4 md:px-12">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
             <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-8 text-primary">
               Мы строим <span className="text-accent italic font-serif">с душой</span> для вашего уюта.
             </h2>
             <div className="space-y-6 text-primary/70 text-lg leading-relaxed font-light">
               <p>
                 Группа Компаний «Хорошо!» — это философия комфортной жизни. Мы используем натуральные материалы, спокойные цветовые решения и создаем атмосферу, в которой отдыхаешь душой.
               </p>
               <p>
                 Наши дворы — это приватные парки, а подъезды — лобби пятизвездочных отелей.
               </p>
             </div>
             
             <div className="flex gap-12 mt-12">
                <div className="border-l-2 border-accent/30 pl-6">
                  <div className="text-4xl font-medium text-accent mb-1">15+</div>
                  <div className="text-sm text-secondary uppercase tracking-wider">Лет опыта</div>
                </div>
                <div className="border-l-2 border-accent/30 pl-6">
                  <div className="text-4xl font-medium text-accent mb-1">5k+</div>
                  <div className="text-sm text-secondary uppercase tracking-wider">Ключей выдано</div>
                </div>
             </div>
          </Reveal>
          <Reveal direction="left" delay={200}>
            <div className="relative p-4">
              <div className="absolute inset-0 bg-sand rounded-full blur-3xl opacity-60 transform rotate-12" />
              <img src="/images/placeholder-card.svg" className="relative rounded-2xl shadow-xl grayscale-[20%]" alt="About us" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-primary text-sand py-24 px-4 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl md:text-6xl font-medium mb-8 tracking-tight">Давайте<br/>дружить</h2>
              <a href="mailto:info@horoshogk.ru" className="text-xl md:text-2xl hover:text-accent transition-colors block mb-4 font-light">info@horoshogk.ru</a>
              <a href="tel:+78000000000" className="text-xl md:text-2xl hover:text-accent transition-colors block font-light">8 800 000-00-00</a>
            </div>
            
            <div>
              <h4 className="text-white/40 uppercase tracking-wider mb-6 text-xs font-bold">Офис</h4>
              <p className="text-lg leading-relaxed font-light text-white/80">
                г. Астрахань,<br/>
                ул. Теплая, д. 10,<br/>
                Офис 305
              </p>
            </div>

            <div>
              <h4 className="text-white/40 uppercase tracking-wider mb-6 text-xs font-bold">Соцсети</h4>
              <div className="flex gap-4">
                <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="ВКонтакте">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.26 2.174 1.817.613.42 1.08.328 1.08.328l2.172-.03s1.136-.07.598-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.264-1.183-1.06.462-3.246.998-1.33 1.398-2.142 1.273-2.49-.119-.332-.856-.244-.856-.244l-2.454.015s-.182-.025-.317.056c-.133.08-.218.264-.218.264s-.392 1.044-.915 1.932c-1.104 1.872-1.545 1.972-1.725 1.856-.42-.272-.315-1.09-.315-1.67 0-1.813.275-2.57-.536-2.766-.269-.065-.467-.108-1.155-.115-.882-.009-1.628.003-2.05.21-.28.137-.497.443-.365.46.163.022.533.1.729.365.253.343.244 1.113.244 1.113s.145 2.133-.34 2.397c-.332.182-.788-.189-1.767-1.888-.502-.87-.88-1.832-.88-1.832s-.073-.18-.203-.276c-.158-.117-.378-.154-.378-.154l-2.332.015s-.35.01-.479.163c-.114.135-.01.414-.01.414s1.839 4.304 3.924 6.471c1.912 1.988 4.085 1.857 4.085 1.857h.985z"/></svg>
                </a>
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="Телеграм">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </a>
                <a href="https://max.ru/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-primary transition-colors" title="MAX">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 14.4L12 13.6l-3.2 2.8.8-3.8L6 9.6l3.9-.2L12 6l2.1 3.4 3.9.2-3.6 3z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-white/40 text-sm font-light">
            <p>© 2024 ГК «Хорошо!». Все права защищены.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-white transition-colors">Декларации</a>
            </div>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}