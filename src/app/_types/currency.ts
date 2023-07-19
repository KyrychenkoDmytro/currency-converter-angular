export type TCurrencyShortName = string;

export type TRates = {[key: TCurrencyShortName]: number};

export interface ICurrency {
  date: string;
  base: TCurrencyShortName;
  rates: TRates;
}
