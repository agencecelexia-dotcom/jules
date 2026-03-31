"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Clock,
  Users,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Check,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn, formatPrice } from "@/lib/utils";
import type { Activity } from "@/lib/types";

interface BookingFormProps {
  businessId: string;
  activities: Activity[];
}

const STEP_LABELS = [
  "Activite",
  "Date",
  "Participants",
  "Recapitulatif",
];

export function BookingForm({ businessId, activities }: BookingFormProps) {
  const router = useRouter();
  const { createBooking, currentUser } = useApp();

  const [step, setStep] = useState(0);
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [participants, setParticipants] = useState(1);

  const selectedActivity = useMemo(
    () => activities.find((a) => a.id === selectedActivityId),
    [activities, selectedActivityId]
  );

  const totalPrice = useMemo(() => {
    if (!selectedActivity) return 0;
    return selectedActivity.price * participants;
  }, [selectedActivity, participants]);

  const canGoNext = useMemo(() => {
    switch (step) {
      case 0:
        return !!selectedActivityId;
      case 1:
        return !!selectedDate;
      case 2:
        return participants >= 1;
      case 3:
        return true;
      default:
        return false;
    }
  }, [step, selectedActivityId, selectedDate, participants]);

  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  function handlePrev() {
    if (step > 0) setStep(step - 1);
  }

  function handleConfirm() {
    if (!selectedActivity || !selectedDate) return;

    createBooking({
      activityId: selectedActivity.id,
      userId: currentUser.id,
      date: selectedDate.toISOString(),
      participants,
      totalPrice,
    });

    toast.success("Reservation confirmee !");
    router.push("/mes-reservations");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "hidden text-xs sm:block",
                i === step ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={cn(
                  "h-px w-6 sm:w-10",
                  i < step ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select activity */}
      {step === 0 && (
        <fieldset className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Etape 1 : Activite
          </h2>
          <legend className="text-lg font-semibold text-foreground mb-3">
            Choisissez une activite
          </legend>
          <div className="space-y-3">
            {activities.map((activity) => (
              <label
                key={activity.id}
                className={cn(
                  "card-editorial flex cursor-pointer flex-col gap-2 p-4 transition-colors",
                  selectedActivityId === activity.id
                    ? "border-hc-blue bg-hc-blue/5 ring-1 ring-hc-blue"
                    : "hover:border-hc-blue/50"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="activity"
                      value={activity.id}
                      checked={selectedActivityId === activity.id}
                      onChange={() => {
                        setSelectedActivityId(activity.id);
                        // Reset participants to 1 when changing activity
                        setParticipants(1);
                      }}
                      className="mt-0.5 accent-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-foreground">
                        {activity.title}
                      </span>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-primary">
                    {formatPrice(activity.price)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground ml-7">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {activity.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" aria-hidden="true" />
                    {activity.maxParticipants} max
                  </span>
                </div>

                {activity.handicapTypesCompatible.length > 0 && (
                  <div className="flex flex-wrap gap-1 ml-7">
                    {activity.handicapTypesCompatible.map((type) => (
                      <HandicapBadge key={type} type={type} />
                    ))}
                  </div>
                )}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 2: Select date */}
      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Etape 2 : Date
          </h2>
          <h3 className="text-lg font-semibold text-foreground">
            Choisissez une date
          </h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={fr}
              disabled={(date) => date < today}
              className="rounded-xl border"
            />
          </div>
          {selectedDate && (
            <p className="text-center text-sm text-muted-foreground">
              <CalendarIcon className="inline h-4 w-4 mr-1" aria-hidden="true" />
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
            </p>
          )}
        </div>
      )}

      {/* Step 3: Participants */}
      {step === 2 && selectedActivity && (
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Etape 3 : Participants
          </h2>
          <h3 className="text-lg font-semibold text-foreground">
            Nombre de participants
          </h3>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setParticipants(Math.max(1, participants - 1))}
              disabled={participants <= 1}
              aria-label="Reduire le nombre de participants"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-3xl font-bold text-foreground w-16 text-center tabular-nums">
              {participants}
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() =>
                setParticipants(
                  Math.min(selectedActivity.maxParticipants, participants + 1)
                )
              }
              disabled={participants >= selectedActivity.maxParticipants}
              aria-label="Augmenter le nombre de participants"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Maximum : {selectedActivity.maxParticipants} participants
          </p>
        </div>
      )}

      {/* Step 4: Summary */}
      {step === 3 && selectedActivity && selectedDate && (
        <div className="space-y-4">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Etape 4 : Recapitulatif
          </h2>
          <h3 className="text-lg font-semibold text-foreground">
            Recapitulatif de votre reservation
          </h3>
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Activite</span>
              <span className="font-medium text-foreground">
                {selectedActivity.title}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">
                {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Participants</span>
              <span className="font-medium text-foreground">{participants}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prix unitaire</span>
              <span className="font-medium text-foreground">
                {formatPrice(selectedActivity.price)}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrev}
          disabled={step === 0}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Precedent
        </Button>

        {step < 3 ? (
          <Button type="button" onClick={handleNext} disabled={!canGoNext}>
            Suivant
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleConfirm}
            className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Confirmer la reservation
          </Button>
        )}
      </div>
    </div>
  );
}
