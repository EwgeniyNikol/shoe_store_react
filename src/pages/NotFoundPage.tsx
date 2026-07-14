import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container">
      <section className="text-center">
        <h2>Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <Link to="/" className="btn btn-outline-primary">На главную</Link>
      </section>
    </div>
  );
}

export default NotFoundPage;