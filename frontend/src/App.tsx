import { useState } from 'react';
import './App.css';
import HanokPicComponent from './components/HanokPicComponent';
import ReservationForm from './components/ReservationForm';
import OrderPage from './components/OrderPage';
import Menu3D from './components/Menu3D';
import HomePage from './components/HomePage';

function App() {
    const [ currentPage, setCurrentPage ] = useState('home');
    const [ showHanokPic, setShowHanokPic ] = useState(false);
    const [ cart, setCart ] = useState<Record<string, number>>({});

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
                        onBack={() => setCurrentPage('home')}
                        cart={cart}
                        addToCart={addToCart}
                        onOpenTerminal={() => setCurrentPage('order')}
                    />
                );
            default:
                return (
                    <HomePage
                        onOrderNow={() => setCurrentPage('menu-3d')}
                        onMenu={() => setCurrentPage('menu-3d')}
                        onReservations={() => setCurrentPage('reservation')}
                    />
                );
        }
    };

    // Remove old internal HomePage component

    return (
        <div className="app">

            {/* Main Content */}
            {renderPage()}

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
