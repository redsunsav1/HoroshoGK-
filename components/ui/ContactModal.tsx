import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  title?: string;
  context?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  onClose,
  title = 'Оставить заявку',
  context
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Заполните все поля');
      return;
    }
    if (!agreed) {
      setError('Необходимо согласие на обработку персональных данных');
      return;
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          context: context || title,
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Ошибка отправки. Попробуйте позже.');
      }
    } catch {
      setError('Ошибка сети. Попробуйте позже.');
    } finally {
      setSending(false);
    }
  };

  if (showPolicy) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPolicy(false)}>
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary">Политика обработки персональных данных</h3>
            <button onClick={() => setShowPolicy(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-secondary space-y-4 leading-relaxed">
            <p><strong>1. Общие положения</strong></p>
            <p>Настоящая Политика обработки персональных данных (далее — Политика) разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных пользователей сайта ГК «Хорошо» (далее — Оператор).</p>
            <p><strong>2. Цели обработки персональных данных</strong></p>
            <p>Оператор обрабатывает персональные данные в целях:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Обработки входящих заявок и запросов от пользователей</li>
              <li>Предоставления информации о жилых комплексах, ценах и условиях приобретения</li>
              <li>Связи с пользователем по телефону и/или электронной почте</li>
              <li>Бронирования объектов недвижимости</li>
            </ul>
            <p><strong>3. Перечень обрабатываемых данных</strong></p>
            <p>Оператор обрабатывает следующие персональные данные: имя, номер телефона.</p>
            <p><strong>4. Правовые основания обработки</strong></p>
            <p>Обработка персональных данных осуществляется на основании согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 ФЗ-152).</p>
            <p><strong>5. Порядок и условия обработки</strong></p>
            <p>Обработка данных осуществляется с соблюдением принципов и правил, предусмотренных ФЗ-152. Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ.</p>
            <p><strong>6. Срок хранения</strong></p>
            <p>Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 3 лет с момента получения.</p>
            <p><strong>7. Права субъекта</strong></p>
            <p>Субъект персональных данных вправе требовать уточнения, блокирования или уничтожения своих данных, обратившись к Оператору по контактным данным, указанным на сайте.</p>
          </div>
          <button
            onClick={() => setShowPolicy(false)}
            className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-accent transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-primary mb-2">Заявка отправлена!</h4>
            <p className="text-secondary text-sm mb-6">Мы свяжемся с вами в ближайшее время.</p>
            <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-accent transition-colors">
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Ваше имя</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Номер телефона</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full px-4 py-3 bg-beige border border-sand rounded-xl focus:outline-none focus:border-accent transition-colors text-primary placeholder:text-secondary/50"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 accent-accent"
              />
              <span className="text-sm text-secondary leading-snug">
                Я согласен(а) на{' '}
                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="text-accent hover:underline"
                >
                  обработку персональных данных
                </button>
                {' '}в соответствии с ФЗ-152
              </span>
            </label>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-accent hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {sending ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
