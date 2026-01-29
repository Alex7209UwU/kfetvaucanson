import { useState } from 'react';
import { Member, PlanningSlot } from '../../types';
import { getWeekKey, formatWeekDisplay, addWeeks } from '../../utils/dateUtils';

interface PlanningTabProps {
  members: Member[];
  planning: PlanningSlot[];
  setPlanning: (planning: PlanningSlot[]) => void;
}

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const periods = [
  { id: 'matin' as const, label: 'Matin', time: '9h50 - 10h10', icon: '🌅' },
  { id: 'apres-midi' as const, label: 'Après-midi', time: '15h20 - 15h40', icon: '🌇' },
];
const defaultTasks = ['Comptes', 'Poubelles', 'Nettoyage'];

const dayColors: Record<string, string> = {
  'Lundi': 'from-blue-500 to-cyan-500',
  'Mardi': 'from-purple-500 to-pink-500',
  'Mercredi': 'from-green-500 to-teal-500',
  'Jeudi': 'from-orange-500 to-red-500',
  'Vendredi': 'from-indigo-500 to-purple-500',
};

export function PlanningTab({ members, planning, setPlanning }: PlanningTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekKey = getWeekKey(currentDate);

  const getSlot = (day: string, period: 'matin' | 'apres-midi'): PlanningSlot => {
    const existing = planning.find(s => s.week === weekKey && s.day === day && s.period === period);
    if (existing) return existing;
    return {
      id: `${weekKey}-${day}-${period}`,
      week: weekKey,
      day,
      period,
      members: [],
      tasks: defaultTasks.map(t => ({ name: t, assignedTo: '' })),
    };
  };

  const updateSlot = (slot: PlanningSlot) => {
    const newPlanning = planning.filter(s => s.id !== slot.id);
    newPlanning.push(slot);
    setPlanning(newPlanning);
  };

  const addMemberToSlot = (day: string, period: 'matin' | 'apres-midi', memberId: string) => {
    const slot = getSlot(day, period);
    const member = members.find(m => m.id === memberId);
    if (member && !slot.members.find(m => m.id === memberId)) {
      slot.members.push({ id: memberId, name: member.name, present: true });
      updateSlot(slot);
    }
  };

  const removeMemberFromSlot = (day: string, period: 'matin' | 'apres-midi', memberId: string) => {
    const slot = getSlot(day, period);
    slot.members = slot.members.filter(m => m.id !== memberId);
    updateSlot(slot);
  };

  const togglePresence = (day: string, period: 'matin' | 'apres-midi', memberId: string) => {
    const slot = getSlot(day, period);
    slot.members = slot.members.map(m =>
      m.id === memberId ? { ...m, present: !m.present } : m
    );
    updateSlot(slot);
  };

  const assignTask = (day: string, period: 'matin' | 'apres-midi', taskName: string, memberId: string) => {
    const slot = getSlot(day, period);
    slot.tasks = slot.tasks.map(t =>
      t.name === taskName ? { ...t, assignedTo: memberId } : t
    );
    updateSlot(slot);
  };

  const goToToday = () => setCurrentDate(new Date());
  const prevWeek = () => setCurrentDate(addWeeks(currentDate, -1));
  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

  const isToday = (day: string) => {
    const today = new Date();
    const todayWeekKey = getWeekKey(today);
    const dayIndex = days.indexOf(day);
    const todayDayIndex = today.getDay() - 1; // 0 = Monday in our array
    return weekKey === todayWeekKey && dayIndex === todayDayIndex;
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <button 
          onClick={prevWeek} 
          className="p-3 hover:bg-gray-100 rounded-xl transition-colors group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-sm text-gray-500 font-medium">📅</span>
            <h3 className="font-bold text-xl text-gray-900">{formatWeekDisplay(weekKey)}</h3>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-200"
          >
            Aujourd'hui
          </button>
        </div>
        <button 
          onClick={nextWeek} 
          className="p-3 hover:bg-gray-100 rounded-xl transition-colors group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Planning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map(day => (
          <div 
            key={day} 
            className={`bg-white rounded-2xl shadow-sm overflow-hidden border-2 transition-all ${
              isToday(day) ? 'border-blue-400 ring-4 ring-blue-100' : 'border-gray-100'
            }`}
          >
            {/* Day Header */}
            <div className={`bg-gradient-to-r ${dayColors[day]} text-white py-4 px-4 text-center relative`}>
              {isToday(day) && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse"></span>
              )}
              <p className="font-black text-lg">{day}</p>
              {isToday(day) && <p className="text-xs opacity-80">Aujourd'hui</p>}
            </div>

            {/* Periods */}
            {periods.map(period => {
              const slot = getSlot(day, period.id);
              const isTuesday = day === 'Mardi';
              const tasksToShow = isTuesday ? defaultTasks : defaultTasks.slice(0, 2);
              
              return (
                <div key={period.id} className="border-b last:border-b-0 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{period.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{period.label}</p>
                      <p className="text-xs text-gray-400">{period.time}</p>
                    </div>
                  </div>
                  
                  {/* Members */}
                  <div className="space-y-2 mb-3">
                    {slot.members.map(member => (
                      <div
                        key={member.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-sm transition-all ${
                          member.present 
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => togglePresence(day, period.id, member.id)}
                          className="flex items-center gap-2 flex-1"
                        >
                          <span className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                            member.present 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {member.present && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span className="truncate font-medium">{member.name.split(' ')[0]}</span>
                        </button>
                        <button
                          onClick={() => removeMemberFromSlot(day, period.id, member.id)}
                          className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Member */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addMemberToSlot(day, period.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full p-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors mb-3"
                    defaultValue=""
                  >
                    <option value="">👤 Se rajouter...</option>
                    {members.filter(m => !slot.members.find(sm => sm.id === m.id)).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  
                  {/* Tasks */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tâches</p>
                    {tasksToShow.map(task => {
                      const slotTask = slot.tasks.find(t => t.name === task);
                      const assignedMember = slot.members.find(m => m.id === slotTask?.assignedTo);
                      
                      return (
                        <div key={task} className="flex items-center gap-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium flex-shrink-0">
                            {task === 'Comptes' ? '📊' : task === 'Poubelles' ? '🗑️' : '🧹'} {task}
                          </span>
                          <select
                            value={slotTask?.assignedTo || ''}
                            onChange={(e) => assignTask(day, period.id, task, e.target.value)}
                            className={`flex-1 p-1.5 border rounded-lg text-xs transition-colors ${
                              assignedMember ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <option value="">-</option>
                            {slot.members.map(m => (
                              <option key={m.id} value={m.id}>{m.name.split(' ')[0]}</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
