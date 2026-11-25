import React, { useEffect, useRef, useState } from 'react';
import {
  DrawerRateFood,
  type FormData as FoodFormData,
} from '../components/DrawerRateFood';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';

const RATING_LABELS: Record<string, string> = {
  loved: 'Loved It',
  not_fan: 'Not a Fan',
  neutral: 'Meh / Neutral',
};

type FoodLogFilter = 'all' | 'loved' | 'neutral' | 'not_fan';

const FOOD_LOG_FILTERS: { value: FoodLogFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'loved', label: 'Loved' },
  { value: 'neutral', label: 'Meh' },
  { value: 'not_fan', label: 'Not a Fan' },
];

const FOOD_TYPE_LABELS: Record<string, string> = {
  dry_kibble: 'Dry Kibble',
  wet_food: 'Wet Food',
  raw: 'Raw',
  treat: 'Treat',
};

const RATING_BADGE_CLASSES: Record<string, string> = {
  loved: 'bg-success-subtle text-success-emphasis',
  not_fan: 'bg-danger-subtle text-danger-emphasis',
  neutral: 'bg-secondary-subtle text-secondary-emphasis',
};

const formatFoodDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const dateDaysAgo = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
};

const createSampleFoodEntries = (): FoodFormData[] => [
  {
    foodName: 'Chicken & Rice Kibble',
    rating: 'loved',
    foodType: 'dry_kibble',
    dateTried: dateDaysAgo(3),
    tags: [],
    notes: 'Finished the portion and seemed eager for the next meal.',
  },
  {
    foodName: 'Pumpkin Soft Chews',
    rating: 'not_fan',
    foodType: 'treat',
    dateTried: dateDaysAgo(5),
    tags: [],
    notes: 'Took a few bites, then left the rest.',
  },
  {
    foodName: 'Salmon Wet Food',
    rating: null,
    foodType: 'wet_food',
    dateTried: dateDaysAgo(0),
    tags: [],
    notes: 'Trying it over a few meals; no reaction recorded yet.',
  },
];

const PET_PROFILE_DETAILS = [
  { label: 'Age', value: 'Not provided' },
  { label: 'Weight', value: 'Not provided' },
  { label: 'Diet Notes', value: 'Not provided' },
  { label: 'Known Sensitivities', value: 'Not provided' },
];

export const DashboardPage: React.FC = () => {
  const [petName, setPetName] = useState<string>('Peso');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPetNameEditOpen, setIsPetNameEditOpen] = useState(false);
  const [tempPetName, setTempPetName] = useState(petName);
  const [loggedFoods, setLoggedFoods] = useState<FoodFormData[]>([]);
  const [isSampleDataLoaded, setIsSampleDataLoaded] = useState(false);
  const [activeFoodFilter, setActiveFoodFilter] =
    useState<FoodLogFilter>('all');
  const petNameDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isPetNameEditOpen) {
      petNameDialogRef.current?.showModal();
    }
  }, [isPetNameEditOpen]);

  const ratedFoods = loggedFoods.filter((food) => food.rating !== null);
  const lovedCount = ratedFoods.filter(
    (food) => food.rating === 'loved',
  ).length;
  const loveRate =
    ratedFoods.length > 0
      ? Math.round((lovedCount / ratedFoods.length) * 100)
      : null;
  const chronologicalFoods = loggedFoods
    .map((food, index) => ({ food, index }))
    .sort((a, b) => {
      const dateOrder = b.food.dateTried.localeCompare(a.food.dateTried);
      return dateOrder || b.index - a.index;
    });
  const filteredFoods = chronologicalFoods.filter(
    ({ food }) =>
      activeFoodFilter === 'all' || food.rating === activeFoodFilter,
  );
  const latestFood =
    chronologicalFoods.length > 0 ? chronologicalFoods[0].food : undefined;
  const latestReaction = latestFood
    ? latestFood.rating
      ? (RATING_LABELS[latestFood.rating] ?? 'Not rated')
      : 'Still testing'
    : 'None yet';
  const petMonogram = petName.trim().slice(0, 2).toUpperCase();

  const handleSavePetName = () => {
    if (tempPetName.trim()) {
      setPetName(tempPetName.trim());
      setIsPetNameEditOpen(false);
    }
  };

  const handleOpenPetNameEditor = () => {
    setTempPetName(petName);
    setIsPetNameEditOpen(true);
  };

  const handleSaveFood = (food: FoodFormData) => {
    setLoggedFoods((current) => [...current, food]);
    setActiveFoodFilter('all');
    setIsDrawerOpen(false);
  };

  const handleLoadSampleData = () => {
    setLoggedFoods(createSampleFoodEntries());
    setActiveFoodFilter('all');
    setIsSampleDataLoaded(true);
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard__title">{petName}'s Dash</h1>
      </header>

      <section className="mb-4 px-2" aria-labelledby="pet-profile-title">
        <div className="border rounded-3 p-3">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div
              className="rounded-circle bg-secondary-subtle text-secondary-emphasis d-flex align-items-center justify-content-center flex-shrink-0 p-3 fs-4 fw-semibold"
              aria-hidden="true">
              {petMonogram}
            </div>
            <div className="flex-grow-1">
              <h2 id="pet-profile-title" className="h4 mb-1">
                {petName}
              </h2>
              <span className="badge rounded-pill bg-secondary-subtle text-secondary-emphasis">
                Dog
              </span>
            </div>
            <Button
              type="button"
              size="sm"
              className="btn-light"
              onClick={handleOpenPetNameEditor}>
              Edit Name
            </Button>
          </div>
          <dl className="row row-cols-2 row-cols-lg-4 g-3 mt-3 mb-0">
            {PET_PROFILE_DETAILS.map(({ label, value }) => (
              <div key={label} className="col">
                <dt className="small text-body-secondary mb-1">{label}</dt>
                <dd className="mb-0 text-body-secondary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mb-4 px-2" aria-labelledby="dashboard-summary-title">
        <h2 id="dashboard-summary-title" className="h5 mb-3">
          Summary for {petName}
        </h2>
        <dl className="row g-3 mb-0">
          <div className="col-12 col-sm-4">
            <dt className="small text-body-secondary mb-1">Foods Logged</dt>
            <dd className="fs-4 fw-semibold mb-0 text-nowrap">
              {loggedFoods.length}
            </dd>
          </div>
          <div className="col-12 col-sm-4">
            <dt className="small text-body-secondary mb-1">Loved</dt>
            <dd className="fs-4 fw-semibold mb-0 text-nowrap">{lovedCount}</dd>
            <dd className="small text-body-secondary mb-0">
              {loveRate === null ? 'No ratings yet' : `${loveRate}% of foods`}
            </dd>
          </div>
          <div className="col-12 col-sm-4">
            <dt className="small text-body-secondary mb-1">
              Most Recent Reaction
            </dt>
            <dd className="fs-4 fw-semibold mb-0 text-nowrap">
              {latestReaction}
            </dd>
            <dd className="small text-body-secondary mb-0 text-break">
              {latestFood
                ? latestFood.foodName || 'Unnamed food'
                : 'No foods logged yet'}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mb-4 px-2" aria-labelledby="food-log-title">
        <h2 id="food-log-title" className="h5 mb-3">
          Food Log for {petName}
        </h2>
        {loggedFoods.length > 0 && (
          <div
            className="d-flex flex-wrap gap-2 mb-3"
            role="group"
            aria-label="Filter food log by reaction">
            {FOOD_LOG_FILTERS.map((filter) => (
              <Button
                key={filter.value}
                size="sm"
                className={
                  activeFoodFilter === filter.value
                    ? 'btn-primary'
                    : 'btn-light'
                }
                aria-pressed={activeFoodFilter === filter.value}
                onClick={() => setActiveFoodFilter(filter.value)}>
                {filter.label}
              </Button>
            ))}
          </div>
        )}
        {import.meta.env.DEV && isSampleDataLoaded && (
          <p className="small text-body-secondary" role="status">
            Development sample entries are temporary and clear when you refresh.
          </p>
        )}
        {loggedFoods.length === 0 ? (
          <div className="py-3">
            <h3 className="h6 mb-2">No foods logged yet</h3>
            <p className="mb-3 text-body-secondary">
              Log a food to start tracking what {petName} tries. You can add a
              reaction after seeing how it goes.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button onClick={() => setIsDrawerOpen(true)}>
                Rate a New Food
              </Button>
              {import.meta.env.DEV && (
                <Button className="btn-light" onClick={handleLoadSampleData}>
                  Load Sample Data
                </Button>
              )}
            </div>
          </div>
        ) : filteredFoods.length === 0 ? (
          <div className="py-3">
            <p className="mb-3 text-body-secondary" role="status">
              No foods match this filter. Try another reaction or show all
              foods.
            </p>
            <Button
              className="btn-light"
              onClick={() => setActiveFoodFilter('all')}>
              Show All Foods
            </Button>
          </div>
        ) : (
          <ul
            className="list-group list-group-flush"
            aria-label="Food log entries">
            {filteredFoods.map(({ food, index }) => {
              const ratingLabel = food.rating
                ? (RATING_LABELS[food.rating] ?? 'Not rated')
                : 'Still testing';
              const ratingBadgeClass = food.rating
                ? (RATING_BADGE_CLASSES[food.rating] ??
                  'bg-secondary-subtle text-secondary-emphasis')
                : 'bg-secondary-subtle text-secondary-emphasis';

              return (
                <li key={index} className="list-group-item px-0 py-3">
                  <article>
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                      <h3 className="h6 mb-0 text-break">
                        {food.foodName || 'Unnamed food'}
                      </h3>
                      <span className={`badge ${ratingBadgeClass}`}>
                        {ratingLabel}
                      </span>
                    </div>
                    <div className="d-flex flex-wrap gap-2 small text-body-secondary mb-2">
                      <span>
                        {food.foodType
                          ? (FOOD_TYPE_LABELS[food.foodType] ?? food.foodType)
                          : 'Type not set'}
                      </span>
                      <time dateTime={food.dateTried || undefined}>
                        {food.dateTried
                          ? formatFoodDate(food.dateTried)
                          : 'Date not set'}
                      </time>
                    </div>
                    {food.notes.trim() ? (
                      <p className="mb-0 text-break">{food.notes}</p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {loggedFoods.length > 0 && (
        <Button onClick={() => setIsDrawerOpen(true)}>Rate a New Food</Button>
      )}
      <DrawerRateFood
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        petName={petName}
        onSave={handleSaveFood}
      />

      {isPetNameEditOpen && (
        <dialog
          ref={petNameDialogRef}
          aria-labelledby="pet-name-title"
          onClose={() => setIsPetNameEditOpen(false)}>
          <h2 id="pet-name-title">Update Pet Name</h2>
          <FormField
            id="pet-name"
            label="Pet Name"
            type="text"
            value={tempPetName}
            onChange={(e) => setTempPetName(e.target.value)}
            placeholder="Enter pet name"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSavePetName();
              }
            }}
          />
          <div>
            <Button
              type="button"
              className="btn-light"
              onClick={() => setIsPetNameEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePetName}>Save</Button>
          </div>
        </dialog>
      )}
    </main>
  );
};
