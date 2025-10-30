export interface League {
    id: string
    name: string
    flag: string
    starred?: boolean
}

export interface Country {
    id: string
    name: string
    flag: string
}

export interface SidebarSection {
    id: string
    title: string
    icon?: string
    count: number
    defaultOpen: boolean
    items: League[] | Country[]
}

export const watchlistLeagues: League[] = [
    { id: 'premier-league-watchlist', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', starred: true },
    { id: 'serie-a-watchlist', name: 'Serie A', flag: '🇮🇹', starred: true },
    { id: 'serie-b-watchlist', name: 'Serie B', flag: '🇮🇹', starred: true },
    { id: 'primera-liga-watchlist', name: 'Primera Liga', flag: '🇪🇸', starred: true },
]

export const popularLeagues: League[] = [
    { id: 'premier-league', name: 'Premier League', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'laliga', name: 'LaLiga EA Sports', flag: '🇪🇸' },
    { id: 'bundesliga', name: 'Bundesliga', flag: '🇩🇪' },
    { id: 'serie-a', name: 'Serie A', flag: '🇮🇹' },
]

export const footballCountries: Country[] = [
    { id: 'england', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: 'spain', name: 'Spain', flag: '🇪🇸' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪' },
    { id: 'italy', name: 'Italy', flag: '🇮🇹' },
]

export const sidebarSections: SidebarSection[] = [
    {
        id: 'watchlist',
        title: 'Watchlist',
        icon: 'star',
        count: 4,
        defaultOpen: true,
        items: watchlistLeagues,
    },
    {
        id: 'popular-leagues',
        title: 'Popular Leagues',
        count: 9,
        defaultOpen: true,
        items: popularLeagues,
    },
    {
        id: 'football',
        title: 'Football',
        icon: 'football',
        count: 4,
        defaultOpen: true,
        items: footballCountries,
    },
    {
        id: 'basketball',
        title: 'Basketball',
        icon: 'basketball',
        count: 0,
        defaultOpen: false,
        items: [],
    },
    {
        id: 'tennis',
        title: 'Tennis',
        icon: 'tennis',
        count: 0,
        defaultOpen: false,
        items: [],
    },
    {
        id: 'american-football',
        title: 'American Football',
        icon: 'american-football',
        count: 0,
        defaultOpen: false,
        items: [],
    },
    {
        id: 'hockey',
        title: 'Hockey',
        icon: 'hockey',
        count: 0,
        defaultOpen: false,
        items: [],
    },
    {
        id: 'esports',
        title: 'E-Sports',
        icon: 'esports',
        count: 0,
        defaultOpen: false,
        items: [],
    },
    {
        id: 'mma',
        title: 'MMA',
        icon: 'mma',
        count: 0,
        defaultOpen: false,
        items: [],
    },
]
