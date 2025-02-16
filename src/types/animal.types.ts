interface AnimalStats {
    happiness: number;
    hunger: number;
    sleep: number;
}

export interface Animal {
    id: string;
    name: string;
    stats: AnimalStats;
}