import React, { useState } from 'react';
import './DrawerRateFood.scss';

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
  { id: 'loved', label: 'Loved it' },
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
      {isOpen && (
        <div className="drawer-overlay" onClick={onClose} />
      )}
      <div
        className={`drawer-panel ${isOpen ? 'drawer-panel--open' : ''}`}
        style={{ width }}
      >
        {/* Header */}
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">Rate a New Food</h2>
            <p className="drawer-subtitle">
              Add what {petName} tried, how much they liked it, and any notes
            </p>
          </div>
          <button
            className="drawer-close"
            onClick={onClose}
            aria-label="Close drawer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {/* Food Name Field */}
          <div className="form-section">
            <label className="form-label">Food Name or Brand</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter food name"
              value={formData.foodName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, foodName: e.target.value }))
              }
            />
          </div>

          {/* Rating Section */}
          <div className="form-section">
            <label className="form-label">How did {petName} like it?</label>
            <div className="rating-options">
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`rating-button ${formData.rating === option.id ? 'rating-button--selected' : ''}`}
                  onClick={() => handleRatingChange(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="form-section">
            <h3 className="form-section-title">Details (optional)</h3>
            <div className="form-row">
              <div className="form-field-group">
                <label className="form-label">Food Type</label>
                <select
                  className="form-select"
                  value={formData.foodType}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, foodType: e.target.value }))
                  }
                >
                  <option value="">Select type</option>
                  <option value="dry_kibble">Dry Kibble</option>
                  <option value="wet_food">Wet Food</option>
                  <option value="raw">Raw</option>
                  <option value="treat">Treat</option>
                </select>
              </div>
              <div className="form-field-group">
                <label className="form-label">Date Tried</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dateTried}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, dateTried: e.target.value }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="form-section">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Any observations or notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="drawer-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};