import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitWaitlist } from '../lib/demo-client';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  function validate() {
    if (!email.trim()) return 'Введите email';
    if (!EMAIL_RE.test(email)) return 'Некорректный email';
    return '';
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setValidationError(err); return; }
    setValidationError('');
    setStatus('loading');
    try {
      const result = await submitWaitlist({ email });
      setMessage(result.message);
      setStatus('success');
      setEmail('');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Ошибка сервера');
      setStatus('error');
    }
  }

  return (
    <section id="waitlist" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <div
          className="rounded-3xl p-12 sm:p-16 text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--line-strong)',
            backgroundImage:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(31,227,194,0.07) 0%, transparent 70%)',
          }}
        >
          <p className="eyebrow justify-center mb-6">Ранний доступ</p>
          <h2
            className="font-display font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
          >
            Войти в лист ожидания
          </h2>
          <p
            className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ color: 'var(--text-dim)' }}
          >
            Откроем первый доступ для выездных специалистов в Минске. Первые пользователи
            получат расширенный trial и прямой канал обратной связи с командой.
          </p>

          {status === 'success' ? (
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
              style={{ background: 'var(--teal-soft)', border: '1px solid var(--teal-line)' }}
            >
              <CheckCircle2 size={20} style={{ color: 'var(--teal)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {message}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                role="group"
                aria-label="Форма подписки на лист ожидания"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setValidationError(''); }}
                    placeholder="you@example.com"
                    disabled={status === 'loading'}
                    aria-label="Email адрес"
                    aria-describedby={validationError ? 'email-error' : undefined}
                    aria-invalid={!!validationError}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none"
                    style={{
                      background: 'var(--surface-2)',
                      border: `1px solid ${validationError ? 'var(--magenta)' : 'var(--line-strong)'}`,
                      color: 'var(--text)',
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  />
                  {validationError && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-left px-1"
                      style={{ color: 'var(--magenta)' }}
                      role="alert"
                    >
                      {validationError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Send size={15} />
                  {status === 'loading' ? 'Отправляем…' : 'Оставить заявку'}
                </button>
              </div>

              {status === 'error' && (
                <div
                  className="flex items-center justify-center gap-2 mt-4 text-sm"
                  role="alert"
                >
                  <AlertCircle size={15} style={{ color: 'var(--magenta)' }} />
                  <span style={{ color: 'var(--magenta)' }}>{message}</span>
                </div>
              )}
            </form>
          )}

          <p className="font-mono text-xs mt-6" style={{ color: 'var(--text-mute)' }}>
            // без спама · данные не передаются третьим лицам
          </p>
        </div>
      </div>
    </section>
  );
}
