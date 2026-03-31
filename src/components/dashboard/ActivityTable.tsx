"use client";

import { useState } from "react";
import type { Activity } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ActivityForm } from "./ActivityForm";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ActivityTableProps {
  activities: Activity[];
}

export function ActivityTable({ activities }: ActivityTableProps) {
  const { currentUser, updateActivity, deleteActivity } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>(undefined);

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormOpen(true);
  };

  const handleCreate = () => {
    setEditingActivity(undefined);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditingActivity(undefined);
  };

  const handleDelete = (activityId: string) => {
    deleteActivity(activityId);
    toast.success("Activite supprimee");
  };

  const handleToggleActive = (activity: Activity) => {
    updateActivity(activity.id, { isActive: !activity.isActive });
    toast.success(
      activity.isActive ? "Activite desactivee" : "Activite activee"
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Vos activites</h2>
        <Button onClick={handleCreate}>
          <Plus className="size-4" data-icon="inline-start" />
          Ajouter une activite
        </Button>
      </div>

      {activities.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border bg-card ring-1 ring-foreground/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nom</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Prix</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Duree</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Places max</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-4 py-3 font-medium">{activity.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatPrice(activity.price)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{activity.duration}</td>
                  <td className="px-4 py-3 text-muted-foreground">{activity.maxParticipants}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={activity.isActive}
                        onCheckedChange={() => handleToggleActive(activity)}
                        aria-label={`${activity.isActive ? "Desactiver" : "Activer"} ${activity.title}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {activity.isActive ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleEdit(activity)}
                        aria-label={`Modifier ${activity.title}`}
                      >
                        <Pencil className="size-3.5" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Supprimer ${activity.title}`}
                            />
                          }
                        >
                          <Trash2 className="size-3.5 text-destructive" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Supprimer l&apos;activite</AlertDialogTitle>
                            <AlertDialogDescription>
                              Etes-vous sur de vouloir supprimer &quot;{activity.title}&quot; ?
                              Cette action est irreversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleDelete(activity.id)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10">
          <p className="text-sm text-muted-foreground">
            Aucune activite pour le moment. Creez votre premiere activite !
          </p>
        </div>
      )}

      <ActivityForm
        activity={editingActivity}
        businessId={currentUser.id}
        open={formOpen}
        onClose={handleClose}
      />
    </div>
  );
}
