"use client";

import { useState, useEffect } from "react";
import type { Activity, HandicapType } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { HANDICAP_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

const DURATION_OPTIONS = [
  { value: "30min", label: "30 minutes" },
  { value: "45min", label: "45 minutes" },
  { value: "1h", label: "1 heure" },
  { value: "1h30", label: "1h30" },
  { value: "2h", label: "2 heures" },
];

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

interface ActivityFormProps {
  activity?: Activity;
  businessId: string;
  open: boolean;
  onClose: () => void;
}

export function ActivityForm({ activity, businessId, open, onClose }: ActivityFormProps) {
  const { addActivity, updateActivity } = useApp();
  const isEditing = !!activity;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceEuros, setPriceEuros] = useState("");
  const [duration, setDuration] = useState("1h");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [handicapTypes, setHandicapTypes] = useState<HandicapType[]>([]);

  useEffect(() => {
    if (activity) {
      setTitle(activity.title);
      setDescription(activity.description);
      setPriceEuros((activity.price / 100).toString());
      setDuration(activity.duration);
      setMaxParticipants(activity.maxParticipants.toString());
      setHandicapTypes([...activity.handicapTypesCompatible]);
    } else {
      setTitle("");
      setDescription("");
      setPriceEuros("");
      setDuration("1h");
      setMaxParticipants("");
      setHandicapTypes([]);
    }
  }, [activity, open]);

  const toggleHandicapType = (type: HandicapType) => {
    setHandicapTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceInCents = Math.round(parseFloat(priceEuros) * 100);

    if (isEditing && activity) {
      updateActivity(activity.id, {
        title,
        description,
        price: priceInCents,
        duration,
        maxParticipants: parseInt(maxParticipants, 10),
        handicapTypesCompatible: handicapTypes,
      });
      toast.success("Activite modifiee avec succes");
    } else {
      addActivity({
        businessId,
        title,
        description,
        price: priceInCents,
        duration,
        maxParticipants: parseInt(maxParticipants, 10),
        handicapTypesCompatible: handicapTypes,
        photos: [],
        isActive: true,
      });
      toast.success("Activite creee avec succes");
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Modifier l'activite" : "Nouvelle activite"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity-title">Nom de l&apos;activite</Label>
            <Input
              id="activity-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Cours de natation adapte"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-description">Description</Label>
            <Textarea
              id="activity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Decrivez l'activite en detail..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activity-price">Prix (euros)</Label>
              <Input
                id="activity-price"
                type="number"
                min="0"
                step="0.01"
                value={priceEuros}
                onChange={(e) => setPriceEuros(e.target.value)}
                placeholder="45.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity-duration">Duree</Label>
              <select
                id="activity-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-max-participants">Places maximum</Label>
            <Input
              id="activity-max-participants"
              type="number"
              min="1"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              placeholder="10"
              required
            />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Types de handicap compatibles</legend>
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {isEditing ? "Enregistrer" : "Creer l'activite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
