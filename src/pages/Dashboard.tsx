import React, { useState } from 'react';
import { MoreHorizontal, Pencil, X } from 'lucide-react';
import {
  DrawerRateFood,
  type FormData as FoodFormData,
} from '../components/DrawerRateFood';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';
import {
  PetProfileModal,
  type PetProfile,
} from '../components/PetProfileModal';

const RATING_LABELS: Record<string, string> = {
  loved: 'Loved It',
  not_fan: 'Not a Fan',
  neutral: 'Meh / Neutral',
};

type FoodLogFilter = 'all' | 'loved' | 'neutral' | 'not_fan' | 'still_testing';

const FOOD_LOG_FILTERS: { value: FoodLogFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'loved', label: 'Loved' },
  { value: 'neutral', label: 'Meh' },
  { value: 'not_fan', label: 'Not a Fan' },
  { value: 'still_testing', label: 'Still Testing' },
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
    notes: 'Trying it over a few meals; no rating recorded yet.',
  },
];

export const DashboardPage: React.FC = () => {
  const [petProfile, setPetProfile] = useState<PetProfile>({
    name: 'Peso',
    age: '',
    weight: '',
    dietNotes: '',
    knownSensitivities: '',
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSession, setDrawerSession] = useState(0);
  const [editingFoodIndex, setEditingFoodIndex] = useState<number | null>(null);
  const [pendingFoodDeletion, setPendingFoodDeletion] = useState<{
    index: number;
    foodName: string;
  } | null>(null);
  const [loggedFoods, setLoggedFoods] = useState<FoodFormData[]>([]);
  const [isSampleDataLoaded, setIsSampleDataLoaded] = useState(false);
  const [activeFoodFilters, setActiveFoodFilters] = useState<FoodLogFilter[]>([
    'all',
  ]);
  const [foodSearchQuery, setFoodSearchQuery] = useState('');

  const petName = petProfile.name;
  const initialFood =
    editingFoodIndex === null ? undefined : loggedFoods[editingFoodIndex];
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
  const normalizedFoodSearchQuery = foodSearchQuery.trim().toLowerCase();
  const hasActiveFoodLogFilters =
    normalizedFoodSearchQuery.length > 0 || !activeFoodFilters.includes('all');
  const filteredFoods = chronologicalFoods.filter(({ food }) => {
    const matchesFilter =
      activeFoodFilters.includes('all') ||
      activeFoodFilters.some((filter) =>
        filter === 'still_testing'
          ? food.rating === null
          : food.rating === filter,
      );
    const searchableText = `${food.foodName} ${food.notes}`.toLowerCase();
    const matchesSearch = searchableText.includes(normalizedFoodSearchQuery);

    return matchesFilter && matchesSearch;
  });
  const latestFood =
    chronologicalFoods.length > 0 ? chronologicalFoods[0].food : undefined;
  const latestRating = latestFood
    ? latestFood.rating
      ? (RATING_LABELS[latestFood.rating] ?? 'Not rated')
      : 'Still testing'
    : 'None yet';
  const petMonogram = petName.trim().slice(0, 2).toUpperCase();
  const petProfileDetails = [
    { label: 'Age', value: petProfile.age || 'Not provided' },
    { label: 'Weight', value: petProfile.weight || 'Not provided' },
    { label: 'Diet Notes', value: petProfile.dietNotes || 'Not provided' },
    {
      label: 'Known Sensitivities',
      value: petProfile.knownSensitivities || 'Not provided',
    },
  ];

  const handleSavePetProfile = (updatedPetProfile: PetProfile) =>
    setPetProfile(updatedPetProfile);

  const handleFoodFilterToggle = (filter: FoodLogFilter) => {
    if (filter === 'all') {
      setActiveFoodFilters(['all']);
      return;
    }

    setActiveFoodFilters((currentFilters) => {
      const nextFilters = currentFilters.includes(filter)
        ? currentFilters.filter((currentFilter) => currentFilter !== filter)
        : [
            ...currentFilters.filter(
              (currentFilter) => currentFilter !== 'all',
            ),
            filter,
          ];

      return nextFilters.length === 0 ||
        nextFilters.length === FOOD_LOG_FILTERS.length - 1
        ? ['all']
        : nextFilters;
    });
  };

  const handleClearFoodLogFilters = () => {
    setFoodSearchQuery('');
    setActiveFoodFilters(['all']);
  };

  const handleSaveFood = (food: FoodFormData) => {
    setLoggedFoods((current) =>
      editingFoodIndex === null
        ? [...current, food]
        : current.map((currentFood, index) =>
            index === editingFoodIndex ? food : currentFood,
          ),
    );
    setActiveFoodFilters(['all']);
    setEditingFoodIndex(null);
    setIsDrawerOpen(false);
  };

  const handleOpenNewFood = () => {
    setEditingFoodIndex(null);
    setDrawerSession((currentSession) => currentSession + 1);
    setIsDrawerOpen(true);
  };

  const handleEditFood = (index: number) => {
    setEditingFoodIndex(index);
    setDrawerSession((currentSession) => currentSession + 1);
    setIsDrawerOpen(true);
  };

  const handleConfirmFoodDeletion = () => {
    if (!pendingFoodDeletion) return;

    setLoggedFoods((current) =>
      current.filter((_, index) => index !== pendingFoodDeletion.index),
    );

    if (loggedFoods.length === 1) {
      setFoodSearchQuery('');
      setActiveFoodFilters(['all']);
      setIsSampleDataLoaded(false);
    }
  };

  const handleLoadSampleData = () => {
    setLoggedFoods(createSampleFoodEntries());
    setActiveFoodFilters(['all']);
    setIsSampleDataLoaded(true);
  };

  return (
    <div className="dashboard">
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
              className="btn-light btn-icon rounded-circle"
              aria-label="Edit Pet Profile"
              data-bs-toggle="modal"
              data-bs-target="#pet-profile-modal">
              <Pencil size={16} aria-hidden="true" />
            </Button>
          </div>
          <dl className="row row-cols-2 row-cols-lg-4 g-3 mt-3 mb-0">
            {petProfileDetails.map(({ label, value }) => (
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
              {loveRate === null
                ? 'No ratings yet'
                : `${loveRate}% of rated foods`}
            </dd>
          </div>
          <div className="col-12 col-sm-4">
            <dt className="small text-body-secondary mb-1">Latest Rating</dt>
            <dd className="fs-4 fw-semibold mb-0 text-nowrap">
              {latestRating}
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
          {petName}'s Food Log
        </h2>
        {loggedFoods.length > 0 && (
          <div className="d-flex flex-column flex-md-row align-items-md-end gap-3 mb-3">
            <div className="flex-grow-1">
              <FormField
                id="food-log-search"
                label="Search Food Log"
                type="search"
                placeholder="Food name, brand, or notes"
                value={foodSearchQuery}
                onChange={(event) => setFoodSearchQuery(event.target.value)}
              />
            </div>
            <div className="d-flex flex-wrap align-items-center gap-2">
              <div
                className="d-flex flex-wrap gap-2"
                role="group"
                aria-label="Filter food log by rating">
                {FOOD_LOG_FILTERS.map((filter) => (
                  <Button
                    key={filter.value}
                    size="sm"
                    className={
                      activeFoodFilters.includes(filter.value)
                        ? 'btn-primary'
                        : 'btn-light'
                    }
                    aria-pressed={activeFoodFilters.includes(filter.value)}
                    onClick={() => handleFoodFilterToggle(filter.value)}>
                    {filter.label}
                  </Button>
                ))}
              </div>
              <Button
                size="sm"
                className="btn-light ms-auto"
                aria-label="Clear Search and Filters"
                disabled={!hasActiveFoodLogFilters}
                onClick={handleClearFoodLogFilters}>
                <X size={16} aria-hidden="true" />
              </Button>
            </div>
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
              rating after seeing how it goes.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Button onClick={handleOpenNewFood}>Rate a New Food</Button>
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
              No foods match your filters.
            </p>
            <Button className="btn-light" onClick={handleClearFoodLogFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <ul className="list-group" aria-label="Food log entries">
            {filteredFoods.map(({ food, index }) => {
              const ratingLabel = food.rating
                ? (RATING_LABELS[food.rating] ?? 'Not rated')
                : 'Still testing';
              const ratingBadgeClass = food.rating
                ? (RATING_BADGE_CLASSES[food.rating] ??
                  'bg-secondary-subtle text-secondary-emphasis')
                : 'bg-secondary-subtle text-secondary-emphasis';

              return (
                <li key={index} className="list-group-item">
                  <article>
                    <div className="d-flex align-items-start gap-2 mb-2">
                      <div className="d-flex flex-wrap align-items-center gap-2 flex-grow-1">
                        <h3 className="h6 mb-0 text-break">
                          {food.foodName || 'Unnamed food'}
                        </h3>
                        <span className={`badge ${ratingBadgeClass}`}>
                          {ratingLabel}
                        </span>
                      </div>
                      <div className="dropdown flex-shrink-0">
                        <Button
                          type="button"
                          className="btn-light btn-icon rounded-circle"
                          aria-label={`Actions for ${food.foodName || 'food'}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <MoreHorizontal size={18} aria-hidden="true" />
                        </Button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              type="button"
                              className="dropdown-item"
                              onClick={() => handleEditFood(index)}>
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              className="dropdown-item text-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#delete-food-modal"
                              onClick={() =>
                                setPendingFoodDeletion({
                                  index,
                                  foodName: food.foodName,
                                })
                              }>
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
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
        <Button onClick={handleOpenNewFood}>Rate a New Food</Button>
      )}
      <DrawerRateFood
        key={drawerSession}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        petName={petName}
        initialFood={initialFood}
        onSave={handleSaveFood}
      />
      <div
        className="modal fade"
        id="delete-food-modal"
        tabIndex={-1}
        aria-labelledby="delete-food-modal-title"
        aria-describedby="delete-food-modal-description"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="delete-food-modal-title">
                Are you sure?
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="mb-0" id="delete-food-modal-description">
                Once you delete{' '}
                <strong>{pendingFoodDeletion?.foodName || 'this food'}</strong>,{' '}
                you can't undo it.
              </p>
            </div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn-light"
                data-bs-dismiss="modal">
                Cancel
              </Button>
              <Button
                type="button"
                className="btn-danger"
                data-bs-dismiss="modal"
                disabled={!pendingFoodDeletion}
                onClick={handleConfirmFoodDeletion}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PetProfileModal profile={petProfile} onSave={handleSavePetProfile} />
    </div>
  );
};
