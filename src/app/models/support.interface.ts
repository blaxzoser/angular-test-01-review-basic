export interface PartnerDiscount {
  link: string;
  details: string;
}

export interface PartnerDiscounts {
  saberMasters: PartnerDiscount;
  heartMath: PartnerDiscount;
}

export interface Support {
  contact: string;
  donate: string;
  partnerDiscounts: PartnerDiscounts;
}
