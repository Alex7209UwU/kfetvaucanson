interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
  type = 'danger',
}: ConfirmDialogProps) {
  const colors = {
    danger: {
      icon: '🗑️',
      bg: 'from-red-500 to-rose-600',
      button: 'from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
    },
    warning: {
      icon: '⚠️',
      bg: 'from-amber-500 to-orange-600',
      button: 'from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700',
    },
    info: {
      icon: 'ℹ️',
      bg: 'from-blue-500 to-cyan-600',
      button: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
    },
  }[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div 
        className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <span className="text-3xl">{colors.icon}</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-500">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-3 bg-gradient-to-r ${colors.button} text-white rounded-xl font-semibold transition-all shadow-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
