import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star } from 'lucide-react';
import { Card } from '../ui/Card';

interface Member {
    id: number;
    name: string;
    role: string;
    bio: string;
    image_url: string;
    is_founder: number;
    has_star: number;
    joined_at: string;
}

interface MembersSectionProps {
    t: any;
    members: Member[];
}

export const MembersSection = ({ t, members }: MembersSectionProps) => {
    if (members.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 dark:bg-zinc-900/20 rounded-[3rem] border border-slate-200 dark:border-zinc-800/50 shadow-sm dark:shadow-none">
                <Users className="mx-auto text-slate-300 dark:text-zinc-700 mb-4" size={48} />
                <p className="text-slate-400 dark:text-zinc-500 uppercase tracking-widest text-xs font-bold">Aucun membre trouvé ou chargement...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
                <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-[2rem] p-6 relative overflow-hidden group shadow-sm dark:shadow-none"
                >
                    {member.is_founder === 1 && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-white dark:text-zinc-950 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                            {t.report.communityPortal.foundersPortal.members.founders}
                        </div>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-700 shadow-sm">
                            <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-950 dark:text-white">{member.name}</h3>
                            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">{member.role}</p>
                        </div>
                    </div>
                    <p className="text-slate-700 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all font-medium">
                        {member.bio}
                    </p>
                    <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 dark:text-zinc-600 uppercase tracking-widest font-black">
                            {t.report.communityPortal.foundersPortal.members.joined} {new Date(member.joined_at).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {member.has_star === 1 && <Star size={14} className="text-amber-500 dark:text-amber-400" fill="currentColor" />}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
