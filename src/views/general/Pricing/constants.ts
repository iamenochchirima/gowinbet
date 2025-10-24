export interface Package {
    title: string;
    price: string;
    frequency: string;
    description: string;
    features: string[];
    buttonText: string;
    highlight?: boolean;
}

export const packages: Package[] = [
    {
        title: "Starter",
        price: "$9",
        frequency: "Monthly",
        description: "Recommended for people with at least 1 year of experience in crypto markets.",
        features: [
            "1 user account",
            "24 transactions per month",
            "16 altcoin pairs",
            "32 api connected at the same time maximum",
            "Basic AI analysis of markets",
            "Built-in wallet API for managing your crypto",
        ],
        buttonText: "Get Started",
    },
    {
        title: "Professional",
        price: "$49",
        frequency: "Monthly",
        description: "All functions available, perfect plan for experienced investors.",
        features: [
            "1 user account",
            "Unlimited transactions per month",
            "Unlimited altcoin pairs",
            "Unlimited api connected at the same time maximum",
            "Advanced AI analysis of markets",
            "Built-in wallet API for managing your crypto",
            "Astro PRO wallet",
            "Customer support available 24/7",
        ],
        buttonText: "Get Started",
        highlight: true,
    },
    {
        title: "Enterprise",
        price: "$99",
        frequency: "Monthly",
        description: "For teams, companies, and crypto-head families.",
        features: [
            "Unlimited user accounts",
            "Unlimited transactions per month",
            "Unlimited altcoin pairs",
            "Unlimited api connected at the same time maximum",
            "Advanced AI analysis of markets with experts",
            "Built-in wallet API for managing your crypto",
            "Astro PRO wallet",
            "High priority customer support available 24/7",
        ],
        buttonText: "Schedule a call",
    },
];
