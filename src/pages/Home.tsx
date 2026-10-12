import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    emoji: '🍖',
    title: 'Track Favorites',
    description: 'Keep a record of the foods your pet enjoys.',
  },
  {
    emoji: '😢',
    title: 'Note Dislikes',
    description: 'Remember which foods your pet leaves in the bowl.',
  },
  {
    emoji: '📝',
    title: 'Keep Useful Notes',
    description: 'Record reactions and observations alongside each food.',
  },
];

const sampleFoods = [
  {
    name: 'Chicken kibble',
    emoji: '🍗',
    reaction: 'Loved It',
    tileClass: 'tile-positive',
    reactionEmoji: '❤️',
  },
  {
    name: 'Beef pâté',
    emoji: '🥩',
    reaction: 'Loved It',
    reactionEmoji: '❤️',
    tileClass: 'tile-positive',
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
    <header className="navbar">
      <Link className="link-primary" to="/" aria-label="PawsRate Home">
        PawsRate
      </Link>
      <nav aria-label="Main Navigation">
        <Link className="link-primary" to="/login">
          Sign In
        </Link>{' '}
        <Link className="link-primary" to="/signup">
          Create Account
        </Link>
      </nav>
    </header>

    <main>
      <section className="layout-two-column" aria-labelledby="home-title">
        <div className="column">
          <h1 id="home-title">
            <span className="text-gradient">Your pet's food diary,</span>
            <br />
            made simple
          </h1>
          <p>
            Track every bowl. Remember what your pet loves and what they leave.
          </p>
          <div>
            <Link className="btn btn-primary" to="/signup">
              Create Account <ArrowRight className="icon" aria-hidden="true" />
            </Link>{' '}
            <Link className="btn btn-secondary" to="/login">
              Sign In
            </Link>
          </div>
        </div>
        <div className="column">
          <aside className="card" aria-labelledby="sample-title">
            <header>
              <p className="card-eyebrow">Sample Diary</p>
              <h2 id="sample-title" className="card-title text-center">
                Max’s favorites
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
      </section>

      <section aria-labelledby="features-title">
        <h2 id="features-title" className="text-center">
          Everything You Need
        </h2>
        <div className="column layout-three-column">
          {features.map((feature) => (
            <article key={feature.title} className="card">
              <span className="card-emoji" aria-hidden="true">
                {feature.emoji}
              </span>
              <h3 className="card-title">{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="start-title">
        <div className="column">
          <div className="card bg-gradient text-center">
            <h2 id="start-title" className="text-center">
              Explore your pet’s food diary
            </h2>
            <Link className="btn btn-secondary" to="/signup">
              Create Account <ArrowRight className="icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>

    <footer className="text-center">
      <p>
        &copy; 2026 PawsRate. All rights reserved. Made with 🐾 for dog lovers.
      </p>
    </footer>
  </>
);
