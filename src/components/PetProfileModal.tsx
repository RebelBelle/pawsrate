import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { FormField } from './FormField';

export interface PetProfile {
  name: string;
  age: string;
  weight: string;
  dietNotes: string;
  knownSensitivities: string;
}

interface PetProfileModalProps {
  profile: PetProfile;
  onSave: (profile: PetProfile) => void;
}

export const PetProfileModal: React.FC<PetProfileModalProps> = ({
  profile,
  onSave,
}) => {
  const [draftProfile, setDraftProfile] = useState(profile);
  const modalRef = useRef<HTMLDivElement>(null);
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const resetProfile = () => setDraftProfile(profile);

    modal.addEventListener('show.bs.modal', resetProfile);
    return () => modal.removeEventListener('show.bs.modal', resetProfile);
  }, [profile]);

  const updateProfileField = (field: keyof PetProfile, value: string) => {
    setDraftProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedProfile = {
      name: draftProfile.name.trim(),
      age: draftProfile.age.trim(),
      weight: draftProfile.weight.trim(),
      dietNotes: draftProfile.dietNotes.trim(),
      knownSensitivities: draftProfile.knownSensitivities.trim(),
    };
    if (!updatedProfile.name) return;

    onSave(updatedProfile);
    dismissButtonRef.current?.click();
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="pet-profile-modal"
      tabIndex={-1}
      aria-labelledby="pet-profile-modal-title"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2 className="modal-title fs-5" id="pet-profile-modal-title">
              Edit Pet Profile
            </h2>
            <button
              ref={dismissButtonRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <FormField
                  id="pet-profile-name"
                  name="name"
                  label="Pet Name"
                  type="text"
                  value={draftProfile.name}
                  onChange={(event) =>
                    updateProfileField('name', event.target.value)
                  }
                  placeholder="Enter pet name"
                  pattern=".*\S.*"
                  title="Enter a pet name"
                  required
                />
              </div>
              <div className="col-md-6">
                <FormField
                  id="pet-profile-age"
                  name="age"
                  label="Age"
                  type="text"
                  value={draftProfile.age}
                  onChange={(event) =>
                    updateProfileField('age', event.target.value)
                  }
                  placeholder="e.g. 4 years"
                />
              </div>
              <div className="col-md-6">
                <FormField
                  id="pet-profile-weight"
                  name="weight"
                  label="Weight"
                  type="text"
                  value={draftProfile.weight}
                  onChange={(event) =>
                    updateProfileField('weight', event.target.value)
                  }
                  placeholder="e.g. 32 lb"
                />
              </div>
              <div className="col-12">
                <FormField
                  as="textarea"
                  id="pet-profile-diet-notes"
                  name="dietNotes"
                  label="Diet Notes"
                  value={draftProfile.dietNotes}
                  onChange={(event) =>
                    updateProfileField('dietNotes', event.target.value)
                  }
                  rows={2}
                  placeholder="Optional dietary details"
                />
              </div>
              <div className="col-12">
                <FormField
                  as="textarea"
                  id="pet-profile-known-sensitivities"
                  name="knownSensitivities"
                  label="Known Sensitivities"
                  value={draftProfile.knownSensitivities}
                  onChange={(event) =>
                    updateProfileField('knownSensitivities', event.target.value)
                  }
                  rows={2}
                  placeholder="Optional ingredients or sensitivities"
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <Button type="button" className="btn-light" data-bs-dismiss="modal">
              Cancel
            </Button>
            <Button type="submit">Save Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
