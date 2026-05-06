import React, { useState } from 'react';
import { Card } from './components/Card';
import { DrawerRateFood } from './components/DrawerRateFood';
import { Button } from './components/Button';

interface DashboardPageProps {
  petName: string;
  onPetNameChange: (name: string) => void;
  onLogout?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  petName,
  onPetNameChange,
  onLogout,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPetNameEditOpen, setIsPetNameEditOpen] = useState(false);
  const [tempPetName, setTempPetName] = useState(petName);

  const handleSavePetName = () => {
    if (tempPetName.trim()) {
      onPetNameChange(tempPetName.trim());
      setIsPetNameEditOpen(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard__eyebrow">Dashboard</p>
          <h1 className="dashboard__title">{petName}'s Dash</h1>
        </div>
        {onLogout && (
          <button type="button" className="dashboard__logout" onClick={onLogout}>
            Log out
          </button>
        )}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Pet Info</h2>
              <button
                onClick={() => setIsPetNameEditOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-primary)',
                  textDecoration: 'underline',
                }}
              >
                Edit
              </button>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: 'var(--font-size-base)' }}>
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

      {/* Pet Name Edit Modal */}
      {isPetNameEditOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={() => setIsPetNameEditOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-xl)',
              maxWidth: '400px',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>Update Pet Name</h2>
            <input
              type="text"
              value={tempPetName}
              onChange={(e) => setTempPetName(e.target.value)}
              placeholder="Enter pet name"
              style={{
                width: '100%',
                padding: 'var(--space-md) var(--space-lg)',
                fontSize: 'var(--font-size-base)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxSizing: 'border-box',
                marginBottom: 'var(--space-xl)',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSavePetName();
                }
              }}
            />
            <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
              <button
                onClick={() => setIsPetNameEditOpen(false)}
                style={{
                  flex: 1,
                  padding: 'var(--space-md) var(--space-lg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-base)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePetName}
                style={{
                  flex: 1,
                  padding: 'var(--space-md) var(--space-lg)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-base)',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
