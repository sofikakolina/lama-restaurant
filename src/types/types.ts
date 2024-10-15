export type MenyType = {
    id: string;
    title: string;
    description?: string;
    color: string;
    image?: string;
    slug: string;
}[]

export type ProductType = {
    id: string;
    title: string;
    description?: string;
    image?: string;
    catSlug?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
};

export type ProductCartType = {
    id: string;
    title: string;
    description?: string;
    image?: string;
    price: number;
    quantity: number;
    options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
    id: string;
    price: number;
    userEmail: string;
    products: CartItemType[];
    status: string;
    createdAt: Date;
    intent_id?: string;
}

export type CartItemType = {
    id: string;
    title: string;
    image?: string;
    price: number;
    optionTitle?: string;
    quantity: number;
}

export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
}

export type ActionTypes = {
    addToCart:(item:CartItemType)=> void;
    removeFromCart:(item:CartItemType)=> void;
}