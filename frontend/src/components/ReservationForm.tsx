import { useState, useRef, useEffect } from 'react';
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
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Auto-open the calendar when user reaches Step 2
    useEffect(() => {
        if (step === 2) {
            // Small delay to let the DOM transition complete
            const t = setTimeout(() => {
                try { dateInputRef.current?.showPicker(); } catch {}
            }, 150);
            return () => clearTimeout(t);
        }
    }, [ step ]);

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

                    alert(`✅ Reservation confirmed!\nReservation ID: ${res.reservation?._id || 'Confirmed'}\nTable: ${res.table || 'Assigned'}\nBooked for: ${formData.name}\nSlot: ${formData.slot}`);
                    onBack();
                } catch (error: any) {
                    let msg = 'Failed to save reservation.';
                    try {
                        const errBody = JSON.parse(error.message);
                        msg = errBody.message || msg;
                    } catch {
                        msg = error.message || msg;
                    }
                    alert(`❌ ${msg}\n\nYour payment was captured. Please contact us with your payment ID:\n${response.razorpay_payment_id}`);
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
        <div className="menu-3d-wrapper text-white h-screen w-full fixed inset-0 z-[100] bg-[#0a0906] font-sans overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[#0a0906]"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2560')] bg-cover bg-center grayscale brightness-50"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0906] via-transparent to-[#0a0906]/80"></div>
                <div className="absolute inset-0 cyber-grid-precise"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full w-full max-w-6xl mx-auto p-4">
                <header className="flex items-center justify-between py-2">
                    <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">keyboard_backspace</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-white font-display text-sm font-bold tracking-[0.2em] uppercase">Hanok</span>
                    </div>
                    <div className="w-12"></div>
                </header>

                <main className="flex-1 flex items-center justify-center py-2 overflow-hidden">
                    <div className="w-full max-w-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-row h-[75vh]">
                        <div className="w-1/3 p-6 bg-primary/5 border-r border-white/5 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold font-display text-white mb-2">RESERVE</h2>
                                <p className="text-white/40 text-[10px] leading-relaxed">Secure your culinary journey. Limited seating available.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    {[ 1, 2 ].map(i => (
                                        <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-primary' : 'bg-white/10'}`}></div>
                                    ))}
                                </div>
                                <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">Step {step} of 2</p>
                            </div>
                        </div>

                        <div className="w-2/3 p-6 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {step === 1 ? (
                                    <div className="space-y-4 animate-fadeIn">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Full Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Phone</label>
                                                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Guests</label>
                                                <input type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary" value={formData.guests} onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })} required />
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setStep(2)} className="w-full bg-primary text-background-dark py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.3em]">Next Step</button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 animate-fadeIn">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Date</label>
                                            <input
                                                ref={dateInputRef}
                                                type="date"
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary cursor-pointer"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                onClick={() => { try { dateInputRef.current?.showPicker(); } catch {} }}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Time Slot</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {timeSlots.map(slot => (
                                                    <button key={slot} type="button" onClick={() => setFormData({ ...formData, slot })} className={`py-2 rounded-lg text-[9px] font-bold border transition-all ${formData.slot === slot ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10'}`}>{slot}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button type="button" onClick={() => setStep(1)} className="flex-1 border border-white/10 py-3 rounded-lg text-[10px] uppercase tracking-[0.2em]">Back</button>
                                            <button type="submit" disabled={loading} className="flex-[2] bg-primary text-black py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">{loading ? 'Processing...' : 'Pay ₹150'}</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

