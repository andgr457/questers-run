export interface Currency {
  platinum: CurrencyItem
  gold: CurrencyItem
  silver: CurrencyItem
  copper: CurrencyItem
}

export interface CurrencyItem {
  name: string
  value: number
  imageName: string
}
