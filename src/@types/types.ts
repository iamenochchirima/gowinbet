export type PackagePricing = {
    price: {
        currency: string;
        monthly: {
            link: string;
            amount: string;
            priceId: string;
        }
        yearly: {
            yearly_monthly: string;
            link: string;
            amount: string;
            priceId: string;
        }
    }
    features: string[];
    description: string;
    name: PlanType;
    isRecommended: boolean;
    isPopular: boolean;
    isFree: boolean;
    isTrial: boolean;
}

export type PlanType = "Starter" | "Professional" | "Enterprise";