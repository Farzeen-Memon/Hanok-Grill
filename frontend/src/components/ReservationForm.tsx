import { useState } from 'react';
import { createReservation } from '../api';
import './Menu3D.css'; // Reusing some base styles for consistency

interface ReservationFormProps {
    onBack: () => void;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function ReservationForm({ onBack }: ReservationFormProps) {
    const [ formData, setFormData ] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        guests: 2,
        seating: 'indoor',
        occasion: '',
        specialRequests: '',
        slot: ''
    });

    const [ loading, setLoading ] = useState(false);
    const [ step, setStep ] = useState(1);

    const timeSlots = [
        '18:00 - 19:30',
        '19:30 - 21:00',
        '21:00 - 22:30',
        '22:30 - 00:00',
        '00:00 - 01:30',
        '01:30 - 03:00'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.slot) {
            alert('Please select a time slot');
            return;
        }

        const options = {
            key: "rzp_test_RX3jjZVra6hFu2", // Reusing the same test key
            amount: 150 * 100, // ₹150 in paise
            currency: "INR",
            name: "Hanok Grill",
            description: "Table Reservation Security Deposit",
            handler: async function (response: any) {
                setLoading(true);
                try {
                    const res = await createReservation({
                        ...formData,
                        reservationDate: formData.date,
                        paymentId: response.razorpay_payment_id
                    });

                    alert(`✅ Reservation confirmed!\nReservation ID: ${res._id || 'Confirmed'}\nTable Reserved for: ${formData.name}`);
                    onBack();
                } catch (error) {
                    alert('❌ Payment successful but failed to save reservation. Please contact us.');
                } finally {
                    setLoading(false);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#eebd2b"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="menu-3d-wrapper text-white min-h-screen w-full fixed inset-0 z-[100] bg-[#0a0906] font-sans overflow-y-auto no-scrollbar">
            {/* Background Layer */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#0a0906]"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center grayscale brightness-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906] via-transparent to-[#0a0906]/80"></div>
                <div className="absolute inset-0 cyber-grid-precise"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 backdrop-blur-md sticky top-0 bg-[#0a0906]/40">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-4 text-white/40 hover:text-primary transition-all"
                    >
                        <span className="material-symbols-outlined text-3xl group-hover:-translate-x-2 transition-transform">keyboard_backspace</span>
                        <div className="flex flex-col items-start leading-none pointer-events-none">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return</span>
                            <span className="text-white group-hover:text-primary font-display text-lg font-bold tracking-[0.1em] uppercase transition-colors">Home</span>
                        </div>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="relative size-10 text-primary fiery-logo-glow">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5C50 5 35 25 35 45C35 65 50 85 50 85C50 85 65 65 65 45C65 25 50 5 50 5Z" fill="currentColor" fillOpacity="0.2"></path>
                                <path d="M50 15C50 15 40 30 40 45C40 60 50 75 50 75C50 75 60 60 60 45C60 30 50 15 50 15Z" fill="currentColor" fillOpacity="0.5"></path>
                                <path d="M50 25C50 25 45 35 45 45C45 55 50 65 50 65C50 65 55 55 55 45C55 35 50 25 50 25Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-display text-lg font-bold tracking-[0.2em] uppercase">Hanok</span>
                            <span className="text-primary font-display text-[10px] tracking-[0.4em] uppercase font-bold">Grill</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center p-6 lg:p-20">
                    <div className="w-full max-w-4xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        {/* Left Side: Info */}
                        <div className="w-full md:w-2/5 p-10 lg:p-14 bg-primary/5 border-r border-white/5 flex flex-col justify-between">
                            <div>
                                <span className="text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-4 block">Reservation</span>
                                <h2 className="text-5xl font-bold font-display text-white mb-6 leading-tight">SECURE YOUR TABLE</h2>
                                <p className="text-white/40 text-sm leading-relaxed mb-8">
                                    Join us for an immersive culinary journey through the flavors of Seoul. Private booths and sensory rooms available.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary">location_on</span>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/80">Location</p>
                                            <p className="text-xs text-white/40">Seoul Cyberpunk District, Block 7</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-primary">schedule</span>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/80">Hours</p>
                                            <p className="text-xs text-white/40">18:00 - 04:00 (Daily)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5">
                                <div className="flex gap-2">
                                    {[ 1, 2 ].map(i => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary' : 'bg-white/10'}`}></div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest mt-4">Step {step} of 2</p>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="w-full md:w-3/5 p-10 lg:p-14">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {step === 1 ? (
                                    <div className="space-y-6 animate-fadeIn">
                                        <h3 className="text-xl font-bold tracking-wider text-white/90 mb-8 border-l-4 border-primary pl-4 uppercase">Guest Information</h3>

                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none"
                                                    placeholder="Enter your name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none"
                                                        placeholder="10-digit number"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none"
                                                        placeholder="your@email.com"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Guests</label>
                                                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                                                            className="size-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined">remove</span>
                                                        </button>
                                                        <span className="flex-1 text-center font-bold text-lg">{formData.guests}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(20, prev.guests + 1) }))}
                                                            className="size-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                                                        >
                                                            <span className="material-symbols-outlined">add</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Seating Area</label>
                                                    <select
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none appearance-none"
                                                        value={formData.seating}
                                                        onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                                                    >
                                                        <option value="indoor" className="bg-[#0a0906]">Indoor Dining</option>
                                                        <option value="outdoor" className="bg-[#0a0906]">Terrace Garden</option>
                                                        <option value="private" className="bg-[#0a0906]">Private Suite</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full bg-primary hover:bg-white text-background-dark py-5 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6 animate-fadeIn">
                                        <h3 className="text-xl font-bold tracking-wider text-white/90 mb-8 border-l-4 border-primary pl-4 uppercase">Date & Timing</h3>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Select Date</label>
                                            <input
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Select Time Slot</label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Booking Amount:</span>
                                                    <span className="text-sm font-bold text-white">₹150</span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {timeSlots.map(slot => (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, slot })}
                                                        className={`py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all border ${formData.slot === slot ? 'bg-primary border-primary text-background-dark' : 'bg-white/5 border-white/10 hover:border-primary/50'}`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Special Requests (Optional)</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:border-primary/50 focus:bg-white/10 transition-all outline-none min-h-[100px]"
                                                placeholder="Allergies, birthday celebration, etc."
                                                value={formData.specialRequests}
                                                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="flex-1 border border-white/10 hover:bg-white/5 py-5 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-[2] bg-primary hover:bg-white text-background-dark py-5 rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <span className="size-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    <>Pay ₹150 & Confirm</>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>

                <footer className="py-10 text-center opacity-30">
                    <p className="text-[10px] uppercase tracking-[0.5em]">Hanok Grill © 2026 | All Rights Reserved</p>
                </footer>
            </div>
        </div>
    );
}

