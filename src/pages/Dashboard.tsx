import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { DrawerRateFood } from '../components/DrawerRateFood';
import { Button } from '../components/Button';
import { FormField } from '../components/FormField';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [petName, setPetName] = useState<string>('Peso');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPetNameEditOpen, setIsPetNameEditOpen] = useState(false);
  const [tempPetName, setTempPetName] = useState(petName);
  const petNameDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isPetNameEditOpen) {
      petNameDialogRef.current?.showModal();
    }
  }, [isPetNameEditOpen]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSavePetName = () => {
    if (tempPetName.trim()) {
      setPetName(tempPetName.trim());
      setIsPetNameEditOpen(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard__title">{petName}'s Dash</h1>
        </div>
        <Button
          type="button"
          className="btn-light dashboard__logout"
          onClick={handleLogout}>
          Log out
        </Button>
      </header>

      <section className="dashboard-metrics">
        <div className="dashboard__main">
          <section className="dashboard__panel dashboard__panel--summary">
            <h2>Summary</h2>
          </section>

          <section className="dashboard__panel dashboard__panel--activity">
            <h2>Activity</h2>
          </section>
        </div>

        <aside className="dashboard__sidebar">
          <section className="dashboard__panel dashboard__panel--details">
            <div>
              <h2>Pet Info</h2>
              <Button
                type="button"
                className="btn-light"
                onClick={() => {
                  setTempPetName(petName);
                  setIsPetNameEditOpen(true);
                }}>
                Edit
              </Button>
            </div>
            <p>
              Name: <strong>{petName}</strong>
            </p>
          </section>

          <section className="dashboard__panel dashboard__panel--quick-actions">
            <h2>Quick actions</h2>
            <Button onClick={() => setIsDrawerOpen(true)}>Rate a Food</Button>
          </section>
        </aside>
      </section>
      <section className="dashboard-body">
        <Card />
      </section>

      <DrawerRateFood
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        petName={petName}
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
    </div>
  );
};
