import { useState, useMemo } from 'react';
import { createOrder } from '../api';
import './Menu3D.css';

export interface OrderPageProps {
    onBack: () => void;
    cart: Record<string, number>;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
}

interface CartItemData {
    id: string;
    name: string;
    price: number;
    image: string;
}

const menuItemsData: CartItemData[] = [
    { id: 'm1', name: 'Gimbap', price: 299, image: '/gimbab.jpeg' },
    { id: 'm2', name: 'Mandu', price: 349, image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=400' },
    { id: 'm3', name: 'Tteokbokki', price: 329, image: '/ricecakes.jpeg' },
    { id: 'm4', name: 'Ramen', price: 399, image: '/ramen.jpeg' },
    { id: 'm5', name: 'Bibimbap', price: 499, image: '/bibimbap.jpeg' },
    { id: 'm6', name: 'Bulgogi', price: 699, image: '/bulgogi.jpg' },
    { id: 'm7', name: 'Japchae', price: 429, image: '/palillos.jpeg' },
    { id: 'm8', name: 'Kimchi Jjigae', price: 449, image: '/kimchi.jpeg' },
    { id: 'm9', name: 'Sundubu Jjigae', price: 429, image: '/Sundubu-Jjigae.jpg' },
    { id: 'm10', name: 'Korean FC', price: 549, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400' },
    { id: 'm11', name: 'Pajeon', price: 399, image: '/pajeon.jpg' },
    { id: 'm12', name: 'Kimchi Fried Rice', price: 479, image: '/kimchifriendrice.jpeg' },
    { id: 'm13', name: 'Soju Original', price: 499, image: '/soju.jpeg' },
    { id: 'm14', name: 'Barley Tea', price: 149, image: '/barley tea.jpg' },
];

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function OrderPage({ onBack, cart, updateQuantity, clearCart }: OrderPageProps) {
    const [ discountCode, setDiscountCode ] = useState('');
    const [ appliedDiscount, setAppliedDiscount ] = useState(0); // percentage

    const cartItems = useMemo(() => {
        return Object.entries(cart).map(([ id, quantity ]) => {
            const item = menuItemsData.find(m => m.id === id);
            return {
                ...item!,
                quantity
            };
        });
    }, [ cart ]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [ cartItems ]);

    const discountAmount = useMemo(() => {
        return (subtotal * appliedDiscount) / 100;
    }, [ subtotal, appliedDiscount ]);

    const taxAmount = useMemo(() => {
        return (subtotal - discountAmount) * 0.05; // 5% GST
    }, [ subtotal, discountAmount ]);

    const total = subtotal - discountAmount + taxAmount;

    const handleApplyDiscount = () => {
        if (discountCode.toUpperCase() === 'HANOK20') {
            setAppliedDiscount(20);
            alert('🎉 20% Discount Applied!');
        } else {
            alert('Invalid Discount Code');
        }
    };

    const checkout = async () => {
        if (total === 0) {
            alert("Please add something to order!");
            return;
        }

        const options = {
            key: "rzp_test_RX3jjZVra6hFu2",
            amount: Math.round(total * 100),
            currency: "INR",
            name: "Hanok Grill",
            description: "Cyberpunk Dining Experience",
            handler: async function (response: any) {
                alert("✅ Terminal Securing Payment...\nOrder Confirmed!");
                try {
                    await createOrder({
                        customerName: "Guest User",
                        customerPhone: "XXXXXXXXXX",
                        items: cartItems.map(item => ({
                            dishId: item.id,
                            dishName: item.name,
                            quantity: item.quantity,
                            price: item.price
                        })),
                        totalAmount: total,
                        paymentId: response.razorpay_payment_id,
                        deliveryType: "dine-in"
                    });
                    clearCart();
                    onBack();
                } catch (error) {
                    console.error('Terminal Error:', error);
                }
            },
            theme: { color: "#93328E" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="menu-3d-wrapper text-white w-full fixed inset-0 z-[100] bg-[#0a0805] font-sans overflow-hidden" style={{ height: '100dvh' }}>
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#0a0805]"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2560')] bg-cover grayscale"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                <div className="absolute inset-0 cyber-grid-precise opacity-30"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Header — compact fixed strip */}
                <header className="flex items-center justify-between px-6 lg:px-16 py-3 border-b border-white/5 shrink-0 backdrop-blur-md bg-[#0a0805]/60">
                    <button onClick={onBack} className="group flex items-center gap-2 text-white/40 hover:text-primary transition-all">
                        <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">keyboard_backspace</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Back</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-display text-sm font-bold tracking-[0.2em] uppercase">Order</span>
                            <span className="text-primary font-display text-[9px] tracking-[0.4em] uppercase font-bold">Terminal</span>
                        </div>
                    </div>
                    <div className="w-16"></div>
                </header>

                {/* Main — flex row, fills rest of viewport */}
                <main className="flex-1 flex flex-col lg:flex-row gap-0 min-h-0 px-4 lg:px-16 py-4">

                    {/* Left: Cart Items — scrolls internally */}
                    <div className="flex-1 flex flex-col min-h-0 lg:pr-6">
                        <div className="flex items-center justify-between mb-3 shrink-0">
                            <h2 className="text-sm font-bold font-display tracking-wider border-l-4 border-primary pl-3 uppercase">Items in Stack</h2>
                            <button
                                onClick={clearCart}
                                className="text-[9px] font-bold text-white/30 hover:text-red-400 transition-colors uppercase tracking-widest flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                                Empty
                            </button>
                        </div>

                        {/* Scrollable cart list */}
                        <div className="flex-1 overflow-y-auto min-h-0 space-y-2 pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(238,189,43,0.3) transparent' }}>
                            {cartItems.length === 0 ? (
                                <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-8 text-center mt-4">
                                    <span className="material-symbols-outlined text-white/10 text-4xl block mb-3">shopping_cart_off</span>
                                    <p className="text-white/30 uppercase tracking-[0.4em] text-[10px]">Terminal Empty. Ready for input.</p>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-2 flex items-center gap-3 group hover:border-primary/30 transition-all">
                                        <div className="size-10 rounded-lg overflow-hidden ring-1 ring-white/10 group-hover:ring-primary/40 transition-all shrink-0">
                                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-white/90 group-hover:text-primary transition-colors truncate">{item.name}</h4>
                                            <p className="text-primary font-black text-[10px]">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/10 shrink-0">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="material-symbols-outlined text-white/40 hover:text-primary transition-colors" style={{ fontSize: '14px' }}>remove</button>
                                            <span className="font-black text-xs w-3 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="material-symbols-outlined text-white/40 hover:text-primary transition-colors" style={{ fontSize: '14px' }}>add</button>
                                        </div>
                                        <div className="text-right shrink-0 min-w-[60px]">
                                            <p className="text-[7px] text-white/30 uppercase tracking-widest">Subtotal</p>
                                            <p className="text-sm font-bold">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right: Bill panel — always visible, no scroll */}
                    <div className="w-full lg:w-72 xl:w-80 shrink-0 flex flex-col gap-3 lg:border-l lg:border-white/5 lg:pl-6">
                        {/* Discount Card */}
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 backdrop-blur-xl shrink-0">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-primary">Override Discount</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="INPUT_CODE"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] focus:border-primary outline-none transition-all uppercase tracking-widest"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    onClick={handleApplyDiscount}
                                    className="bg-primary text-[#0a0805] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        {/* Bill Summary */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-2xl flex flex-col gap-3 shrink-0">
                            <h3 className="text-sm font-display font-bold uppercase tracking-widest border-b border-white/5 pb-2">Bill Manifest</h3>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-white/40 text-[9px] font-bold uppercase tracking-widest">
                                    <span>Base Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                {appliedDiscount > 0 && (
                                    <div className="flex justify-between text-green-400 text-[9px] font-bold uppercase tracking-widest">
                                        <span>Discount ({appliedDiscount}%)</span>
                                        <span>-₹{discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-white/40 text-[9px] font-bold uppercase tracking-widest">
                                    <span>GST (5%)</span>
                                    <span>₹{taxAmount.toFixed(0)}</span>
                                </div>
                            </div>

                            <div className="border-t border-primary/20 pt-3 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Grand Total</span>
                                    <span className="text-2xl font-black tracking-tighter text-white">₹{total.toFixed(0)}</span>
                                </div>
                                <span className="material-symbols-outlined text-primary text-2xl animate-pulse">barcode_scanner</span>
                            </div>

                            <button
                                onClick={checkout}
                                className="w-full bg-primary hover:bg-white text-[#0a0805] py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.4em] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-primary/30 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">payments</span>
                                Finalize Payment
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
