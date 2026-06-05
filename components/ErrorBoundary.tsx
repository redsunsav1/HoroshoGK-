import React from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Render error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-white text-primary flex items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Страница временно не загрузилась</h1>
          <p className="text-secondary mb-8">
            Обновите страницу или перейдите к проекту напрямую.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/projects"
              className="inline-flex justify-center bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors"
            >
              Все проекты
            </a>
            <a
              href="/"
              className="inline-flex justify-center bg-beige text-primary px-6 py-3 rounded-xl font-medium hover:bg-sand transition-colors"
            >
              На главную
            </a>
          </div>
        </div>
      </div>
    );
  }
}
