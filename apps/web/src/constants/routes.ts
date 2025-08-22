export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SPORTS: {
    ROOT: '/sports',
    SOCCER: '/sports/soccer',
    BASEBALL: '/sports/baseball',
    BASKETBALL: '/sports/basketball',
  },
  MINI_GAMES: {
    ROOT: '/minigames',
    LIMBO: '/minigames/limbo',
    COINFLIP: '/minigames/coinflip',
    SLIDES: '/minigames/slides',
    ROCK_PAPER_SCISSORS: '/minigames/rock-paper-scissors',
  },
  LOTTERIES: '/lotteries',
  AFFILIATES: '/affiliates',
  WEEKLY_DRAW: '/weekly-draw',
  BONUSES: '/bonuses',
  CHAT: '/chat',
  SUPPORT: '/support',
} as const;

export const MENU = [
  {
    label: 'Deportes',
    icon: 'soccer',
    path: ROUTES.SPORTS,
    submenu: [
      {
        icon: 'soccer',
        label: 'Fútbol',
        path: ROUTES.SPORTS.SOCCER,
      },
      {
        icon: 'baseball',
        label: 'Béisbol',
        path: ROUTES.SPORTS.BASEBALL,
      },
      {
        icon: 'basketball',
        label: 'Baloncesto',
        path: ROUTES.SPORTS.BASKETBALL,
      },
    ],
  },
  {
    label: 'Mini Juegos',
    icon: 'cards',
    path: ROUTES.MINI_GAMES,
    submenu: [
      {
        icon: 'limbo',
        label: 'Limbo',
        path: ROUTES.MINI_GAMES.LIMBO,
      },
      {
        icon: 'coin-flip',
        label: 'Cara o Sello',
        path: ROUTES.MINI_GAMES.COINFLIP,
      },
      {
        icon: 'slides',
        label: 'Slides',
        path: ROUTES.MINI_GAMES.SLIDES,
      },
      {
        icon: 'slides',
        label: 'Piedra, Papel o Tijera',
        path: ROUTES.MINI_GAMES.ROCK_PAPER_SCISSORS,
      },
    ],
  },
  {
    label: 'Loterías',
    icon: 'lottery',
    path: ROUTES.LOTTERIES,
  },
  {
    label: 'Afiliados',
    icon: 'affiliates',
    path: ROUTES.AFFILIATES,
  },
  {
    label: 'Sorteo Semanal',
    icon: 'lottery',
    path: ROUTES.WEEKLY_DRAW,
  },
  {
    label: 'Bonos',
    icon: 'gift',
    path: ROUTES.BONUSES,
  },
  {
    label: 'Chat',
    icon: 'chat',
    path: ROUTES.CHAT,
  },
  {
    label: 'Soporte',
    icon: 'support',
    path: ROUTES.SUPPORT,
  },
] as const;
