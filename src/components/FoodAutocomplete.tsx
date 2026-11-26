import React, { useId, useState } from 'react';
import { FormField } from './FormField';

const MIN_QUERY_LENGTH = 2;

export interface FoodAutocompleteOption {
  id: string;
  displayName: string;
  productName?: string;
  brand?: string;
  ingredients?: string;
  imageUrl?: string;
  categories?: string[];
  labels?: string;
}

interface FoodAutocompleteProps {
  id: string;
  label: string;
  value: string;
  options?: FoodAutocompleteOption[];
  selectedProduct: FoodAutocompleteOption | null;
  onChange: (value: string) => void;
  onSelect: (product: FoodAutocompleteOption) => void;
}

export const FoodAutocomplete: React.FC<FoodAutocompleteProps> = ({
  id,
  label,
  value,
  options = [],
  selectedProduct,
  onChange,
  onSelect,
}) => {
  const generatedId = useId();
  const listboxId = `${generatedId}-food-options`;
  const helpId = `${generatedId}-food-help`;
  const [isOpen, setIsOpen] = useState(
    () => value.trim().length >= MIN_QUERY_LENGTH && selectedProduct === null,
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const query = value.trim();
  const hasEnoughCharacters = query.length >= MIN_QUERY_LENGTH;
  const isDropdownOpen =
    isOpen && hasEnoughCharacters && selectedProduct === null;

  const handleSelect = (product: FoodAutocompleteOption) => {
    setIsOpen(false);
    setActiveIndex(-1);
    onSelect(product);
  };

  const handleInputChange = (nextValue: string) => {
    const nextQuery = nextValue.trim();
    onChange(nextValue);
    setActiveIndex(-1);
    setIsOpen(nextQuery.length >= MIN_QUERY_LENGTH);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && isDropdownOpen) {
      event.preventDefault();
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!isDropdownOpen || options.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((current) =>
          current >= options.length - 1 ? 0 : current + 1,
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((current) =>
          current <= 0 ? options.length - 1 : current - 1,
        );
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
        if (activeIndex >= 0) {
          event.preventDefault();
          handleSelect(options[activeIndex]);
        }
        break;
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="autocomplete">
      <div className="autocomplete__field" onBlur={handleBlur}>
        <FormField
          id={id}
          label={label}
          type="search"
          placeholder="Search food name or brand"
          autoComplete="off"
          value={value}
          aria-describedby={helpId}
          aria-autocomplete="list"
          aria-expanded={isDropdownOpen}
          aria-controls={isDropdownOpen ? listboxId : undefined}
          aria-activedescendant={
            isDropdownOpen && activeIndex >= 0
              ? `${listboxId}-${activeIndex}`
              : undefined
          }
          role="combobox"
          onFocus={() => {
            if (hasEnoughCharacters && !selectedProduct) setIsOpen(true);
          }}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {isDropdownOpen && (
          <div className="dropdown-menu show autocomplete__menu">
            {options.length === 0 ? (
              <p className="autocomplete__message" role="status">
                No suggestions are available yet.
              </p>
            ) : (
              <p className="autocomplete__message" role="status">
                Select a product to continue.
              </p>
            )}
            <ul
              id={listboxId}
              className="autocomplete__options"
              role="listbox"
              aria-label="Food suggestions">
              {options.map((product, index) => (
                <li
                  id={`${listboxId}-${index}`}
                  key={product.id}
                  className={[
                    'dropdown-item',
                    'autocomplete__option',
                    activeIndex === index ? 'autocomplete__option--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => handleSelect(product)}>
                  <span>{product.productName ?? product.displayName}</span>
                  {product.productName && product.brand && (
                    <span className="autocomplete__option-meta">
                      {product.brand}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p id={helpId} className="form-text">
        Type at least two characters, then select a suggestion to continue.
      </p>
    </div>
  );
};
