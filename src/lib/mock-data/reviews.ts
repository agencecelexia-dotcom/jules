import type { Review } from "@/lib/types";

export const mockReviews: Review[] = [
  {
    id: "review-1",
    businessId: "user-6",
    authorId: "user-1",
    rating: 5,
    content:
      "Une experience absolument formidable pour notre fils Lucas, 8 ans, en fauteuil roulant. Les Ecuries du Soleil sont un veritable havre de paix et d'inclusion. La monitrice, Isabelle, a su mettre Lucas en confiance des les premieres minutes. Les installations sont parfaitement adaptees : rampe de montoir securisee, selle ergonomique, manege couvert avec sol souple. Lucas a fait sa premiere seance sur Caramel, un cheval doux et patient, et il n'a pas arrete de sourire. Apres trois seances, on constate deja des progres au niveau de la posture et de l'equilibre. Le rapport qualite-prix est tres correct pour une seance individuelle d'une heure. Je recommande sans hesitation a toutes les familles touchees par le handicap moteur. Un grand merci a toute l'equipe !",
    handicapContext: "Handicap moteur - enfant en fauteuil roulant",
    visitDate: "2026-03-15",
    createdAt: "2026-03-28T19:00:00.000Z",
  },
  {
    id: "review-2",
    businessId: "user-7",
    authorId: "user-2",
    rating: 4,
    content:
      "Tres belle visite au Musee Tactile avec ma fille Yasmine, sourde de naissance. Le musee propose des visites guidees en langue des signes francaise, ce qui est suffisamment rare pour etre souligne. La guide maitrisait parfaitement la LSF et a su rendre la visite vivante et captivante. Les maquettes tactiles sont de grande qualite. Petit bemol : certaines videos explicatives n'avaient pas de sous-titrage, ce qui est dommage pour un lieu qui se veut accessible. Malgre ce detail, c'est l'un des meilleurs musees que nous avons visite en termes d'accessibilite auditive. Nous reviendrons pour l'exposition sur les impressionnistes.",
    handicapContext: "Handicap auditif - enfant sourde de naissance",
    visitDate: "2026-02-20",
    createdAt: "2026-03-10T14:00:00.000Z",
  },
  {
    id: "review-3",
    businessId: "user-8",
    authorId: "user-3",
    rating: 4,
    content:
      "AquaAdapt nous a ete recommande par notre kinesitherapeute et nous n'avons pas ete decus. Hugo, polyhandicape, a pu profiter du bassin grace au fauteuil de mise a l'eau et a l'accompagnement bienveillant du maitre-nageur. Le sol mobile est une idee geniale qui permet d'adapter la profondeur a chaque enfant. Deux petites remarques pour progresser : les vestiaires adaptes sont un peu etroits pour manoeuvrer un fauteuil electrique, et il manque une table a langer pour grands enfants dans les sanitaires. A part ca, l'experience aquatique en elle-meme est excellente et Hugo en redemande. Nous avons pris un abonnement trimestriel.",
    handicapContext: "Polyhandicap - enfant en fauteuil avec deficience cognitive",
    visitDate: "2026-03-01",
    createdAt: "2026-03-15T11:30:00.000Z",
  },
  {
    id: "review-4",
    businessId: "user-9",
    authorId: "user-4",
    rating: 3,
    content:
      "Le concept du Jardin Sensoriel est vraiment interessant et le personnel est tres accueillant. Les parcours olfactifs et tactiles sont bien concu et mon fils Theo, malvoyant, a beaucoup apprecie les fontaines sonores et les plantes aromatiques. Cependant, la signaletique du jardin manque de contrastes visuels pour les personnes malvoyantes : les panneaux informatifs sont ecrits en petits caracteres sans braille, et le plan du jardin n'existe pas en version tactile. Pour un lieu qui cible le handicap visuel, il y a encore du travail a faire sur ce point. Le potentiel est la, mais il faudrait ameliorer l'accessibilite visuelle pour meriter pleinement le label.",
    handicapContext: "Handicap visuel - enfant malvoyant",
    visitDate: "2026-02-10",
    createdAt: "2026-02-25T16:00:00.000Z",
  },
  {
    id: "review-5",
    businessId: "user-10",
    authorId: "user-5",
    rating: 2,
    content:
      "Decue par TechKids Accessible. L'idee des ateliers de robotique adaptes est super, mais la realite ne suit pas. L'animateur n'avait visiblement pas de formation specifique au handicap psychique et semblait desempare face aux besoins de mon fils. Le materiel est correct mais les locaux sont bruyants et mal isoles, ce qui est problematique pour un enfant sensible aux stimuli sonores. Nous n'avons pas termine l'atelier.",
    handicapContext: "Handicap psychique - adolescent avec troubles psychiques",
    visitDate: "2026-01-15",
    createdAt: "2026-02-05T10:00:00.000Z",
  },
];
