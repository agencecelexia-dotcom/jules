import type { Post, Comment, Like } from "@/lib/types";

export const mockPosts: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    type: "EXPERIENCE",
    content:
      "Quelle decouverte incroyable ! Nous avons emmene Lucas aux Ecuries du Soleil pour sa premiere seance d'equitation adaptee. Le centre est parfaitement equipe pour les fauteuils roulants : rampe de montoir, selle adaptee, monitrice formee et surtout d'une patience remarquable. Lucas avait le sourire aux levres pendant toute la seance. Le contact avec le cheval l'a vraiment apaise et il a meme reussi a tenir les renes seul pendant quelques minutes. Je recommande vivement cette experience a toutes les familles concernees par le handicap moteur. Nous y retournons le mois prochain !",
    media: [
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800",
    ],
    handicapTags: ["MOTEUR"],
    activityType: "sport",
    location: "Aix-en-Provence",
    linkedBusinessId: "user-6",
    likesCount: 3,
    commentsCount: 2,
    createdAt: "2026-03-28T18:30:00.000Z",
  },
  {
    id: "post-2",
    authorId: "user-2",
    type: "QUESTION",
    content:
      "Bonjour a tous ! Ma fille Yasmine est sourde et adore le cinema. Nous cherchons des salles a Marseille ou dans les environs qui proposent des seances avec sous-titrage en francais ou en boucle magnetique. Est-ce que certains d'entre vous connaissent des cinemas accessibles dans la region PACA ? On a essaye le Pathe du Vieux-Port mais les dispositifs ne fonctionnaient pas la derniere fois. Merci d'avance pour vos retours !",
    media: [],
    handicapTags: ["AUDITIF"],
    activityType: "culture",
    location: "Marseille",
    likesCount: 0,
    commentsCount: 0,
    createdAt: "2026-03-25T09:15:00.000Z",
  },
  {
    id: "post-3",
    authorId: "user-3",
    type: "STORY",
    content:
      "Recit d'une journee magique au Jardin Sensoriel de Nantes avec notre petit Hugo. Pour une famille touchee par le polyhandicap, chaque sortie demande une organisation minutieuse, mais celle-ci en valait vraiment la peine. Des l'entree, le personnel nous a accueillis avec beaucoup de bienveillance. Le parcours sensoriel est concu pour etre accessible en fauteuil : les allees sont larges, les plantes aromatiques sont a hauteur des mains, et les fontaines sonores ont immediatement capte l'attention d'Hugo. Il a passe de longues minutes a toucher les differentes textures du mur vegetal et a sentir la lavande et le romarin. Le moment le plus emouvant a ete l'atelier terre, ou il a pu malaxer de l'argile avec l'aide d'une educatrice specialisee. Son visage s'est illumine. Nous avons termine la journee dans l'espace detente avec des hamacs sensoriels. Hugo s'est endormi paisiblement, berce par la musique douce. Je partage ces photos pour que d'autres familles puissent decouvrir ce lieu precieux.",
    media: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800",
    ],
    handicapTags: ["POLYHANDICAP"],
    activityType: "loisirs",
    location: "Nantes",
    linkedBusinessId: "user-9",
    likesCount: 2,
    commentsCount: 5,
    createdAt: "2026-03-20T14:00:00.000Z",
  },
  {
    id: "post-4",
    authorId: "user-6",
    type: "TIP",
    content:
      "Conseil de professionnels : comment preparer votre enfant a sa premiere seance d'equitherapie ? Voici nos recommandations :\n\n1. Familiarisez votre enfant avec l'odeur du cheval en amont (livres, videos)\n2. Prevoyez des vetements confortables et un pantalon long\n3. Arrivez 15 minutes en avance pour visiter les ecuries calmement\n4. N'hesitez pas a nous communiquer les habitudes et les preferences sensorielles de votre enfant\n5. Les premieres seances sont courtes (20-30 min) pour ne pas fatiguer le cavalier\n\nNous accueillons les enfants a partir de 4 ans avec handicap moteur ou cognitif. Chaque programme est personnalise en fonction des besoins et des objectifs therapeutiques.",
    media: [
      "https://images.unsplash.com/photo-1509460913899-515f1df34fea?w=800",
    ],
    handicapTags: ["MOTEUR", "COGNITIF"],
    activityType: "sport",
    location: "Aix-en-Provence",
    likesCount: 4,
    commentsCount: 1,
    createdAt: "2026-03-18T11:00:00.000Z",
  },
  {
    id: "post-5",
    authorId: "user-4",
    type: "EXPERIENCE",
    content:
      "Retour d'experience sur notre visite au Musee Tactile de Lyon avec mon fils Theo, 10 ans, malvoyant. Nous y sommes alles un samedi matin et l'accueil a ete exemplaire. La guide nous a propose une visite en audiodescription detaillee, et Theo a pu toucher chaque oeuvre, ce qui est exceptionnel dans un musee. Les maquettes tactiles des monuments lyonnais l'ont passionne, surtout celle de la basilique de Fourviere qu'il a exploree du bout des doigts pendant un bon quart d'heure. Les cartels en braille sont bien places et les contrastes de couleurs dans la signaletique facilitent les deplacements pour les personnes malvoyantes. Seul petit bemol : le cafe du musee n'a pas de carte en gros caracteres, mais le personnel a ete adorable et nous a lu les options a voix haute. Un lieu culturel vraiment inclusif, comme on en voit encore trop peu en France. Nous comptons y retourner pour l'exposition temporaire sur les impressionnistes en version tactile qui commence en avril.",
    media: [],
    handicapTags: ["VISUEL"],
    activityType: "culture",
    location: "Lyon",
    linkedBusinessId: "user-7",
    likesCount: 1,
    commentsCount: 0,
    createdAt: "2026-03-15T16:45:00.000Z",
  },
  {
    id: "post-6",
    authorId: "user-8",
    type: "EXPERIENCE",
    content:
      "Nous sommes fiers de vous presenter notre nouveau programme de natation adaptee chez AquaAdapt ! Apres six mois de travail avec des ergotherapeutes et des kinesitherapeutes, nous avons developpe un parcours aquatique innovant qui s'adapte a tous les types de handicap. Notre bassin est desormais equipe d'un sol mobile permettant d'ajuster la profondeur, de barres de maintien immergees et d'un systeme audio sous-marin pour les exercices rythmes. Les retours de nos premiers participants sont tres encourageants : amelioration de la mobilite, detente musculaire et surtout beaucoup de plaisir dans l'eau !",
    media: [
      "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800",
      "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=800",
    ],
    handicapTags: ["MOTEUR", "VISUEL", "AUDITIF"],
    activityType: "sport",
    location: "Paris",
    likesCount: 5,
    commentsCount: 3,
    createdAt: "2026-03-12T10:00:00.000Z",
  },
  {
    id: "post-7",
    authorId: "user-5",
    type: "TIP",
    content:
      "Apres plusieurs annees d'experience, voici mes astuces pour gerer la surcharge sensorielle dans les lieux publics avec un adolescent concerne par un handicap psychique :\n\n- Toujours reperer les sorties et les espaces calmes en arrivant\n- Avoir un casque anti-bruit de qualite dans le sac\n- Preparer un planning visuel de la sortie pour reduire l'anxiete\n- Prevoir des pauses regulieres toutes les 30 a 45 minutes\n- Ne jamais forcer si l'enfant montre des signes de fatigue ou de stress\n\nCes petites habitudes ont transforme nos sorties. N'hesitez pas a partager vos propres strategies !",
    media: [],
    handicapTags: ["PSYCHIQUE"],
    location: "Bordeaux",
    likesCount: 0,
    commentsCount: 1,
    createdAt: "2026-03-08T08:30:00.000Z",
  },
  {
    id: "post-8",
    authorId: "user-7",
    type: "STORY",
    content:
      "Nous sommes ravis de vous devoiler notre nouvelle exposition temporaire : \"Toucher l'Impressionnisme\". Pour la premiere fois en France, les chefs-d'oeuvre de Monet, Renoir et Degas sont reproduits en relief et en textures pour etre explores par le toucher. Chaque tableau est accompagne d'une audiodescription poetique et d'une interpretation en langue des signes francaise (video sur tablette). L'exposition a ete concue en collaboration avec l'Institut National des Jeunes Aveugles et l'association Signes de Sens. Vernissage le 5 avril, entree gratuite pour les personnes en situation de handicap et leurs accompagnants.",
    media: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    ],
    handicapTags: ["VISUEL", "AUDITIF"],
    activityType: "culture",
    location: "Lyon",
    likesCount: 2,
    commentsCount: 2,
    createdAt: "2026-03-05T12:00:00.000Z",
  },
  {
    id: "post-9",
    authorId: "user-1",
    type: "EXPERIENCE",
    content:
      "Belle surprise ce week-end : nous avons decouvert une aire de jeux entierement accessible dans le 15e arrondissement de Paris, pres du parc Andre-Citroen. Toboggans avec rampes d'acces, balancoires adaptees pour les fauteuils, sol souple et parcours sensoriel au sol. Lucas a pu jouer avec les autres enfants du quartier, et ca, c'est le plus beau cadeau qu'on puisse lui faire. Si vous connaissez d'autres aires de jeux inclusives en Ile-de-France, je suis preneuse !",
    media: [
      "https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=800",
    ],
    handicapTags: [],
    location: "Paris",
    likesCount: 1,
    commentsCount: 0,
    createdAt: "2026-02-28T15:20:00.000Z",
  },
  {
    id: "post-10",
    authorId: "user-9",
    type: "TIP",
    content:
      "Le printemps arrive et c'est le moment ideal pour commencer des ateliers de jardinage therapeutique ! Voici nos conseils pour stimuler la cognition par le jardinage :\n\n- Le repiquage de plants develop la motricite fine et la concentration\n- Les herbes aromatiques (menthe, basilic, thym) offrent une stimulation olfactive riche\n- Le tri des graines par couleur et par taille est un excellent exercice cognitif\n- L'arrosage quotidien cree une routine rassurante et structurante\n- L'observation de la pousse favorise la patience et la notion du temps\n\nNos ateliers saisonniers reprennent debut avril. Inscriptions ouvertes pour les familles et les etablissements specialises !",
    media: [],
    handicapTags: ["VISUEL", "COGNITIF", "PSYCHIQUE"],
    activityType: "loisirs",
    location: "Nantes",
    likesCount: 3,
    commentsCount: 4,
    createdAt: "2026-02-20T09:00:00.000Z",
  },
];

export const mockComments: Comment[] = [
  // Post 1: 2 comments
  {
    id: "comment-1",
    postId: "post-1",
    authorId: "user-3",
    content:
      "Merci pour ce retour Sophie ! On hesite depuis un moment a essayer l'equitherapie pour Hugo. Ton recit nous donne envie de franchir le pas. Est-ce que le centre accepte les enfants en fauteuil electrique ?",
    createdAt: "2026-03-28T20:15:00.000Z",
  },
  {
    id: "comment-2",
    postId: "post-1",
    authorId: "user-6",
    content:
      "Merci beaucoup Sophie pour ce beau temoignage ! Oui Claire, nous accueillons tout type de fauteuil. N'hesitez pas a nous appeler pour organiser une visite decouverte gratuite avant la premiere seance.",
    createdAt: "2026-03-29T08:30:00.000Z",
  },

  // Post 3: 5 comments
  {
    id: "comment-3",
    postId: "post-3",
    authorId: "user-1",
    content:
      "Quel recit magnifique Claire ! Les photos sont superbes. On voit qu'Hugo a passe un moment merveilleux. Il faudrait qu'on organise une sortie ensemble un jour !",
    createdAt: "2026-03-20T16:30:00.000Z",
  },
  {
    id: "comment-4",
    postId: "post-3",
    authorId: "user-5",
    content:
      "Ca fait chaud au coeur de lire ca. Les lieux vraiment accessibles et bienveillants sont tellement precieux. Merci pour le partage !",
    createdAt: "2026-03-20T18:00:00.000Z",
  },
  {
    id: "comment-5",
    postId: "post-3",
    authorId: "user-9",
    content:
      "Merci Claire pour ce beau recit ! Nous sommes tres touches. Toute l'equipe du Jardin Sensoriel est heureuse d'avoir pu offrir ce moment a Hugo et a votre famille. A tres bientot !",
    createdAt: "2026-03-21T09:00:00.000Z",
  },
  {
    id: "comment-6",
    postId: "post-3",
    authorId: "user-4",
    content:
      "Nantes est a quelques heures de Toulouse, ca vaut le detour ! Est-ce que le jardin est ouvert toute l'annee ou seulement en saison ?",
    createdAt: "2026-03-21T10:15:00.000Z",
  },
  {
    id: "comment-7",
    postId: "post-3",
    authorId: "user-2",
    content:
      "Tres beau temoignage. Je note l'adresse pour nos prochaines vacances dans l'Ouest. Merci Claire !",
    createdAt: "2026-03-21T14:45:00.000Z",
  },

  // Post 4: 1 comment
  {
    id: "comment-8",
    postId: "post-4",
    authorId: "user-1",
    content:
      "Excellents conseils ! La preparation en amont a vraiment fait la difference pour Lucas. Nous avons regarde des videos de chevaux ensemble pendant une semaine avant la premiere seance, et il etait beaucoup plus serein le jour J.",
    createdAt: "2026-03-18T14:30:00.000Z",
  },

  // Post 6: 3 comments
  {
    id: "comment-9",
    postId: "post-6",
    authorId: "user-1",
    content:
      "Le sol mobile, c'est genial ! On peut venir tester avec Lucas ? Il adore l'eau mais les bassins classiques ne sont jamais adaptes a son fauteuil.",
    createdAt: "2026-03-12T12:00:00.000Z",
  },
  {
    id: "comment-10",
    postId: "post-6",
    authorId: "user-3",
    content:
      "Nous avons fait notre premiere seance la semaine derniere et Hugo a adore. L'equipe est vraiment a l'ecoute. Bravo pour ce programme !",
    createdAt: "2026-03-13T09:30:00.000Z",
  },
  {
    id: "comment-11",
    postId: "post-6",
    authorId: "user-8",
    content:
      "Merci pour vos retours ! Sophie, bien sur, contactez-nous par telephone ou via la messagerie pour programmer une seance d'essai. Nous serons ravis d'accueillir Lucas !",
    createdAt: "2026-03-13T11:00:00.000Z",
  },

  // Post 7: 1 comment
  {
    id: "comment-12",
    postId: "post-7",
    authorId: "user-3",
    content:
      "Merci Amina pour ces conseils precieux. Le casque anti-bruit, on ne sort plus sans ! Et la preparation visuelle avant chaque sortie a vraiment reduit l'anxiete d'Hugo aussi.",
    createdAt: "2026-03-08T11:00:00.000Z",
  },

  // Post 8: 2 comments
  {
    id: "comment-13",
    postId: "post-8",
    authorId: "user-4",
    content:
      "Incroyable ! Toucher des reproductions de Monet, je n'aurais jamais imagine ca possible. On va absolument venir avec Theo pour le vernissage. Est-ce qu'il faut reserver ?",
    createdAt: "2026-03-05T15:30:00.000Z",
  },
  {
    id: "comment-14",
    postId: "post-8",
    authorId: "user-7",
    content:
      "Merci Thomas ! L'entree est libre pour le vernissage, mais nous conseillons de reserver pour les visites guidees tactiles qui suivront (places limitees a 10 personnes par creneau). Reservation sur notre site web !",
    createdAt: "2026-03-05T17:00:00.000Z",
  },

  // Post 10: 4 comments
  {
    id: "comment-15",
    postId: "post-10",
    authorId: "user-3",
    content:
      "Les ateliers de jardinage sont une super idee ! Hugo adore mettre les mains dans la terre. Est-ce que les ateliers sont accessibles en fauteuil roulant ?",
    createdAt: "2026-02-20T11:00:00.000Z",
  },
  {
    id: "comment-16",
    postId: "post-10",
    authorId: "user-9",
    content:
      "Oui Claire, absolument ! Nos tables de culture sont sureleves a hauteur de fauteuil et les allees du jardin sont toutes praticables. N'hesitez pas a nous contacter pour une visite avant inscription.",
    createdAt: "2026-02-20T12:30:00.000Z",
  },
  {
    id: "comment-17",
    postId: "post-10",
    authorId: "user-5",
    content:
      "Nous avons participe aux ateliers d'automne et mon fils a adore le tri des graines. C'est un exercice tres apaisant pour lui. Vivement le printemps pour recommencer !",
    createdAt: "2026-02-20T14:00:00.000Z",
  },
  {
    id: "comment-18",
    postId: "post-10",
    authorId: "user-1",
    content:
      "C'est un peu loin de Paris pour nous, mais ca pourrait etre une super idee pour les vacances de printemps. Merci pour le partage !",
    createdAt: "2026-02-21T08:00:00.000Z",
  },
];

export const mockLikes: Like[] = [
  // Post 1: 3 likes
  { id: "like-1", postId: "post-1", userId: "user-2" },
  { id: "like-2", postId: "post-1", userId: "user-3" },
  { id: "like-3", postId: "post-1", userId: "user-5" },

  // Post 3: 2 likes
  { id: "like-4", postId: "post-3", userId: "user-1" },
  { id: "like-5", postId: "post-3", userId: "user-5" },

  // Post 4: 4 likes
  { id: "like-6", postId: "post-4", userId: "user-1" },
  { id: "like-7", postId: "post-4", userId: "user-2" },
  { id: "like-8", postId: "post-4", userId: "user-3" },
  { id: "like-9", postId: "post-4", userId: "user-5" },

  // Post 5: 1 like
  { id: "like-10", postId: "post-5", userId: "user-1" },

  // Post 6: 5 likes
  { id: "like-11", postId: "post-6", userId: "user-1" },
  { id: "like-12", postId: "post-6", userId: "user-2" },
  { id: "like-13", postId: "post-6", userId: "user-3" },
  { id: "like-14", postId: "post-6", userId: "user-4" },
  { id: "like-15", postId: "post-6", userId: "user-5" },

  // Post 8: 2 likes
  { id: "like-16", postId: "post-8", userId: "user-4" },
  { id: "like-17", postId: "post-8", userId: "user-1" },

  // Post 9: 1 like
  { id: "like-18", postId: "post-9", userId: "user-3" },

  // Post 10: 3 likes
  { id: "like-19", postId: "post-10", userId: "user-1" },
  { id: "like-20", postId: "post-10", userId: "user-3" },
  { id: "like-21", postId: "post-10", userId: "user-5" },
];
