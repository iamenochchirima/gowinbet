
export type TokenData = {
    rank: number;
    name: string;
    symbol: string;
    image: string;
    chart1: string;
    chart2: string;
    score: number;
    percentage: string;
    value: string;
  };

export type LiveItem = {
    title: string;
    subtitle: string;
    image: string;
};

export type CryptoToken = { 
    id: string
    name: string
    symbol: string
    price: number
    change: string
    marketCap: number | null
    volume: number | null
    circulatingSupply: number | null
    image: string
}

export type Period = 'thisMonth' | 'thisWeek' | 'thisYear'

export type StatisticCategory = 'totalProfit' | 'totalOrder' | 'totalImpression'

export type ChannelRevenue = Record<
    Period,
    {
        value: number
        growShrink: number
        percentage: {
            onlineStore: number
            physicalStore: number
            socialMedia: number
        }
    }
>

export type SalesTargetData = Record<
    Period,
    {
        target: number
        achieved: number
        percentage: number
    }
>

export type Product = {
    id: string
    name: string
    productCode: string
    img: string
    sales: number
    growShrink: number
}

export type CustomerDemographicData = {
    id: string
    name: string
    value: number
    coordinates: [number, number]
}

export type PeriodData = {
    value: number
    growShrink: number
    comparePeriod: string
    chartData: {
        series: {
            name: string
            data: number[]
        }[]
        date: string[]
    }
}

export type StatisticData = Record<
    StatisticCategory,
    Record<Period, PeriodData>
>

export type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

export type GetHomeDashboardResponse = {
    statisticData: StatisticData
    recentOrders: Order[]
    salesTarget: SalesTargetData
    topProduct: Product[]
    customerDemographic: CustomerDemographicData[]
    revenueByChannel: ChannelRevenue
}
