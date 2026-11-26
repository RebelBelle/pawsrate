import React, { useState } from 'react';
import { Button } from './Button';
import { FormField } from './FormField';
import {
  FoodAutocomplete,
  type FoodAutocompleteOption,
} from './FoodAutocomplete';

interface RatingOption {
  id: string;
  label: string;
}

interface DrawerRateFoodProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  initialFood?: FormData;
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

const createEmptyFormData = (): FormData => ({
  foodName: '',
  rating: null,
  foodType: '',
  dateTried: '',
  tags: [],
  notes: '',
});

const ProductImage: React.FC<{ imageUrl?: string; productName: string }> = ({
  imageUrl,
  productName,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  if (!imageUrl || hasImageError) return null;

  return (
    <img
      className="autocomplete__image"
      src={imageUrl}
      alt={`Product image for ${productName}`}
      loading="lazy"
      onError={() => setHasImageError(true)}
    />
  );
};

export const DrawerRateFood: React.FC<DrawerRateFoodProps> = ({
  isOpen,
  onClose,
  petName,
  initialFood,
  width = '580px',
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>(() =>
    initialFood
      ? { ...initialFood, tags: [...initialFood.tags] }
      : createEmptyFormData(),
  );
  const [selectedProduct, setSelectedProduct] =
    useState<FoodAutocompleteOption | null>(null);
  const isEditing = initialFood !== undefined;

  const handleFoodNameChange = (foodName: string) => {
    setFormData((prev) => ({ ...prev, foodName }));
    setSelectedProduct(null);
  };

  const handleSave = () => {
    onSave?.(formData);
  };

  const handleSelectProduct = (product: FoodAutocompleteOption) => {
    setFormData((prev) => ({ ...prev, foodName: product.displayName }));
    setSelectedProduct(product);
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
            <h2 className="drawer-title">
              {isEditing ? 'Edit Food' : 'Rate a New Food'}
            </h2>
            <p className="drawer-subtitle">
              {isEditing
                ? "Update this food's rating and details."
                : `Add what ${petName} tried, how much they liked it, and any notes`}
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
          <div className="autocomplete-group">
            {isEditing ? (
              <FormField
                id="food-name"
                label="Food Name or Brand"
                type="text"
                placeholder="Enter food name"
                value={formData.foodName}
                readOnly
                aria-describedby="food-name-edit-help"
                onChange={(e) => handleFoodNameChange(e.target.value)}
              />
            ) : (
              <FoodAutocomplete
                id="food-name"
                label="Food Name or Brand"
                value={formData.foodName}
                options={[]}
                selectedProduct={selectedProduct}
                onChange={handleFoodNameChange}
                onSelect={handleSelectProduct}
              />
            )}
            {selectedProduct && (
              <section
                className="autocomplete__selection"
                aria-labelledby="selected-product-title">
                <div className="autocomplete__selection-header">
                  <div>
                    <h3
                      id="selected-product-title"
                      className="autocomplete__selection-title">
                      {selectedProduct.displayName}
                    </h3>
                    <p className="autocomplete__note">
                      Optional product details may be incomplete. You can save
                      this match without them.
                    </p>
                  </div>
                  <ProductImage
                    key={selectedProduct.id}
                    imageUrl={selectedProduct.imageUrl}
                    productName={selectedProduct.displayName}
                  />
                </div>
                {selectedProduct.ingredients && (
                  <div>
                    <h4 className="autocomplete__detail-title">Ingredients</h4>
                    <p className="autocomplete__detail-value">
                      {selectedProduct.ingredients}
                    </p>
                  </div>
                )}
                {(selectedProduct.categories?.length ?? 0) > 0 && (
                  <div>
                    <h4 className="autocomplete__detail-title">Categories</h4>
                    <p className="autocomplete__detail-value">
                      {selectedProduct.categories
                        ?.map((category) => category.split(':').pop())
                        .join(', ')}
                    </p>
                  </div>
                )}
                {selectedProduct.labels && (
                  <div>
                    <h4 className="autocomplete__detail-title">Labels</h4>
                    <p className="autocomplete__detail-value">
                      {selectedProduct.labels}
                    </p>
                  </div>
                )}
                {!selectedProduct.imageUrl &&
                  !selectedProduct.ingredients &&
                  !selectedProduct.categories?.length &&
                  !selectedProduct.labels && (
                    <p className="autocomplete__note">
                      No optional product details are available. You can still
                      save this match.
                    </p>
                  )}
              </section>
            )}
          </div>
          {isEditing && (
            <p id="food-name-edit-help" className="form-text">
              Food name and brand cannot be changed here. Add a new food to
              track a different one.
            </p>
          )}

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
          <Button
            disabled={!isEditing && selectedProduct === null}
            onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Save'}
          </Button>
        </div>
      </div>
    </>
  );
};
