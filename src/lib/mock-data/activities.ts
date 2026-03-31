import type { Activity } from "@/lib/types";

export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    businessId: "user-6",
    title: "Seance d'equitation adaptee",
    description:
      "Seance individuelle d'equitation adaptee encadree par un moniteur diplome d'Etat. Le programme est personnalise en fonction du handicap et des objectifs de chaque cavalier : travail de l'equilibre, de la posture, de la coordination et de la confiance en soi. Les chevaux sont specialement formes pour l'equitherapie et le materiel (selle, etriers, rampe de montoir) est entierement adapte aux personnes a mobilite reduite et aux enfants avec troubles cognitifs. Seance de 1 heure, briefing et debriefing inclus.",
    price: 4500,
    duration: "1h",
    handicapTypesCompatible: ["MOTEUR", "COGNITIF"],
    maxParticipants: 4,
    photos: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800",
      "https://images.unsplash.com/photo-1509460913899-515f1df34fea?w=800",
    ],
    isActive: true,
  },
  {
    id: "activity-2",
    businessId: "user-7",
    title: "Visite guidee tactile",
    description:
      "Visite guidee du musee avec exploration tactile de toutes les oeuvres. La visite est proposee en audiodescription detaillee et en langue des signes francaise (LSF). Nos mediateurs culturels vous accompagnent a travers les collections permanentes et temporaires, en adaptant le rythme et le contenu a chaque groupe. Maquettes en relief, reproductions tactiles et dispositifs sonores completent l'experience. Duree : 1h30, groupe de 10 personnes maximum.",
    price: 1500,
    duration: "1h30",
    handicapTypesCompatible: ["VISUEL", "AUDITIF"],
    maxParticipants: 10,
    photos: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800",
    ],
    isActive: true,
  },
  {
    id: "activity-3",
    businessId: "user-8",
    title: "Cours de natation PMR",
    description:
      "Cours de natation adapte aux personnes a mobilite reduite et a tous les types de handicap. Le bassin est equipe d'un sol mobile, de rampes immergees et de fauteuils de mise a l'eau. Nos maitres-nageurs diplomes et formes au handicap proposent un accompagnement individualise dans un cadre securise et bienveillant. Au programme : eveil aquatique, apprentissage de la nage, exercices de motricite et de relaxation en milieu aquatique. Seance de 45 minutes, 6 participants maximum.",
    price: 3000,
    duration: "45min",
    handicapTypesCompatible: [
      "MOTEUR",
      "VISUEL",
      "AUDITIF",
      "MENTAL",
      "PSYCHIQUE",
      "COGNITIF",
      "POLYHANDICAP",
    ],
    maxParticipants: 6,
    photos: [
      "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800",
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800",
    ],
    isActive: true,
  },
  {
    id: "activity-4",
    businessId: "user-9",
    title: "Atelier sensoriel en famille",
    description:
      "Atelier de decouverte sensorielle en plein air pour toute la famille. Au programme : parcours tactile pieds nus, jardinage aromatique, ecoute des sons de la nature, degustation de plantes comestibles et creation artistique avec des elements naturels. L'atelier est anime par un educateur specialise et un horticulteur, dans un cadre paisible et securise. Les espaces sont accessibles en fauteuil roulant. Duree : 2 heures, 8 participants maximum.",
    price: 2000,
    duration: "2h",
    handicapTypesCompatible: ["VISUEL", "COGNITIF", "PSYCHIQUE"],
    maxParticipants: 8,
    photos: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
    ],
    isActive: true,
  },
  {
    id: "activity-5",
    businessId: "user-10",
    title: "Workshop robotique adapte",
    description:
      "Atelier de decouverte de la robotique et de la programmation adapte aux enfants en situation de handicap moteur et auditif. Les participants apprennent a programmer un petit robot a l'aide d'une interface visuelle simplifiee et de claviers ergonomiques. L'atelier est anime en francais et en langue des signes par un animateur forme. Les locaux sont accessibles aux fauteuils roulants et le materiel est adapte (joysticks, contacteurs, ecrans tactiles). Duree : 1h30, 5 participants maximum.",
    price: 3500,
    duration: "1h30",
    handicapTypesCompatible: ["MOTEUR", "AUDITIF"],
    maxParticipants: 5,
    photos: [
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800",
    ],
    isActive: true,
  },
];
