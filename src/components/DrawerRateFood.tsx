import React, { useState } from 'react';
import { Button } from './Button';
import { FormField } from './FormField';

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
        <div className="drawer-header" data-bs-theme="dark">
          <div>
            <h2 className="drawer-title">Rate a New Food</h2>
            <p className="drawer-subtitle">
              Add what {petName} tried, how much they liked it, and any notes
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close Drawer"></button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Food Name Field */}
          <FormField
            id="food-name"
            label="Food Name or Brand"
            type="text"
            placeholder="Enter food name"
            value={formData.foodName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, foodName: e.target.value }))
            }
          />

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
              <FormField
                as="select"
                id="food-type"
                label="Food Type"
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
              </FormField>
              <FormField
                id="date-tried"
                label="Date Tried"
                type="date"
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

          {/* Notes Section */}
          <FormField
            as="textarea"
            id="food-notes"
            label="Notes (Optional)"
            placeholder="Any observations or notes"
            rows={3}
            value={formData.notes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </div>

        {/* Footer Actions */}
        <div className="drawer-footer">
          <Button className="btn-light" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </>
  );
};
