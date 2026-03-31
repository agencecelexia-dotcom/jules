import type { Conversation, Message } from "@/lib/types";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participant1Id: "user-1",
    participant2Id: "user-2",
    lastMessageAt: "2026-03-29T17:45:00.000Z",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-1",
    content:
      "Salut Karim ! J'ai vu ton post sur les cinemas accessibles a Marseille. On descend dans le Sud cet ete avec Lucas. Tu aurais des bonnes adresses d'activites adaptees dans la region ?",
    createdAt: "2026-03-29T14:00:00.000Z",
    readAt: "2026-03-29T14:10:00.000Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "user-2",
    content:
      "Salut Sophie ! Avec plaisir. Pour le cinema, le Pathé La Joliette a installe des boucles magnetiques recemment, ca fonctionne bien pour Yasmine. Sinon, tu connais les Ecuries du Soleil a Aix ? C'est super pour les enfants avec handicap moteur, j'ai vu que tu avais poste dessus.",
    createdAt: "2026-03-29T14:15:00.000Z",
    readAt: "2026-03-29T14:30:00.000Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-1",
    content:
      "Oui, les Ecuries du Soleil c'etait genial ! Lucas a adore. On y retourne en avril. Et pour la plage, il y a des plages accessibles avec des tiralos pres de Marseille ?",
    createdAt: "2026-03-29T14:35:00.000Z",
    readAt: "2026-03-29T15:00:00.000Z",
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "user-2",
    content:
      "Oui, la plage du Prado a des tiralos et des fauteuils de baignade en juillet-aout. Il faut reserver a l'avance aupres de la mairie, c'est gratuit. Et il y a aussi la plage de la Pointe-Rouge qui est bien amenagee. Je t'enverrai les liens.",
    createdAt: "2026-03-29T15:10:00.000Z",
    readAt: "2026-03-29T17:30:00.000Z",
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "user-1",
    content:
      "Super, merci beaucoup Karim ! C'est vraiment precieux d'avoir ces infos. Si ca te dit, on pourrait se retrouver avec les enfants pendant nos vacances. Lucas et Yasmine pourraient jouer ensemble sur la plage !",
    createdAt: "2026-03-29T17:45:00.000Z",
  },
];
