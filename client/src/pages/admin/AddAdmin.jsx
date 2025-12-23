import React, { useState } from 'react';
import { UserPlus, ShieldCheck, Mail, Lock, User, Loader2 } from 'lucide-react';

const AddAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/admin/add-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Required for your auth middleware
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'New Admin authorized successfully!' });
                setFormData({ name: '', email: '', password: '' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to add admin.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Server connection error.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full mb-4">
                        <ShieldCheck className="text-blue-500" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Add System Admin</h2>
                    <p className="text-slate-400 text-sm mt-2">Create a new administrator for Net Suraksha Hub</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Admin Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Temporary Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <><UserPlus size={20} /> Create Admin Account</>
                        )}
                    </button>
                </form>

                {/* Status Messages */}
                {message.text && (
                    <div className={`mt-6 p-3 rounded-lg text-sm text-center border ${message.type === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                            : 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                        }`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddAdmin;