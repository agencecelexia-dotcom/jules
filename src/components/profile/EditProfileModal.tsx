"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import type { HandicapType, PersonConcerned } from "@/lib/types";
import {
  HANDICAP_LABELS,
  PERSON_CONCERNED_LABELS,
  BUSINESS_CATEGORIES,
} from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ALL_HANDICAP_TYPES: HandicapType[] = [
  "MOTEUR",
  "VISUEL",
  "AUDITIF",
  "MENTAL",
  "PSYCHIQUE",
  "COGNITIF",
  "POLYHANDICAP",
  "AUTRE",
];

const ALL_PERSON_CONCERNED: PersonConcerned[] = [
  "SELF",
  "CHILD",
  "PARENT",
  "SPOUSE",
  "OTHER",
];

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { currentUser } = useApp();
  const isFamily = currentUser.role === "FAMILY";
  const isBusiness = currentUser.role === "BUSINESS";

  // Family fields
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio ?? "");
  const [city, setCity] = useState(
    currentUser.familyProfile?.city ?? currentUser.businessProfile?.city ?? ""
  );
  const [department, setDepartment] = useState(
    currentUser.familyProfile?.department ??
      currentUser.businessProfile?.department ??
      ""
  );
  const [handicapTypes, setHandicapTypes] = useState<HandicapType[]>(
    currentUser.familyProfile?.handicapTypes ?? []
  );
  const [personConcerned, setPersonConcerned] = useState<PersonConcerned>(
    currentUser.familyProfile?.personConcerned ?? "SELF"
  );

  // Business fields
  const [companyName, setCompanyName] = useState(
    currentUser.businessProfile?.companyName ?? ""
  );
  const [description, setDescription] = useState(
    currentUser.businessProfile?.description ?? ""
  );
  const [website, setWebsite] = useState(
    currentUser.businessProfile?.website ?? ""
  );
  const [categories, setCategories] = useState<string[]>(
    currentUser.businessProfile?.categories ?? []
  );
  const [handicapTypesSupported, setHandicapTypesSupported] = useState<
    HandicapType[]
  >(currentUser.businessProfile?.handicapTypesSupported ?? []);

  const toggleHandicapType = (type: HandicapType) => {
    setHandicapTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleHandicapTypeSupported = (type: HandicapType) => {
    setHandicapTypesSupported((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCategory = (value: string) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: we can't actually mutate the static mock user, so just show a toast
    toast.success("Profil mis a jour !");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isFamily && (
            <>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-bio">Bio</Label>
                <Textarea
                  id="edit-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Parlez de vous..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-city">Ville</Label>
                  <Input
                    id="edit-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Paris"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Departement</Label>
                  <Input
                    id="edit-department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="75"
                  />
                </div>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">
                  Types de handicap
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_HANDICAP_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={handicapTypes.includes(type)}
                        onCheckedChange={() => toggleHandicapType(type)}
                      />
                      {HANDICAP_LABELS[type]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="edit-person-concerned">
                  Personne concernee
                </Label>
                <select
                  id="edit-person-concerned"
                  value={personConcerned}
                  onChange={(e) =>
                    setPersonConcerned(e.target.value as PersonConcerned)
                  }
                  className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {ALL_PERSON_CONCERNED.map((pc) => (
                    <option key={pc} value={pc}>
                      {PERSON_CONCERNED_LABELS[pc]}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {isBusiness && (
            <>
              <div className="space-y-2">
                <Label htmlFor="edit-company-name">Nom de l&apos;entreprise</Label>
                <Input
                  id="edit-company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nom de votre entreprise"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Decrivez votre entreprise..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-biz-city">Ville</Label>
                  <Input
                    id="edit-biz-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lyon"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-biz-department">Departement</Label>
                  <Input
                    id="edit-biz-department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="69"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-website">Site web</Label>
                <Input
                  id="edit-website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.example.com"
                />
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Categories</legend>
                <div className="grid grid-cols-2 gap-2">
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <label
                      key={cat.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={categories.includes(cat.value)}
                        onCheckedChange={() => toggleCategory(cat.value)}
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">
                  Types de handicap pris en charge
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_HANDICAP_TYPES.map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={handicapTypesSupported.includes(type)}
                        onCheckedChange={() =>
                          toggleHandicapTypeSupported(type)
                        }
                      />
                      {HANDICAP_LABELS[type]}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg gradient-warm text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Enregistrer
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
