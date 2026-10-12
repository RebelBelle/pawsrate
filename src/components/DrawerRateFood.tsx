import React, { useState } from 'react';

interface RatingOption {
  id: string;
  label: string;
}

interface DrawerRateFoodProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  width?: string;
  onSave?: (formData: FormData) => void;
}

export interface FormData {
  foodName: string;
  rating: string | null;
  foodType: string;
  dateTried: string;
  tags: string[];
  notes: string;
}

const RATING_OPTIONS: RatingOption[] = [
  { id: 'loved', label: 'Loved It' },
  { id: 'not_fan', label: 'Not a Fan' },
  { id: 'neutral', label: 'Meh / Neutral' },
];

export const DrawerRateFood: React.FC<DrawerRateFoodProps> = ({
  isOpen,
  onClose,
  petName,
  width = '580px',
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>({
    foodName: '',
    rating: null,
    foodType: '',
    dateTried: '',
    tags: [],
    notes: '',
  });

  const handleSave = () => {
    onSave?.(formData);
  };

  const handleRatingChange = (ratingId: string) => {
    setFormData((prev) => ({
      ...prev,
      rating: prev.rating === ratingId ? null : ratingId,
    }));
  };

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      <div
        className={`drawer-panel ${isOpen ? 'drawer-panel--open' : ''}`}
        style={{ width }}>
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Rate a New Food</h2>
            <p className="drawer-subtitle">
              Add what {petName} tried, how much they liked it, and any notes
            </p>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close Drawer">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Food Name Field */}
          <div className="form-field">
            <label className="form-label" htmlFor="food-name">
              Food Name or Brand
            </label>
            <div className="form-input-wrapper">
              <input
                id="food-name"
                type="text"
                className="form-input"
                placeholder="Enter food name"
                value={formData.foodName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, foodName: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Rating Section */}
          <div className="form-section">
            <p id="food-rating-label" className="form-section-title">
              How did {petName} like it?
            </p>
            <div
              className="rating-options"
              role="group"
              aria-labelledby="food-rating-label">
              {RATING_OPTIONS.map((option) => (
                <button
                  type="button"
                  aria-pressed={formData.rating === option.id}
                  key={option.id}
                  className={`rating-button ${formData.rating === option.id ? 'rating-button--selected' : ''}`}
                  onClick={() => handleRatingChange(option.id)}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="form-section">
            <h3 className="form-section-title">Details (Optional)</h3>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="food-type">
                  Food Type
                </label>
                <div className="form-input-wrapper">
                  <select
                    id="food-type"
                    className="form-input"
                    value={formData.foodType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        foodType: e.target.value,
                      }))
                    }>
                    <option value="">Select type</option>
                    <option value="dry_kibble">Dry Kibble</option>
                    <option value="wet_food">Wet Food</option>
                    <option value="raw">Raw</option>
                    <option value="treat">Treat</option>
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="date-tried">
                  Date Tried
                </label>
                <div className="form-input-wrapper">
                  <input
                    id="date-tried"
                    type="date"
                    className="form-input"
                    value={formData.dateTried}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dateTried: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="form-field">
            <label className="form-label" htmlFor="food-notes">
              Notes (Optional)
            </label>
            <div className="form-input-wrapper">
              <textarea
                id="food-notes"
                className="form-input form-textarea"
                placeholder="Any observations or notes..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="drawer-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
