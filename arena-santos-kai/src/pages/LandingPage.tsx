import { useState } from 'react';
import { Menu, Instagram, Facebook, Youtube, Swords, HeartPulse, Users, Check, Whatsapp } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="scroll-smooth">
            <header id="header" className="bg-black/80 backdrop-blur-lg sticky top-0 z-50 border-b border-red-brand py-0">
                <nav className="container mx-auto px-6 py-0 flex justify-between items-center">
                    <Link to="/" className="flex items-center mr-auto">
                        <img src="/img/Prancheta 38.png" alt="Logo Arena Ricardo Santos" className="h-32 w-auto scale-[1.8]" />
                    </Link>
                    
                    <div className="hidden lg:flex items-center space-x-8">
                        <a href="#horarios" className="text-white hover:text-red-brand font-semibold transition-colors">Horários</a>
                        <a href="#filosofia" className="text-white hover:text-red-brand font-semibold transition-colors">Filosofia</a>
                        <a href="#planos" className="text-white hover:text-red-brand font-semibold transition-colors">Planos</a>
                        <a href="#contato" className="text-white hover:text-red-brand font-semibold transition-colors">Contato</a>
                    </div>

                    <Link to="/login" className="hidden lg:block border-2 border-red-brand text-red-brand font-bold py-2 px-5 rounded-md hover:bg-red-brand hover:text-white transition-colors ml-4">
                        LOGIN
                    </Link>

                    <button id="mobile-menu-button" className="lg:hidden text-white" onClick={toggleMobileMenu}>
                        <Menu className="w-8 h-8"></Menu>
                    </button>
                </nav>
                <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-black border-t border-red-brand`}>
                    <a href="#horarios" className="block py-3 px-6 text-white font-semibold hover:bg-gray-900" onClick={toggleMobileMenu}>Horários</a>
                    <a href="#filosofia" className="block py-3 px-6 text-white font-semibold hover:bg-gray-900" onClick={toggleMobileMenu}>Filosofia</a>
                    <a href="#planos" className="block py-3 px-6 text-white font-semibold hover:bg-gray-900" onClick={toggleMobileMenu}>Planos</a>
                    <a href="#contato" className="block py-3 px-6 text-white font-semibold hover:bg-gray-900" onClick={toggleMobileMenu}>
                        Contato
                    </a>
                    <div className="p-4">
                        <Link to="/login" className="w-full text-center block bg-red-brand text-white font-bold py-3 px-5 rounded-md hover:bg-red-700" onClick={toggleMobileMenu}>
                            LOGIN
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section id="inicio" className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-gray-800">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('/img/WhatsApp Image 2025-07-30 at 16.48.43.jpeg')",
                            filter: 'blur(1px)',
                            opacity: 0.9,
                            transform: 'scale(1.02)'
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    <div className="relative container mx-auto px-6 text-left">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-tight">
                                Forje seu <span className="text-red-brand">corpo</span>, Molde sua <span className="text-red-brand">mente</span>.
                            </h1>
                            <p className="mt-4 max-w-lg text-lg md:text-xl text-gray-200 font-medium">
                                Descubra o poder do judô. Mais que uma arte marcial, um caminho para a disciplina, respeito e autoconfiança.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a href="#planos" className="bg-red-brand text-white font-bold py-4 px-8 rounded-md text-center hover:bg-red-700 transition-transform hover:scale-105">
                                    NOSSOS PLANOS
                                </a>
                                <a href="#horarios" className="border-2 border-red-brand text-red-brand font-bold py-4 px-8 rounded-md text-center hover:bg-red-brand hover:text-white transition-transform hover:scale-105">
                                    VER HORÁRIOS
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-black text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900 shadow-lg">
                                <div className="bg-red-brand p-4 rounded-full mb-4">
                                    <Swords className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-montserrat text-4xl mt-4 font-bold text-red-brand">TÉCNICA E DISCIPLINA</h3>
                                <p className="mt-2 text-gray-300">Aprenda os fundamentos e as técnicas avançadas do judô com instrutores qualificados.</p>
                            </div>
                            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900 shadow-lg">
                                <div className="bg-red-brand p-4 rounded-full mb-4">
                                <HeartPulse className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-montserrat text-4xl mt-4 font-bold text-red-brand">SAÚDE E BEM-ESTAR</h3>
                                <p className="mt-2 text-gray-300">Melhore seu condicionamento físico, flexibilidade e libere o estresse do dia a dia.</p>
                            </div>
                            <div className="flex flex-col items-center p-6 rounded-lg bg-gray-900 shadow-lg">
                                <div className="bg-red-brand p-4 rounded-full mb-4">
                                <Users className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-montserrat text-4xl mt-4 font-bold text-red-brand">COMUNIDADE E RESPEITO</h3>
                                <p className="mt-2 text-gray-300">Faça parte de uma comunidade unida, baseada no respeito mútuo e na amizade.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="filosofia" className="py-20 md:py-32 bg-gray-900 bg-cover bg-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/70"></div> {/* Overlay mais escuro */}
                    <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/img/screen-5 (1).jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                    <div className="relative container mx-auto px-6 text-center text-white z-10">
                        <img src="/img/screen-5 (1).jpg" alt="Jigoro Kano" className="w-32 h-32 rounded-full border-4 border-red-brand mx-auto mb-6 shadow-lg" />
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-montserrat font-bold text-shadow-strong text-red-brand">A ESSÊNCIA DO JUDÔ</h2>
                        <blockquote className="mt-6 max-w-3xl mx-auto">
                            <p className="text-2xl md:text-3xl font-light italic text-gray-200">"O judoca não se aperfeiçoa para lutar, luta para se aperfeiçoar."</p>
                            <cite className="block mt-4 text-lg font-semibold text-gray-400">- Jigoro Kano, Fundador do Judô</cite>
                        </blockquote>
                    </div>
                </section>

                <section id="dojo" className="py-16 md:py-24 bg-black text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat text-5xl md:text-6xl font-bold text-red-brand">NOSSO DOJO</h2>
                            <p className="max-w-xl mx-auto text-gray-300">Conheça o ambiente onde a tradição e a paixão pelo judô se encontram.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <img src="/img/dojo-gallery-1.jpeg" alt="Dojo Image 1" className="w-full h-64 object-cover rounded-lg shadow-xl border-2 border-red-brand transform hover:scale-105 transition-transform duration-300" />
                            <img src="/img/dojo-gallery-2.jpeg" alt="Dojo Image 2" className="w-full h-64 object-cover rounded-lg shadow-xl border-2 border-red-brand transform hover:scale-105 transition-transform duration-300" />
                            <img src="/img/dojo-gallery-3.jpeg" alt="Dojo Image 3" className="w-full h-64 object-cover rounded-lg shadow-xl border-2 border-red-brand transform hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>
                </section>

                <section id="horarios" className="py-16 md:py-24 bg-black text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat text-5xl md:text-6xl font-bold text-red-brand">NOSSOS HORÁRIOS</h2>
                            <p className="max-w-xl mx-auto text-gray-300">Encontre a turma perfeita para você ou sua família. Temos horários flexíveis para todas as idades.</p>
                        </div>
                        <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-red-brand">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-red-brand text-white font-montserrat text-2xl">
                                        <tr>
                                            <th className="p-4">Turma</th>
                                            <th className="p-4">Dias</th>
                                            <th className="p-4">Horário</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        <tr className="hover:bg-gray-800">
                                            <td className="p-4 font-bold text-white">Infantil (5-9 anos)</td>
                                            <td className="p-4 text-gray-200">Segunda, Quarta e Sexta</td>
                                            <td className="p-4 font-mono text-red-brand">17:00 - 18:00</td>
                                        </tr>
                                        <tr className="bg-gray-800 hover:bg-gray-700">
                                            <td className="p-4 font-bold text-white">Juvenil (10-15 anos)</td>
                                            <td className="p-4 text-gray-200">Segunda, Quarta e Sexta</td>
                                            <td className="p-4 font-mono text-red-brand">18:00 - 19:00</td>
                                        </tr>
                                        <tr className="hover:bg-gray-800">
                                            <td className="p-4 font-bold text-white">Adulto Iniciante</td>
                                            <td className="p-4 text-gray-200">Terça e Quinta</td>
                                            <td className="p-4 font-mono text-red-brand">19:00 - 20:30</td>
                                        </tr>
                                        <tr className="bg-gray-800 hover:bg-gray-700">
                                            <td className="p-4 font-bold text-white">Adulto Avançado</td>
                                            <td className="p-4 text-gray-200">Segunda, Quarta e Sexta</td>
                                            <td className="p-4 font-mono text-red-brand">20:00 - 21:30</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="planos" className="py-16 md:py-24 bg-gray-900 text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat text-5xl md:text-6xl font-bold text-red-brand">PLANOS DE MATRÍCULA</h2>
                            <p className="max-w-xl mx-auto text-gray-300">Escolha o plano que melhor se encaixa na sua rotina e comece sua jornada no judô hoje mesmo.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <div className="border-2 border-gray-700 rounded-lg p-8 flex flex-col bg-gray-800 shadow-xl">
                                <h3 className="font-montserrat text-4xl font-bold text-white">PLANO BÁSICO</h3>
                                <p className="text-gray-400 mb-6">2x na semana</p>
                                <p className="text-5xl font-bold mb-6">R$180<span className="text-xl font-medium text-gray-400">/mês</span></p>
                                <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                                    <li className="flex items-center"><Check className="w-5 h-5 text-red-brand mr-2" />Acesso a 2 aulas/semana</li>
                                    <li className="flex items-center"><Check className="w-5 h-5 text-red-brand mr-2" />Horários flexíveis</li>
                                </ul>
                                <a href="#contato" className="w-full text-center mt-auto bg-red-brand text-white font-bold py-3 px-5 rounded-md hover:bg-red-700">Quero este</a>
                            </div>
                            <div className="border-2 border-red-brand rounded-lg p-8 flex flex-col bg-black shadow-2xl relative">
                                <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-red-brand text-white text-sm font-bold px-4 py-1 rounded-full">MAIS POPULAR</span>
                                <h3 className="font-montserrat text-4xl font-bold text-red-brand">PLANO COMPLETO</h3>
                                <p className="text-gray-400 mb-6">3x na semana</p>
                                <p className="text-5xl font-bold mb-6">R$190<span className="text-xl font-medium text-gray-400">/mês</span></p>
                                <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                                    <li className="flex items-center"><Check className="w-5 h-5 text-red-brand mr-2" />Acesso a todas as aulas</li>
                                    <li className="flex items-center"><Check className="w-5 h-5 text-red-brand mr-2" />Horários flexíveis</li>
                                    <li className="flex items-center"><Check className="w-5 h-5 text-red-brand mr-2" />Acompanhamento personalizado</li>
                                </ul>
                                <a href="#contato" className="w-full text-center mt-auto bg-red-brand text-white font-bold py-3 px-5 rounded-md hover:bg-red-700">Quero este</a>
                            </div>
                            
                        </div>
                    </div>
                </section>

                <section id="contato" className="py-16 md:py-24 bg-black text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-montserrat text-5xl md:text-6xl font-bold text-red-brand">ENTRE EM CONTATO</h2>
                            <p className="max-w-xl mx-auto text-gray-300">Agende uma aula experimental gratuita ou tire suas dúvidas. Estamos esperando por você!</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-red-brand">
                            <form>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input type="text" placeholder="Seu nome" className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-brand bg-gray-800 text-white" />
                                    <input type="email" placeholder="Seu e-mail" className="w-full p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-brand bg-gray-800 text-white" />
                                </div>
                                <textarea placeholder="Sua mensagem..." rows={5} className="w-full p-3 border border-gray-700 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-brand bg-gray-800 text-white"></textarea>
                                <button type="submit" className="w-full bg-red-brand text-white font-bold text-lg py-4 px-8 rounded-md hover:bg-red-700 transition-colors">
                                    ENVIAR MENSAGEM
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="bg-black text-gray-400 border-t border-red-brand">
                <div className="container mx-auto px-6 py-8 text-center">
                    <p>&copy; 2025 Arena Ricardo Santos. Todos os direitos reservados.</p>
                    <p className="text-sm">Rua México, 360 - JD Gisela, Toledo - PR</p>
                    <p className="text-sm"><Whatsapp className="inline-block w-4 h-4 mr-1" />(45) 99906-2131</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://www.instagram.com/arena_ricardosantos/" target="_blank" className="hover:text-red-brand"><Instagram /></a>
                        <a href="https://www.facebook.com/JudoRicardoSantos" target="_blank" className="hover:text-red-brand"><Facebook /></a>
                        <a href="#" className="hover:text-red-brand"><Youtube /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;