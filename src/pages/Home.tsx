import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    emoji: '🍖',
    title: 'Track Favorites',
    description:
      'Keep a record of the foods your pet enjoys and watch their preferences evolve',
  },
  {
    emoji: '😢',
    title: 'Note Dislikes',
    description:
      'Remember which foods your pet leaves in the bowl so you know what to avoid next time',
  },
  {
    emoji: '📝',
    title: 'See Patterns',
    description:
      'Discover what works best for your furry friend’s health so you can make informed decisions',
  },
];

const sampleFoods = [
  {
    name: 'Chicken kibble',
    emoji: '🍗',
    reaction: 'Loved It',
    tileClass: 'bg-success-subtle',
    reactionEmoji: '❤️',
  },
  {
    name: 'Beef pâté',
    emoji: '🥩',
    reaction: 'Loved It',
    reactionEmoji: '❤️',
    tileClass: 'bg-success-subtle',
  },
  {
    name: 'Salmon treats',
    emoji: '🐟',
    reaction: 'Meh / Neutral',
    tileClass: '',
    reactionEmoji: '😐',
  },
];

export const Home = () => (
  <>
    <header>
      <nav className="navbar navbar-expand bg-white">
        <div className="container">
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            aria-label="PawsRate Home">
            PawsRate
          </Link>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-light btn-sm me-2" to="/login">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary btn-sm" to="/signup">
                Create Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main className="home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container">
          <div className="row home-hero__row">
            <div className="col-lg-6 home-hero__content">
              <h1 id="home-title">
                <span className="text-gradient">Your pet's food diary,</span>
                <br />
                made simple
              </h1>
              <p className="lead">
                Track your pet's favorite meals and discover what keeps them
                happiest and healthiest.
              </p>
              <div className="home-actions">
                <Link className="btn btn-primary" to="/signup">
                  Get started free{' '}
                  <ArrowRight className="icon" aria-hidden="true" />
                </Link>
                <Link className="btn btn-light" to="/login">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <aside className="card" aria-labelledby="sample-title">
                <header>
                  <p className="card-eyebrow">Sample Diary</p>
                  <h2 id="sample-title" className="card-title text-center">
                    Max’s Favorites
                  </h2>
                </header>
                <ul className="card-reminders">
                  {sampleFoods.map((food) => (
                    <li
                      key={food.name}
                      className={['tile', food.tileClass]
                        .filter(Boolean)
                        .join(' ')}>
                      <span>
                        <span aria-hidden="true">{food.emoji}</span> {food.name}
                      </span>
                      <strong>
                        <span aria-hidden="true">{food.reactionEmoji}</span>{' '}
                        {food.reaction}
                      </strong>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="text-center">
            Everything You Need
          </h2>
          <p className="lead text-center">
            Simple tools to understand and improve your dog's nutrition
          </p>
          <div className="row home-features__row">
            {features.map((feature) => (
              <div key={feature.title} className="col-md-4">
                <article className="card">
                  <span className="card-emoji" aria-hidden="true">
                    {feature.emoji}
                  </span>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-text">{feature.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="start-title">
        <div className="container">
          <div className="card bg-gradient text-white text-center">
            <div className="col-md-8 mx-auto">
              <h2 id="start-title">Ready to understand your fren better?</h2>
              <Link className="btn btn-light" to="/signup">
                Create Account{' '}
                <ArrowRight className="icon" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="text-center py-4 mt-auto">
      <div className="container">
        <p className="text-body-secondary mb-0">
          &copy; 2026 PawsRate. All rights reserved. Made with 🐾 for dog
          lovers.
        </p>
      </div>
    </footer>
  </>
);
