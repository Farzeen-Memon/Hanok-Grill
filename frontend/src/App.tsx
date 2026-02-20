import { useState } from 'react';
import './App.css';
import HanokPicComponent from './components/HanokPicComponent';
import ReservationForm from './components/ReservationForm';
import OrderPage from './components/OrderPage';
import Menu3D from './components/Menu3D';
import HomePage from './components/HomePage';
import AIRecommendationModal from './components/AIRecommendationModal';

function App() {
    const [ currentPage, setCurrentPage ] = useState('home');
    const [ showAIModal, setShowAIModal ] = useState(false);
    const [ showHanokPic, setShowHanokPic ] = useState(false);
    const [ cart, setCart ] = useState<Record<string, number>>({});
    const [ initialScrollSection, setInitialScrollSection ] = useState<string | null>(null);

    const addToCart = (id: string) => {
        setCart(prev => ({
            ...prev,
            [ id ]: (prev[ id ] || 0) + 1
        }));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => {
            const newVal = (prev[ id ] || 0) + delta;
            if (newVal <= 0) {
                const { [ id ]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [ id ]: newVal };
        });
    };

    const clearCart = () => setCart({});

    const renderPage = () => {
        switch (currentPage) {
            case 'reservation':
                return <ReservationForm onBack={() => setCurrentPage('home')} />;
            case 'order':
                return (
                    <OrderPage
                        onBack={() => setCurrentPage('menu-3d')}
                        cart={cart}
                        updateQuantity={updateQuantity}
                        clearCart={clearCart}
                    />
                );
            case 'menu-3d':
                return (
                    <Menu3D
                        onBack={() => {
                            setInitialScrollSection(null);
                            setCurrentPage('home');
                        }}
                        cart={cart}
                        addToCart={addToCart}
                        onOpenTerminal={() => setCurrentPage('order')}
                        onOpenAI={() => setShowAIModal(true)}
                        onHistory={() => {
                            setInitialScrollSection('history');
                            setCurrentPage('home');
                        }}
                    />
                );
            default:
                return (
                    <HomePage
                        onMenu={() => setCurrentPage('menu-3d')}
                        onReservations={() => setCurrentPage('reservation')}
                        onAI={() => setShowAIModal(true)}
                        initialScrollSection={initialScrollSection}
                    />
                );
        }
    };

    // Remove old internal HomePage component

    return (
        <div className="app">

            {/* Main Content */}
            {renderPage()}

            {/* AI Recommendation Modal */}
            {showAIModal && (
                <AIRecommendationModal
                    onClose={() => setShowAIModal(false)}
                    onAddToCart={addToCart}
                />
            )}

            {/* Hanok Pic Modal */}
            {showHanokPic && (
                <div id="hanok-pic-container">
                    <HanokPicComponent onClose={() => setShowHanokPic(false)} />
                </div>
            )}
        </div>
    );
}

export default App;
